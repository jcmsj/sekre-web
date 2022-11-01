import { FileDownload, FileUpload } from "@mui/icons-material";
import { List, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ThemedListItemButton } from "../components/ThemedListItemButton";
import TopBar from "../components/TopBar";
import { db, getKey, useAuth } from "../db";
import { decrypt, encrypt } from "../lib/cipher";
export default function SettingsPage() {
    return <>
        <TopBar
            title="Settings"
        >
        </TopBar>
        <Box
            sx={theme => ({
                color: theme.palette.text.primary,
                padding: "2vh 2vw"
            })}
        >
            <Typography
                variant="h5"
                color="primary"
            >
                Data
            </Typography>
            <List>
                <Read />
                <Save />
            </List>
            <Typography
                variant="h5"
                color="primary"
            >
                About
            </Typography>
            <Typography>
                Sekre is a password manager app, it aims to keep your passwords and secrets. <br /><b>“Sekre”</b> is a Norwegian word that means secure, and it is the main goal of Sekre -<br /> To keep your passwords and secrets secure.
            </Typography>
            {/* Other parts here */}
        </Box>
    </>
}

function Read() {
    /** @type {HTMLInputElement} */
    let elem;
    return <>
        <input
            type="file"
            accept="application/json, .sekre"
            hidden
            ref={self => elem = self}
            onChange={async () => {
                if (elem.files.length) {
                    parseFile(elem.files[0])
                }
            }}
        />
        <ThemedListItemButton onClick={() => {
            elem.click()
        }}>
            <FileUpload />
            <ListItemText>
                &nbsp;Import
            </ListItemText>
        </ThemedListItemButton>
    </>;
}
const MIME = "application/json"

function Save() {
    const auth = useAuth()
    /** @type {HTMLAnchorElement} */
    let anchor;

    async function onClick(e) {
        const input = prompt("Enter main key to continue:");
        if (input === null) { //Cancel
            return;
        }

        if (!auth(input)) {
            alert("Incorrect key")
            return
        }

        anchor.href = generateFile(
            await generateData({ keyReplacement: input })
        )
        anchor?.click()
    }
    return <>
        <a
            hidden
            download="secrets.sekre"
            ref={self => anchor = self}
        />
        <ThemedListItemButton
            onClick={onClick}
        >
            <FileDownload />
            <ListItemText>
                &nbsp;Export
            </ListItemText>
        </ThemedListItemButton>
    </>
}

/**
 * @param {File} file 
 */
async function parseFile(file) {
    /**
     * @type {import("../db").Sekre[]}
     */
    const maybeJSON = JSON.parse(
        await file.text()
    )

    /**
     * @implNote Keep only name and secret fields.
     */
    const id = await db.secrets.bulkPut(maybeJSON.map(({ name, secret }) => ({ name, secret })))
}

/**
 * @type {import("../db").Sekre[]}
 */
function generateFile(secrets) {
    const text = JSON.stringify(secrets);
    const blob = new Blob([text], { type: MIME, })
    return URL.createObjectURL(blob)
}

/**
 * @param {{keyReplacement:string}} param0 
 * @implNote For all secrets that use the main key, replace it with the raw version.
 * @returns {Promise<import("../db").Sekre[]>}
 */
async function generateData({ keyReplacement }) {
    const mainKey = await getKey();
    const secrets = await db.secrets.toArray();
    return Promise.all(secrets.map(async (sekre) => {
        const maybeChain = await db.chains.get({ targetID: sekre.id });

        if (maybeChain) {
            try {
                sekre.secret = reencrypt({
                    secret: sekre.secret,
                    former: mainKey.secret,
                    replacement: keyReplacement
                })
            } catch (error) {
                console.log(error);
                //PASS
            }
        }

        return sekre;
    }))
}

export function reencrypt({ secret, former, replacement }) {
    const raw = decrypt(secret)(former)
    return encrypt(raw)(replacement);
}