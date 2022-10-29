import { useRouteError } from "react-router-dom"

const knownErrors = { "DatabaseClosedError": <NoDB /> }
/**
 * @see https://reactrouter.com/en/main/hooks/use-route-error
 */
export default function ErrorCatcher() {
    const error = useRouteError();
    return <main style={{ color: "white" }}>
        {knownErrors[error.name]
            ?? <>
            {error.name}
            </>
        }
    </main>
}

/**
 * @see https://github.com/dexie/Dexie.js/issues/883
 * @returns 
 */
export function NoDB() {
    return <>
        Sorry! The app does not work on Incognito or private browsing mode as it needs to store persistent data on your device.
    </>;
}