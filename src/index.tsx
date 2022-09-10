import { CssBaseline, StyledEngineProvider, ThemeProvider, } from "@mui/material";
import Keycloak from "keycloak-js";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { getKeycloakClientId, getKeycloakRealm, getKeycloakURL } from "./env/getters";
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
        const keycloak = new Keycloak({
            realm: getKeycloakRealm(),
            url: getKeycloakURL(),
            clientId: getKeycloakClientId()
        });
        await keycloak.init({ onLoad: "check-sso", responseMode: "query" });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const root = createRoot(document.getElementById("root")!);
        root.render(
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes keycloak={keycloak} />
                    </BrowserRouter>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
};

waitForEnv();
