import { useEffect } from "react";
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
    useEffect(() => {
        async function requiry() {
            const maybeChain = await db.chains.get({ targetID: sekre.id });
            const maybeKey =maybeChain ? (await db.mainKey.get({ id: maybeChain.keyID })): undefined;
            verify(maybeKey?.secret)
        }
        if (sekre != undefined) requiry();
    }, [sekre])

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