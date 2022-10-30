import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTitle from "./AppTitle";


function ArrowButton(props) {
    return <IconButton
        {...props}
    >
        <ArrowBack />
    </IconButton>;
}
/**
 * @param {{
 *  cancellable:boolean,
 *  onBack:() => void,
 *  title:string,
 * toolBarProps:import("@mui/material").ToolbarProps,
 * } & import("React").PropsWithChildren} param0 
 * @returns 
 */
export default function TopBar({ cancellable, onBack, children, title, toolBarProps, ...props }) {
    const navigate = useNavigate();
    const goBack = () => onBack ? onBack() : navigate(-1);
    return <AppBar
        position="sticky"
        sx={theme => theme.palette.mode == "dark" ? {
            background:"black",
        }:{}}
        {...props}
    >
        <Toolbar
            {...toolBarProps}
        >
            {(cancellable ?? onBack) ?
                <ArrowButton
                    onClick={goBack}
                />
                : null
            }
            <AppTitle>{title}</AppTitle>
            {children}
        </Toolbar>
    </AppBar>
}