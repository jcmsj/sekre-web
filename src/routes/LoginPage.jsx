import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import PasswordField from "../components/PasswordField";
import TopBar from "../components/TopBar";
import { useAuth } from "../db";
import { useCounter } from "../lib/useCounter";

const MAX_ATTEMPTS = 5;

/**
 * @param {import("react").SetStateAction<boolean>} param0 
 */
export function LoginForm({ setAuth }) {
    const { count: attemptsLeft, decrement } = useCounter(MAX_ATTEMPTS);
    const auth = useAuth();
    function authenticate(key) {
        auth(key) ? setAuth(true) : decrement()
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
            <Typography variant="p" style={{ color: "red" }}>
                {attemptsLeft != MAX_ATTEMPTS ? "Incorrect key, please try again!" : ""}
            </Typography>
        }
    >
        <Typography variant="p" sx={theme => ({
            color: theme.palette.primary.light
        })}>
            Attempts left: {attemptsLeft}
        </Typography>
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
    return <Box
        component="main"
        sx={theme => ({
            backgroundColor: theme.palette.background.paper
        })}
    >
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
            <PasswordField
                label="Password"
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
    </Box>
}