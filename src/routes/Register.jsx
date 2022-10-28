import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../db";
import { obscure } from "../lib/cipher";
import { AuthForm } from "./LoginPage";

/**
 * @param {{id:number}} param0 
 */
export default function RegistrationForm({ mainKey }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (mainKey != undefined) {
            navigate("/")
        }
    }, [mainKey])

    /**
     * @param {string} key 
     */
    function register(key) {
        const trimKey =  key.trim();
        if (trimKey.length <= 0) {
            return;
        }

        db.mainKey.add({
            id: 0,
            secret: obscure(trimKey)
        })
    }
    return <AuthForm
        intent="Getting Started"
        siblingsBefore={
            <>
                To use the app please register a main password.
                <b style={{ color: "red" }}>Warning:<br /> it can only be set once.</b>
            </>
        }
        onSubmit={register}
    >
        <b>Rules</b>
        <ul>
            <li>Trailing and leading whitespace is removed.</li>
        </ul>
    </AuthForm>
}