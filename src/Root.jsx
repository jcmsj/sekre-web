import { Box, Tab, Tabs } from "@mui/material";
import {
    Outlet,
    Link,
} from 'react-router-dom';
import { useState } from "react";
import { List as ListIcon, Add as AddIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { useMainKey } from "./db";
import { LoginForm } from "./routes/LoginPage";
import { useEffect } from "react";
import RegistrationForm from "./routes/Register";
import { Theme } from "./components/Theme";

export default function Root() {
    const [isRegistered, setRegistrationStatus] = useState(true)
    const [isAuth, setAuth] = useState(false)
    const mainKey = useMainKey();

    useEffect(() => {
        setRegistrationStatus(
            mainKey != undefined
        )
    }, [mainKey])
    return <Theme>
        {isRegistered ?
            isAuth ? <App />
                : <LoginForm setAuth={setAuth} />
            : <RegistrationForm mainKey={mainKey} />
        }
    </Theme>
}

/**
 * @type {import("@mui/material").SxProps<import("@mui/material").Theme>}
 */
const tabsStyle = theme => ({
    height: "max-content",
    position: "sticky",
    bottom: 0,
    pb: 1,
    pt: 1,
    ...(theme.palette.mode == "dark" ? {
        boxShadow:
            "0px 7px 18px -3px rgba(0,0,0,1) inset, 0px 2px 4px 0px rgba(50,50,50,1) inset",
        backgroundColor: "#141414",
        '& .MuiTabs-indicator': {
            backgroundColor: '#fff',
        },
        '& .MuiTab-root.Mui-selected': {
            color: '#8BC34A',
        },
        '& .MuiTab-root': {
            color: '#6B6B6B',
        },
    } : {})
})

const initialPage = "/"
function App() {
    const [index, setIndex] = useState(initialPage)

    const handleChange = (event, newValue) => {
        setIndex(newValue);
    };
    return <>
        <Box
            component="main"
        >
            <Outlet />
        </Box>
        <Tabs
            value={index}
            onChange={handleChange}
            variant="fullWidth"

            sx={tabsStyle}

        >
            <Tab
                label="Settings"
                value="/settings"
                to="/settings"
                component={Link}
                icon={<SettingsIcon />}
            />
            <Tab
                label="List"
                value="/"
                to="/"
                component={Link}
                icon={<ListIcon />}

            />
            <Tab
                label="Create"
                value="/new"
                to="/new"
                component={Link}
                icon={<AddIcon />}

            />
        </Tabs>
    </>
}