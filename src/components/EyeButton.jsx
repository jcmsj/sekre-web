import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/material";
/**
 * @param {import("@mui/material").IconProps} param0 
 */
export default function EyeButton({ show, ...props }) {
    return <IconButton
        {...props}
    >
       <AdaptiveEye show={show}/>
    </IconButton>
}

export function AdaptiveEye({ show }) {
    return show ?
        <VisibilityOff />
        : <Visibility />;
}