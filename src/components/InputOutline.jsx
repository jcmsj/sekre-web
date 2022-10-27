import { TextField } from "@mui/material";

/**
 * @param {import("@mui/material").TextFieldProps} props 
 */
export function InputOutline(props) {
    return <TextField
        required
        variant="outlined"
        {...props} />;
}
