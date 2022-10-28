import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../db";
import { decrypt } from "../lib/cipher";
import { AuthForm } from "./LoginPage";
export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    /**
     * @type {{sekre:import("../db").Sekre}}
     */
    const { sekre } = location.state;
    const [maybeKey, setMaybeKey] = useState();
    useEffect(() => {
        async function requiry() {
            const maybeChain = await db.chains.get({ targetID: sekre.id });
            if (maybeChain)
                setMaybeKey(
                    await db.mainKey.get({ id: maybeChain.keyID })
                )
        }
        if (sekre != undefined) requiry();
    }, [sekre])
    useEffect(() => {
        verify(maybeKey?.secret)
    }, [maybeKey])
    useEffect(() => {
        if (sekre == undefined) {
            navigate("/")
        }
    }, [sekre])

    function goEdit(key) {
        navigate("/edit/" + sekre.id, {
            state: {
                sekre,
                key
            }
        })
    }
    const verify = input => {
        if (typeof input == "string") {
            const raw = decrypt(sekre.secret)(input)
            if (raw.length) goEdit(input);
        }
    }
    return sekre ? <AuthForm
        intent={`Authenticate: ${sekre.name}`}
        onSubmit={verify}
        onBack={() => navigate("/")}
    >
    </AuthForm> : null;
}