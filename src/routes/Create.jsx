import { Check as CheckIcon, Clear as ClearIcon, Key as KeyIcon, RestartAlt } from "@mui/icons-material"
import { Button, ButtonGroup, Fab, TextField } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../db"
import { encrypt } from "../lib/cipher"
import useClear from "../lib/useClear"

/**
 * @type {React.CSSProperties}
 */
const style = {
    display: "flex",
    flexDirection: "column",
    rowGap: "2vh"
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

    return <form style={style}>
        <h1>Create a secret</h1>
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
        <Fab
            variant="extended"
            onClick={onCreate}
            disabled={isInvalid}
            style={{ alignSelf: "flex-end" }}
            color="primary"
        >
            {isInvalid ? <ClearIcon /> : <CheckIcon />}
            &nbsp;Create
        </Fab>
    </form>
}


function InputOutline(props) {
    return <TextField
        required
        variant="outlined"
        {...props}
    />
}