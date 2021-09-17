import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import { Root } from "./components";
import { palette } from "./palette";
import { SnackbarContextProvider } from "./context";

const theme = createMuiTheme({palette});

// We do this recursion so that env.js has "time" to alter the global window
// This almost always loops 0 or 1 times
let count = 0;
const waitForEnv = () => {
    if(!window.REACT_APP_HOST_ADDRESS && count < 3000) {
        setTimeout(waitForEnv, 1);
        count++;
        return;
    } else {
        if (count >= 3000) {console.error("Host Address never loaded!");}
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
    }
};

waitForEnv();
