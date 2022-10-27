import { ArrowBack } from "@mui/icons-material";
import { AppBar, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppTitle from "../components/AppTitle";
import { db } from "../db";

/**
 * @param {{sekre:import("./db").Sekre,key:string?}} param0 
 */
export default function EditPage() {
    const { id } = useParams();
    const [sekre, setSekre] = useState();
    useEffect(() => {
        db.secrets.get(parseInt(id)).then(setSekre)
    }, [id])
    return <>
        <AppBar>
            <Toolbar 
            sx={{columnGap:"1vw"}}
            >
                <ArrowBack>

                </ArrowBack>
                <AppTitle>
                    Edit: {sekre?.name}
                </AppTitle>
            </Toolbar>
        </AppBar>
    </>;
}