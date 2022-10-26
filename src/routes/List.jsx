import { ContentCopy, Search as SearchIcon } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, AppBar, Toolbar } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks"
import AppTitle from "../components/AppTitle";
import { db } from "../db"

/**
 * 
 * @param {{sekre:import("./db").Sekre}} param0 
 */
export function Item({ sekre }) {
    return <ListItem>
        <ListItemButton>
            <ListItemText>{sekre.name}</ListItemText>
            <ListItemIcon>
                <ContentCopy />
            </ListItemIcon>
        </ListItemButton>
    </ListItem>
}
export default function ListPage() {
    const secrets = useLiveQuery(() => db.secrets.toArray())
    return <>
        <AppBar position="sticky">
            <Toolbar>
                <AppTitle>
                    Manage secrets
                </AppTitle>
                <SearchIcon /> {/* Filter list with input */}
            </Toolbar>
        </AppBar>
        <List>
            {secrets?.map(sekre =>
                <Item key={sekre.id} sekre={sekre} />)
            }
        </List>
        {secrets?.length ? "" : <h2>No secrets</h2>}
    </>;
}