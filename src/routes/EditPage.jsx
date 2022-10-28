import { ContentCopy, RemoveRedEye } from "@mui/icons-material";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { db } from "../db";

/**
 * @param {{sekre:import("./db").Sekre,key:string?}} param0 
 */
export default function EditPage() {
    const navigate = useNavigate()
    const { id:rawID } = useParams();
    const id = parseInt(rawID)
    const defaultKeyID = useLiveQuery(() => db.chains.where({targetID:id}).first());
    const key = useLiveQuery(() => defaultKeyID ? db.mainKey.get({ id: defaultKeyID.keyID }):undefined)
    const sekre = useLiveQuery(() => {
        const s = db.secrets.get(id)
        if (s == undefined) {
            navigate("/");
        }
        return s;
    });

    return <>
        <TopBar
            cancellable
            title={`Edit : ${sekre?.name ?? ""}`}
            toolBarProps={{
                sx: { columnGap: "1vw" }
            }}
        >

        </TopBar>
        <List>
            <ListItemButton>
                <ListItemText>
                    Reveal
                </ListItemText>
                <ListItemIcon>
                    <RemoveRedEye />
                </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
                <ListItemText>
                    Copy
                </ListItemText>
                <ListItemIcon>
                    <ContentCopy />
                </ListItemIcon>
            </ListItemButton>
        </List>
    </>;
}