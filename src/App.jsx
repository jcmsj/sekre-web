import { Tabs, Tab } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import List from "./List";
import CreationPage from "./Create";

function TabPanel({ children, value, index, ...props }) {
  return <div
    hidden={value !== index}
    id={`panel-${index}`}
    {...props}
  >
    {value === index &&
      <>
        {children}
      </>
    }
  </div>
}

const tabStyle = {
  position:"sticky",
  bottom:0,
  padding: "3px 1vw",
  backgroundColor:"white"
}
export default function App() {
  const [value, setValue] = useState(1)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return <>
    <main>
      <TabPanel value={value} index={0}>Hello 2</TabPanel>
      <TabPanel value={value} index={1}>
        <List />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreationPage />
      </TabPanel>
    </main>
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      style={tabStyle}
    >
      <Tab
        label="settings"
        icon={<SettingsIcon />}
      >
      </Tab>
      <Tab
        label="todos"
        icon={<ListIcon />}
      >
      </Tab>
      <Tab
        label="create"
        icon={<AddIcon />}
      />
    </Tabs>
  </>
}