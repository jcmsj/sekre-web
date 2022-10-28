import { ContentCopy } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, AppBar, Toolbar } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks"
import { Link } from "react-router-dom";
import AppTitle from "../components/AppTitle";
import { db } from "../db"
import { SearchBar } from "../components/SearchBar";

/**
 * 
 * @param {{sekre:import("./db").Sekre}} param0 
 */
export function Item({ sekre, to, ...props }) {
    return <ListItem
        component={Link} to={`/edit/${sekre.id}`}
        sx={{
            boxShadow: 1,
        }}
    >
        <ListItemButton
        >
            <ListItemText
            >{sekre.name}</ListItemText>
            <ListItemIcon onClick={e => {
                e.preventDefault()
            }}>
                <ContentCopy />
            </ListItemIcon>
        </ListItemButton>
    </ListItem>
}

export default function ListPage() {
    const secrets = useLiveQuery(() => db.secrets.toArray())
    return <>
        <AppBar position="sticky">
            <Toolbar sx={{ flexDirection: "column", alignItems: "start", rowGap: "1vh" }}>
                <AppTitle>
                    Manage secrets
                </AppTitle>
                {/* TODO: Filter list with input */}
                <SearchBar />
            </Toolbar>
        </AppBar>
        <List
            sx={theme => ({
                overflowY:"auto",
                backgroundColor:theme.background,
                height: "100%"
            })}
        >
            {secrets?.map(sekre =>
                <Item
                    key={sekre.id}
                    sekre={sekre}
                />)
            }
        </List>
        {secrets?.length ? "" : <h2>No secrets</h2>}
    </>;
}