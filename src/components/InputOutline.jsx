import { TextField } from "@mui/material";

/**
 * @param {import("@mui/material").TextFieldProps} props 
 */
export function InputOutline(props) {
    
    return <TextField
        required
        variant="outlined"
        {...props} 
        sx={{
            mx: 2,
            '&:hover': {
                borderColor: '#2E5C15',
            },
            input: { color: 'white' },
            '& .MuiTextField-root': {
                color: 'white',
            },
            '& .MuiInputLabel-outlined': {
                color: 'white',
            },
            '& label.Mui-focused': {
                color: '#8BC34A',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
            },

            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                borderColor: 'white',
                },
                '&:hover fieldset': {
                borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                borderColor: '#8BC34A',
                },
            },
        }}
        />;
}
