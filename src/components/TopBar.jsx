import { ArrowBack } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTitle from "./AppTitle";

/**
 * @param {{
 *  cancellable:boolean,
 *  title:string
 * } & import("React").PropsWithChildren} param0 
 * @returns 
 */
export default function TopBar({ cancellable, children, title, toolBarProps, ...props }) {
    const navigate = useNavigate();

    return <AppBar
        position="sticky"
        {...props}
    >
        <Toolbar
            {...toolBarProps}
        >
            {cancellable ?
                <Button
                    onClick={() => navigate(-1)}
                >
                    <ArrowBack 
                    sx={theme =>({
                        color:theme.palette.primary.contrastText
                    })}
                    />
                </Button> : null
            }
            <AppTitle>{title}</AppTitle>
            {children}
        </Toolbar>
    </AppBar>
}