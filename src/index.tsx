import { Auth0Provider } from "@auth0/auth0-react";
import { CssBaseline, StyledEngineProvider, ThemeProvider, } from "@mui/material";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { getApiAddress, getAuthZeroClientId, getAuthZeroDomain } from "./env/getters";
import { Routes } from "./pages/Routes";
import { theme } from "./theme";

// We do this recursion so that env.js has "time" to alter the global window
// This almost always loops 0 or 1 times
let count = 0;
const waitForEnv = async () => {
    if (!window.API_ADDRESS && count < 3000) {
        setTimeout(waitForEnv, 1);
        count++;
        return;
    } else {
        if (count >= 3000) {
            console.error("Host Address never loaded!");
            return <div>Error!</div>;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const root = createRoot(document.getElementById("root")!);
        root.render(
            <Auth0Provider
                domain={getAuthZeroDomain()}
                clientId={getAuthZeroClientId()}
                redirectUri={window.location.origin}
                audience={getApiAddress()}
            >
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <BrowserRouter>
                            <Routes />
                        </BrowserRouter>
                    </ThemeProvider>
                </StyledEngineProvider>
            </Auth0Provider>
        );
    }
};

waitForEnv();
