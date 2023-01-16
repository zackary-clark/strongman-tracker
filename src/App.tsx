import { useReactiveVar } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { CssBaseline, StyledEngineProvider, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { FunctionComponent, useEffect, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { getApiAddress, getAuthZeroClientId, getAuthZeroDomain } from "./env/getters";
import { Routes } from "./pages/Routes";
import { themeModeVar } from "./reactiveVariables";
import { createThemeWithMode } from "./theme";

export const App: FunctionComponent = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const themeMode = useReactiveVar(themeModeVar);

    useEffect(() => {
        themeModeVar(prefersDarkMode ? "dark" : "light");
    }, [prefersDarkMode]);

    const theme = useMemo(() => createThemeWithMode(themeMode), [themeMode]);

    return (
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
};
