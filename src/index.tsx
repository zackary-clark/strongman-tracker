import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, StyledEngineProvider, ThemeProvider, } from "@mui/material";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { Snackbar } from "./components/snackBar/Snackbar";
import { SnackbarContextProvider } from "./context/snackbarContext";
import { getHostAddress } from "./env/getters";
import { Routes } from "./pages/Routes";
import { theme } from "./theme";

// We do this recursion so that env.js has "time" to alter the global window
// This almost always loops 0 or 1 times
let count = 0;
const waitForEnv = () => {
    if (!window.REACT_APP_HOST_ADDRESS && count < 3000) {
        setTimeout(waitForEnv, 1);
        count++;
        return;
    } else {
        if (count >= 3000) {
            console.error("Host Address never loaded!");
        }
        ReactDOM.render(
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ApolloProvider client={client()}>
                        <HashRouter>
                            <SnackbarContextProvider>
                                <Snackbar/>
                                <NavBar/>
                                <Routes />
                            </SnackbarContextProvider>
                        </HashRouter>
                    </ApolloProvider>
                </ThemeProvider>
            </StyledEngineProvider>,
            document.getElementById("root"),
        );
    }
};

const client = () => new ApolloClient({
    uri: getHostAddress(),
    cache: new InMemoryCache()
});

waitForEnv();
