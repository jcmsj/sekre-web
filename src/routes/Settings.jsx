import AppTitle from "../components/AppTitle";
import { AppBar, Toolbar } from "@mui/material";

export default function SettingsPage() {
    return <>
        <AppBar position="sticky">
            <Toolbar>
                <AppTitle>
                    Settings
                </AppTitle>
            </Toolbar>
        </AppBar>
        <div>
            TODO
        </div>
    </>
}