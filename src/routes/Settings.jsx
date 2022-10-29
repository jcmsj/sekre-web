import { FileDownload, FileUpload } from "@mui/icons-material";
import { List, ListItemText, Typography } from "@mui/material";
import { ThemedListItemButton } from "../components/ThemedListItemButton";
import TopBar from "../components/TopBar";
import { db } from "../db";
const MIME = "application/json"
export default function SettingsPage() {
    return <>
        <TopBar
            title="Settings"
        >
        </TopBar>
        <div style={{
            padding:"2vh 2vw"
        }}>
            <Typography variant="h5" color="primary">
                Data
            </Typography>
            <List>
                <Read />
                <Save />
            </List>
            <Typography variant="h5" color="primary">
                About
            </Typography>
            {/* Other parts here */}
        </div>
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
                Import
            </ListItemText>
        </ThemedListItemButton>
    </>;
}

function Save() {
    /** @type {HTMLAnchorElement} */
    let anchor;
    return <>
        <a
            hidden
            download="secrets.sekre"
            ref={self => anchor = self}
        />
        <ThemedListItemButton
            onClick={async () => {
                anchor.href = await generateFile()
                anchor?.click()
            }}
        >
            <FileDownload />
            <ListItemText>
                Export
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

async function generateFile() {
    const data = await db.secrets.toArray();
    const text = JSON.stringify(data);
    const blob = new Blob([text], { type: MIME, })
    return URL.createObjectURL(blob)
}