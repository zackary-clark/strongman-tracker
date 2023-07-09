import { useReactiveVar } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { CssBaseline, StyledEngineProvider, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { FunctionComponent, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getApiAddress, getAuthZeroClientId, getAuthZeroDomain } from "./env/getters";
import { createRoutes } from "./pages/routes";
import { themeModeVar } from "./reactiveVariables";
import { createThemeWithMode } from "./theme";

export const App: FunctionComponent = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const themeMode = useReactiveVar(themeModeVar);

    useEffect(() => {
        themeModeVar(prefersDarkMode ? "dark" : "light");
    }, [prefersDarkMode]);

    const theme = useMemo(() => createThemeWithMode(themeMode), [themeMode]);

    const router = createBrowserRouter(createRoutes());

    return (
        <Auth0Provider
            domain={getAuthZeroDomain()}
            clientId={getAuthZeroClientId()}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: getApiAddress(),
            }}
        >
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </StyledEngineProvider>
        </Auth0Provider>
    );
};
