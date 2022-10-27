import { Tab, Tabs } from "@mui/material";
import {
    Outlet,
    Link,
} from 'react-router-dom';
import { useState } from "react";
import { List as ListIcon, Add as AddIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { db, useMainKey } from "./db";
import { LoginForm } from "./routes/LoginPage";
import { useEffect } from "react";
import RegistrationForm from "./routes/Register";
export default function Root() {
    const [isRegistered, setRegistrationStatus] = useState(true)
    const [isAuth, setAuth] = useState(false)
    const mainKey = useMainKey();
    useEffect(() => {
        setRegistrationStatus(
            mainKey != undefined
        )
    }, [mainKey])
    return isRegistered ?
        isAuth ? <App />
            : <LoginForm setAuth={setAuth}/>
        : <RegistrationForm mainKey={mainKey} />
}

const initialPage = "/"
function App() {
    const [index, setIndex] = useState(initialPage)

    const handleChange = (event, newValue) => {
        setIndex(newValue);
    };
    return <>
        <main>
            <Outlet />
        </main>
        <Tabs
            value={index}
            onChange={handleChange}
            variant="fullWidth"
            style={{ padding: "1vh 1vw" }}
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
                to="/" component={Link}
                icon={<ListIcon />}

            />
            <Tab
                label="Create"
                value="/new"
                to="/new" component={Link}
                icon={<AddIcon />}

            />
        </Tabs>
    </>
}