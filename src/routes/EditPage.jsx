import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { db } from "../db";

/**
 * @param {{sekre:import("./db").Sekre,key:string?}} param0 
 */
export default function EditPage() {
    const { id } = useParams();
    const [sekre, setSekre] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        async function check() {
            const s = await db.secrets.get(parseInt(id))
            setSekre(s)
            if (s == undefined) {
                navigate("/")
            }
        }
        check()
    }, [id])

    return <>
        <TopBar
            cancellable
            title={`Edit : ${sekre?.name ?? ""}`}
            toolBarProps={{
                sx: { columnGap: "1vw" }
            }}
        >

        </TopBar>
    </>;
}