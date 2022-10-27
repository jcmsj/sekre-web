import { Tab, Tabs } from "@mui/material";
import {
    Outlet,
    Link,
} from 'react-router-dom';
import { useState } from "react";
import { List as ListIcon, Add as AddIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import { LoginForm } from "./routes/LoginPage";
export default function Root() {
    const [isRegistered, setRegistrationStatus] = useState(true)
    const [isAuth, setAuth] = useState(false)
    const mainKey = useLiveQuery(() => {
        const result = db.mainKey.get({ id: 0 })
        setRegistrationStatus(
            result != undefined
        )
        return result;
    })

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