import { CheckOutlined, Key as KeyIcon, RestartAlt } from "@mui/icons-material"
import { Button, ButtonGroup, TextField, AppBar, Toolbar, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import AppTitle from "../components/AppTitle"
import { db } from "../db"
import { encrypt } from "../lib/cipher"
import useClear from "../lib/useClear"
/**
 * @type {React.CSSProperties}
 */
const style = {
    display: "flex",
    flexDirection: "column",
    rowGap: "2vh",
    marginTop: "2vh",
    padding: "1vh 2vw"
}

export default function CreationPage(props) {
    const [name, setName] = useState("")
    const [secret, setSecret] = useState("")
    const [key, setKey] = useState("")
    const clear = useClear(setName, setSecret, setKey)
    const [isInvalid, setValidty] = useState(true)

    useEffect(() => {
        setValidty(
            [secret, key, name].some(input => input.length <= 0)
        )
    }, [name, secret, key])

    const onCreate = async (e) => {
        await db.secrets.add({ name, secret: encrypt(secret)(key) })
        clear()
    }

    return <>
        <AppBar position="sticky">
            <Toolbar>
                <AppTitle>
                    New Secret
                </AppTitle>
                <Button
                    onClick={onCreate}
                    disabled={isInvalid}
                    sx={{
                        color: "inherit",
                    }}
                >
                    <CheckOutlined />
                </Button>
            </Toolbar>
        </AppBar>
        <form style={style}>
            <InputOutline
                label="Name"
                onInput={e => setName(e.target.value)}
                value={name}
            ></InputOutline>
            <InputOutline
                label="Secret"
                type="password"
                name="password-new"
                value={secret}
                onInput={e => setSecret(e.target.value)}
            ></InputOutline>
            <InputOutline
                label="Key"
                type="password"
                name="password-new"
                value={key}
                onInput={e => setKey(e.target.value)}
            ></InputOutline>
            <ButtonGroup
                style={{ alignSelf: "center" }}
            >
                <Button onClick={clear}>
                    <RestartAlt />
                    Clear
                </Button>
                <Button>
                    <KeyIcon />
                    Use main key
                </Button>

            </ButtonGroup>
        </form>
    </>
}


function InputOutline(props) {
    return <TextField
        required
        variant="outlined"
        {...props}
    />
}