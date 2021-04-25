import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import { Root } from "./components";
import { palette } from "./palette";
import { SnackbarContextProvider } from "./context";

const theme = createMuiTheme({palette});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
            <SnackbarContextProvider>
                <Root />
            </SnackbarContextProvider>
        </HashRouter>
    </ThemeProvider>,
    document.getElementById("root"),
);
