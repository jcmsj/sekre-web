import { Tab, Tabs } from "@mui/material";
import {
    Outlet,
    Link,
} from 'react-router-dom';
import { useState } from "react";
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

const initialPage = "/list"
export default function Root() {
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
            style={{padding:"1vh 1vw"}}
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
                value="/list"
                to="/list" component={Link}
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