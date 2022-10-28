import { CheckOutlined, Key as KeyIcon, RestartAlt } from "@mui/icons-material"
import { Button, ButtonGroup } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { db, useMainKey } from "../db"
import { encrypt } from "../lib/cipher"
import useClear from "../lib/useClear"
import { InputOutline } from "../components/InputOutline"
import TopBar from "../components/TopBar"
import { Paper } from "@mui/material"
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
        }
        clear()
    }
    const setMainKeyAsKey = () => setKey(mainKey.secret);
    return <>
        <TopBar
            title="New Secret"
        >
        
            <Button
                onClick={onCreate}
                disabled={isInvalid}
                sx={{
                    color: "inherit",
                }}
            >
                <CheckOutlined />
            </Button>
        </TopBar>
        <Paper elevation={24} 
        
  
        sx={{
            
            backgroundColor: '#1c1c1c', 
            borderRadius: 1, mx: 2, 
            
            color: 'white', 
            boxShadow: "0px 0px 18px -3px rgba(0,0,0,1) inset",
            
        }}>
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
                    color="success"
                    style={{ alignSelf: "center" }}
                >
                    <Button onClick={clear}>
                        <RestartAlt />
                        Clear
                    </Button>
                    <Button
                        onClick={setMainKeyAsKey}
                    >
                        <KeyIcon />
                        Use main key
                    </Button>

                </ButtonGroup>
            </form>
        </Paper>
        
    </>
}