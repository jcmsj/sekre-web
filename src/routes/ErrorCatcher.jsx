import { useRouteError } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const knownErrors = {
    DatabaseClosedError: <NoDB />
};

const hstyle = {
    margin: "3vmin",
    fontFamily: "Century Gothic",
    textAlign: "center",
    fontSize: "xxx-large",
};

const longtextstyle = {
    color: "white",
    fontFamily: "Arial",
    marginInline: "8vw",
    fontSize: "1.3em",
    fontWeight: "lighter",
};

const iconstyle = {
    fontSize: 100,
    color: "red",
    margin: "auto",
    marginTop: "15%",
    marginBottom: "0%",
};

/**
 * @see https://reactrouter.com/en/main/hooks/use-route-error
 */
export default function ErrorCatcher() {
    const error = useRouteError();
    return <main style={{ color: "white" }}>
        <ErrorOutlineIcon sx={iconstyle} />
        <h1 style={hstyle}>Oops!</h1>
        {knownErrors[error.name] ?? <>{error.name}</>}
    </main>;
}

/**
 * @see https://github.com/dexie/Dexie.js/issues/883
 * @returns
 */
export function NoDB() {
    return <>
        <h3 style={longtextstyle}>
            The app does not work on Incognito or Private browsing mode as it needs
            to store persistent data on your device.
        </h3>
        <img
            src="simple-cartoon-ghost-png-30.png"
            style={{
                width: "60vmin",
                margin: "auto"
            }}
        />
    </>
}
