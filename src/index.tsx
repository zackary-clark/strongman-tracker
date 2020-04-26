import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

import Root from "./components/root/root";
import { palette } from "./palette";

const theme = createMuiTheme({palette});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
            <Root />
        </HashRouter>
    </ThemeProvider>,
    document.getElementById("root"),
);
