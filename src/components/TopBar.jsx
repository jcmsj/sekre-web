import { ArrowBack } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTitle from "./AppTitle";


function ArrowButton(props) {
    return <Button
        {...props}
    >
        <ArrowBack
            sx={theme => ({
                color: theme.palette.primary.contrastText
            })}
        />
    </Button>;
}
/**
 * @param {{
 *  cancellable:boolean,
 *  onBack
 *  title:string
 * } & import("React").PropsWithChildren} param0 
 * @returns 
 */
export default function TopBar({ cancellable, onBack, children, title, toolBarProps, ...props }) {
    const navigate = useNavigate();
    const goBack = () => onBack ? onBack() : navigate(-1);
    return <AppBar
        position="sticky"
        {...props}
    >
        <Toolbar
            style={{
                backgroundColor: "#000"
            }}
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