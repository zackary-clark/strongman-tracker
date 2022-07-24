import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { CssBaseline, StyledEngineProvider, ThemeProvider, } from "@mui/material";
import Keycloak from "keycloak-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { Snackbar } from "./components/snackBar/Snackbar";
import { SnackbarContextProvider } from "./context/snackbarContext";
import { getHostAddress, getKeycloakClientId, getKeycloakRealm, getKeycloakURL } from "./env/getters";
import { typePolicies } from "./operations/typePolicies";
import { Routes } from "./pages/Routes";
import { theme } from "./theme";
import { KeycloakContext } from "./context/keycloakContext";

// We do this recursion so that env.js has "time" to alter the global window
// This almost always loops 0 or 1 times
let count = 0;
const waitForEnv = async () => {
    if (!window.REACT_APP_HOST_ADDRESS && count < 3000) {
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
        ReactDOM.render(
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ApolloProvider client={client(keycloak)}>
                        <HashRouter>
                            <KeycloakContext.Provider value={keycloak}>
                                <SnackbarContextProvider>
                                    <Snackbar />
                                    <NavBar />
                                    <Routes />
                                </SnackbarContextProvider>
                            </KeycloakContext.Provider>
                        </HashRouter>
                    </ApolloProvider>
                </ThemeProvider>
            </StyledEngineProvider>,
            document.getElementById("root"),
        );
    }
};

const client = (keycloak: Keycloak) => {
    const httpLink = createHttpLink({
        uri: getHostAddress()
    });

    const authLink = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${keycloak.token}`
        }
    }));

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({typePolicies})
    });
};

waitForEnv();
