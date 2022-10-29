import { List, ListItemButton, ListItemText } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks"
import { Link } from "react-router-dom";
import { db } from "../db"
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import TopBar from "../components/TopBar";
/**
 * @param {{sekre:import("./db").Sekre}} param0 
 */
export function Item({ sekre, ...props }) {
    return <ListItemButton
        component={Link}
        to={`/auth/${sekre.id}`}
        state={{ sekre }}
        sx={theme => ({
            boxShadow: 1,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.mode == "dark" ? "#191919" : "auto",
            fontStyle: "italic",
            fontFamily: "Segoe UI", //doesn't work
            fontWeight: "lighter"   //doesn't work
        })}
        {...props}
    >
        <ListItemText
        >{sekre.name}
        </ListItemText>
    </ListItemButton>
}

export default function ListPage() {
    const [query, setQuery] = useState("");

    const secrets = useLiveQuery(() =>
        query.length ? db.secrets.filter(sekre => sekre.name.includes(query)).toArray()
            : db.secrets.toArray()
        , [query])
    return <>
        <TopBar
            title="Manage Secrets"
        />
        <SearchBar
            value={query}
            onInput={e => setQuery(e.target.value)}
            style={{
                marginTop:"1vh"
            }}
        />
        <List
            sx={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                color: "white",
                rowGap: "2vh",
            }}
        >
            {secrets?.map(sekre =>
                <Item
                    key={sekre.id}
                    sekre={sekre}
                />)
            }
        </List>
        {secrets?.length ? "" : <h2 style={{ color: "white", fontFamily: "Segoe UI", fontWeight: "lighter", textAlign: "center" }}>No secrets</h2>}
    </>;
}