import { CheckOutlined, Key as KeyIcon, RestartAlt } from "@mui/icons-material"
import { Button, ButtonGroup, IconButton } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { db, useMainKey } from "../db"
import { encrypt } from "../lib/cipher"
import useClear from "../lib/useClear"
import { InputOutline } from "../components/InputOutline"
import TopBar from "../components/TopBar"
import { Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"
import PasswordField from "../components/PasswordField"
/**
 * @type {React.CSSProperties}
 */
const style = {
    display: "flex",
    flexDirection: "column",
    rowGap: "2vh",
    marginTop: "2vh",
    padding: "2vh 1vw"
}

export default function CreationPage(props) {
    const [name, setName] = useState("")
    const [secret, setSecret] = useState("")
    const [key, setKey] = useState("")
    const clear = useClear(setName, setSecret, setKey)
    const [isInvalid, setValidty] = useState(true)
    const mainKey = useMainKey()
    const navigate = useNavigate()

    useEffect(() => {
        setValidty(
            [secret, key, name].some(input => input.length <= 0)
        )
    }, [name, secret, key])

    const onCreate = async (e) => {
        const id = await db.secrets.add({ name, secret: encrypt(secret)(key) })
        if (key == mainKey.secret) {
            await db.chains.add({
                keyID: mainKey.id,
                targetID: id
            })
            navigate("/")
        }
        clear()
    }
    const setMainKeyAsKey = () => setKey(mainKey.secret);
    return <>
        <TopBar
            title="New Secret"
        >
            <IconButton
                onClick={onCreate}
                disabled={isInvalid}
                sx={{
                    borderRadius: 10,
                }}
            >
                <CheckOutlined fontSize="large" />
            </IconButton>
        </TopBar>
        <Paper
            elevation={24}
            component="form"
            style={style}
            sx={theme => ({
                borderRadius: 1, mx: 2,
                ...(theme.palette.mode == "dark" ? {
                    backgroundColor: '#1c1c1c',
                    color: 'white',
                    boxShadow: "0px 0px 18px -3px rgba(0,0,0,1) inset",
                    backgroundImage: "unset"
                } : {})
            })}>
            <InputOutline
                label="Name"
                onInput={e => setName(e.target.value)}
                value={name}
            ></InputOutline>
            <PasswordField
                label="Secret"
                name="password-new"
                value={secret}
                onInput={e => setSecret(e.target.value)}
            />
            <PasswordField
                label="Key"
                name="password-new"
                value={key}
                onInput={e => setKey(e.target.value)}
            />
            <ButtonGroup
                color="success"
                style={{ alignSelf: "center" }}
            >
                <Button onClick={clear}>
                    <RestartAlt />
                    &nbsp;Clear
                </Button>
                <Button
                    variant="contained"
                    onClick={setMainKeyAsKey}
                >
                    <KeyIcon />
                    &nbsp;Use main key
                </Button>

            </ButtonGroup>
        </Paper>
    </>
}