import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../db";
import { obscure } from "../lib/cipher";
import { AuthForm } from "./LoginPage";

/**
 * 
 * @param {{id:number}} param0 
 * @returns 
 */
export default function RegistrationForm({ mainKey }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (mainKey != undefined) {
            navigate("/")
        }
    }, [mainKey])
    function register(key) {
        db.mainKey.add({
            id: 0,
            secret: obscure(key)
        })
    }
    return <AuthForm
        intent="Getting Started"
        siblingsBefore={
            <>
                {typeof mainKey}
                To use the app please register a main password.
                <b style={{ color: "red" }}>Warning:<br /> it can only be set once.</b>
            </>
        }
        onSubmit={register}
    />
}