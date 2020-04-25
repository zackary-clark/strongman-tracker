import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import Root from "./components/root/root";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
            <Root />
        </HashRouter>
    </ThemeProvider>,
    document.getElementById("root"),
);
