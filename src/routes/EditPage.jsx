import { ContentCopy, VisibilityOff, Visibility } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import TopBar from "../components/TopBar";
import { tryDecrypt } from "../db";

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
            title={`Edit : ${sekre?.name ?? ""}`}
            toolBarProps={{
                sx: { columnGap: "1vw" }
            }}
            onBack={() => navigate("/")}
        >

        </TopBar>
        <List>
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

export function ThemedListItemButton(props) {
    return <ListItemButton
        sx={theme => ({
            color: theme.palette.text.primary
        })}
        {...props}
    />
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
        <ListItem
            sx={theme => ({
                color: theme.palette.text.primary
            })}
        >
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