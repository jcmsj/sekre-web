import { ListItemButton } from "@mui/material";

export function ThemedListItemButton(props) {
    return <ListItemButton
        sx={theme => ({
            color: theme.palette.text.primary
        })}
        {...props} />;
}
