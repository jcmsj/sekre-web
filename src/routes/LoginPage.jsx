import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { InputOutline } from "../components/InputOutline";
import TopBar from "../components/TopBar";
import { useMainKey } from "../db";
import { obscure } from "../lib/cipher";
import { useCounter } from "../lib/useCounter";

const MAX_ATTEMPTS = 5;

/**
 * @param {import("react").SetStateAction<boolean>} param0 
 */
export function LoginForm({ setAuth }) {
    const first = useMainKey()
    const { count: attemptsLeft, decrement } = useCounter(MAX_ATTEMPTS);

    async function authenticate(key) {
        const result = obscure(key) == first.secret
        setAuth(result)
        result ? setAuth(result) : decrement()
    }

    useEffect(() => {
        if (attemptsLeft <= 0) {
            alert("Max attempts reached. Exiting the app!")
            //Replace with persistent timer?
            window.close()
        }
    }, [attemptsLeft])

    return <AuthForm
        intent="Login"
        onSubmit={authenticate}
        siblingsAfter={
            <p style={{ color: "red" }}>
                {attemptsLeft != MAX_ATTEMPTS ? "Incorrect key, please try again!" : ""}
            </p>
        }
    >
        Attempts left: {attemptsLeft}
    </AuthForm>
}

/**
 *
 * @param {{
 * intent: string,
 * onSubmit: (key: string) => void,
 * siblingsBefore: React.ReactNode,
 * siblingsAfter: React.ReactNode,
 * children: React.ReactNode,
 * inputProps: import("@mui/material").TextFieldProps
 * }} param0
 * @implNote siblingsBefore / after pertain to the input field
 */
export function AuthForm({ intent, siblingsBefore, siblingsAfter, onSubmit, cancellable, inputProps, children, ...props }) {
    const [input, setInput] = useState("")
    return <main>
        <TopBar
            title={intent}
            cancellable={cancellable}
            {...props}
        >
        </TopBar>
        <form
            style={{
                marginTop: "2vh",
                padding: "1vh 1vw",
                display: "flex",
                flexDirection: "column",
                rowGap: "4vh"
            }}
            onSubmit={e => {
                e.preventDefault()
                onSubmit(input, e)
            }}
        >
            {siblingsBefore}
            <InputOutline
                label="Key"
                value={input}
                onInput={e => setInput(e.target.value)}
                {...inputProps}
            />
            {siblingsAfter}
            <Button
                variant="contained"
                color="success"
                sx={{
                    width: "max-content",
                    alignSelf: "center",
                }}
                type="submit"
            >Submit</Button>
            {children}
        </form>
    </main>
}