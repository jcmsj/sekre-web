import { Button, Input } from "@mui/material"
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
    flexDirection: "column"
}

export default function CreationPage({ clearSignal }) {
    const [name, setName] = useState("")
    const [secret, setSecret] = useState("")
    const [key, setKey] = useState("")
    const onCreate = e => {
        db.secrets.add({ name, secret: encrypt(secret)(key) })
    }
    const [isInvalid, setValidty] = useState(false)
    useEffect(() => {
        clear()
    }, [clearSignal])

    useEffect(() => {
        setValidty(
            [secret, key, name].some(input => input.length <= 0)
        )
    }, [name, secret, key])

    const clear = useClear(setName, setSecret, setKey)
    return <form style={style}>
        <Input
            placeholder="Name"
            onInput={e => setName(e.target.value)}
        ></Input>
        <Input
            placeholder="Secret"
            type="password"
            onInput={e => setSecret(e.target.value)}
        ></Input>
        <Input
            placeholder="Key"
            type="password"
            onInput={e => setKey(e.target.value)}
        ></Input>
        <Button>Use main key</Button>
        <Button
            variant="contained"
            onClick={onCreate}
            disabled={isInvalid}>Create
        </Button>
    </form>
}