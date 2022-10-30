import { ContentCopy, VisibilityOff, Visibility, Delete } from "@mui/icons-material";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import TopBar from "../components/TopBar";
import { db, tryDecrypt } from "../db";
import { ThemedListItemButton } from "../components/ThemedListItemButton";

/**
 * @param {{sekre:import("./db").Sekre,key:string?}} param0 
 */
export default function EditPage() {
    const location = useLocation();
    const navigate = useNavigate()
    /**
     * @type {{
     *  sekre:import("../db").Sekre,
     * key:string
     * }}
     */
    const { sekre, key } = location.state;
    const [preview, setPreview] = useState("")
    useEffect(() => {
        if (key == undefined) {
            navigate("/auth/" + sekre.id, {
                state: {
                    sekre
                }
            })
        }
    }, [key])

    function copyIt() {
        navigator.clipboard.writeText(
            tryDecrypt({ sekre, key })
        )
    }
    function toggleVisibility() {
        setPreview(preview == "" ?
            tryDecrypt({ sekre, key }) : ""
        )
    }

    return <>
        <TopBar
            title={`View secret`}
            toolBarProps={{
                sx: { columnGap: "1vw" }
            }}
            onBack={() => navigate("/")}
        >
            <Deletion sekre={sekre} />
        </TopBar>
        <List
            sx={theme => ({
                color: theme.palette.text.primary
            })}
        >
            <ListItem>
                <Typography variant="h6">
                    Name:&nbsp;{sekre.name}
                </Typography>
            </ListItem>
            <Preview
                onClick={toggleVisibility}
                preview={preview}
            />
            <Copier
                onClick={copyIt}
            />
        </List>
    </>
}

/**
 * @param {{sekre:import("../db").Sekre}} param0 
 */
export function Deletion({ sekre }) {
    const navigate = useNavigate()
    return <IconButton
        onClick={() => {
            if (confirm(`Are you sure you want to delete: ${sekre.name}?`)) {
                db.chains.delete(sekre.id);
                db.secrets.delete(sekre.id);
                navigate("/")
            }
        }}
    >
        <Delete />
    </IconButton>
}
export function Preview({ preview, ...props }) {
    return <>
        <ThemedListItemButton
            {...props}
        >
            <ListItemIcon
            >
                {preview == "" ?
                    <Visibility /> : <VisibilityOff />
                }
            </ListItemIcon>
            <ListItemText>
                Tap to {preview == "" ? "reveal" : "hide"}
            </ListItemText>
        </ThemedListItemButton>
        <ListItem>
            <ListItemText
            >
                {preview}
            </ListItemText>
        </ListItem>
    </>
}

export function Copier(props) {
    return <ThemedListItemButton
        {...props}
    >
        <ListItemIcon
        >
            <ContentCopy
            />
        </ListItemIcon>
        <ListItemText>
            Copy
        </ListItemText>
    </ThemedListItemButton>
}