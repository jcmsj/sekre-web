import { Tabs, Tab } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
export default function () {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return <Tabs
        value={value}
        onChange={handleChange}
    >
        <Tab
            label="todos" 
            icon={<ListIcon />}
        >
        </Tab>
        <Tab
            label="create" 
            icon={<AddIcon />}
            href="/hello"
        />
        <Tab
            label="settings"
            icon={<SettingsIcon />}
        >
        </Tab>
    </Tabs>
}