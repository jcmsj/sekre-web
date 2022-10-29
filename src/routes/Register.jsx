import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../db";
import { obscure } from "../lib/cipher";
import useClear from "../lib/useClear";
import { AuthForm } from "./LoginPage";
import { Card } from "@mui/material";
import { CardContent } from '@mui/material';
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
/**
 * @param {{id:number}} param0 
 */
export default function RegistrationForm({ mainKey }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (mainKey != undefined) {
            navigate("/")
        }
    }, [mainKey])

    /**
     * @param {string} key 
     */
    function register(key) {
        const trimKey = key.trim();
        if (trimKey.length <= 0) {
            return;
        }

        db.mainKey.add({
            id: 0,
            secret: obscure(trimKey)
        })
    }
    return <AuthForm
        intent="Getting Started"
        siblingsBefore={
            <Card
                style={{
                    marginBlock:1 
                }}
                sx={theme => (theme.palette.mode == "dark" ? {
                    backgroundColor: '#252525',
                    boxShadow:
                        "0px 7px 18px -3px rgba(0,0,0,1) inset, 0px 2px 4px 0px rgba(50,50,50,1) inset",
                } : {})}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        color="inherit"
                        style={{
                            fontFamily: 'Segoe UI'
                        }}
                    >
                        To start please register a password <Divider sx={{ borderColor: '#909090', p: 1 }} />
                    </Typography>
                    <Typography
                        color="error"
                        sx={{ fontSize: 15, fontWeight: 'light', fontFamily: 'Segoe UI' }}>
                        Warning: <br />
                        It can only be set once. <br />
                        Whitespaces will not be accepted.
                    </Typography>
                </CardContent>
            </Card>
        }
        onSubmit={register}
    />
}