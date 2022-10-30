import { useState } from "react"
import EyeButton from "./EyeButton"
import { InputOutline } from "./InputOutline"
export default function PasswordField(props) {
    const [isVisible, setVisibility] = useState(false)
    return <InputOutline
        label="Key"
        type={isVisible ? "text" : "password"}
        InputProps={{
            endAdornment:
                <EyeButton
                    show={isVisible}
                    onClick={() => setVisibility(!isVisible)}
                />
        }}
        {...props}
    />
}