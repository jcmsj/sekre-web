import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputOutline } from "../components/InputOutline";
import TopBar from "../components/TopBar";
import { useMainKey } from "../db";
import { obscure } from "../lib/cipher";
export function LoginForm({ setAuth }) {
    const first = useMainKey()
    async function authenticate(key) {
        setAuth(obscure(key) == first.secret)
    }
    return <AuthForm
        intent="Login"
        onSubmit={authenticate}
    >
    </AuthForm>;
}

/**
 * 
 * @param {{
 * intent:string,
 * onSubmit:(key:string)=>void
 * }} param0 
 * @returns 
 */
export function AuthForm({ intent, siblingsBefore, siblingsAfter, onSubmit, cancellable, ...props }) {
    const navigate = useNavigate();
    const [input, setInput] = useState("")
    return <>
        <TopBar
            title={intent}
            cancellable={cancellable}
        >
        </TopBar>
        <div
            style={{
                marginTop: "2vh",
                padding: "1vh 1vw",
                display: "flex",
                flexDirection: "column",
                rowGap: "4vh"
            }}
        >
            {siblingsBefore}
            <InputOutline
                label="Key"
                value={input}
                onInput={e => setInput(e.target.value)}
            />
            <Button
                variant="contained"
                sx={{
                    width: "max-content",
                    alignSelf: "center"
                }}
                onClick={e => onSubmit(input, e)}
            >Submit</Button>
            {siblingsAfter}
        </div>
    </>
}