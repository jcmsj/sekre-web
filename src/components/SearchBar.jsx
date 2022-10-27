import { Search as SearchIcon } from "@mui/icons-material";
import { InputBase, Box } from "@mui/material";


export function SearchBar({inputProps, ...props}) {
    return <Box
        sx={{
            alignItems: "center",
            display: "flex",
            p: "1vh 1vw",
            columnGap: "1vw",
        }}
        {...props}
    >
        <SearchIcon />
        <InputBase
            inputProps={inputProps}
            sx={{color:"inherit"}}
        >
        </InputBase>
    </Box>;
}
