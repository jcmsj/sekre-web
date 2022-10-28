import { List, ListItemButton, ListItemText, AppBar, Toolbar } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks"
import { Link } from "react-router-dom";
import AppTitle from "../components/AppTitle";
import { db } from "../db"
import { SearchBar } from "../components/SearchBar";

/**
 * @param {{sekre:import("./db").Sekre}} param0 
 */
export function Item({ sekre, ...props }) {
    return <ListItemButton
        component={Link}
        to={`/auth/${sekre.id}`}
        state={{ sekre }}
        sx={{
            boxShadow: 1,
            color: "white",
            backgroundColor: "#191919",
            fontStyle: "italic",
            fontFamily: "Segoe UI", //doesn't work
            fontWeight: "lighter"   //doesn't work
        }}
        {...props}
    >
        <ListItemText
        >{sekre.name}
        </ListItemText>
    </ListItemButton>
}

export default function ListPage() {
    const secrets = useLiveQuery(() => db.secrets.toArray())
    return <>
        <AppBar position="sticky">
            <Toolbar sx={{  alignItems: "start", rowGap: "1vh", backgroundColor: "#000", color: 'white', py: 2}}>
                <AppTitle style={{color: "white", fontFamily: "Segoe UI"}}>
                    Manage Secrets
                </AppTitle>
                {/* TODO: Filter list with input */}
                <SearchBar sx={{ color: 'white', backgroundColor: "#121212", p: 1 }} />
            </Toolbar>
        </AppBar>
        <List
            sx={{
                overflowY: "auto",
                display:"flex",
                flexDirection:"column",
                color: "white",
                rowGap: "1vh",
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