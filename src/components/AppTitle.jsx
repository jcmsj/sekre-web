import { Typography } from "@mui/material"

export default function AppTitle({children, ...props}) {
    return <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} {...props}>
        {children}
    </Typography>;
}