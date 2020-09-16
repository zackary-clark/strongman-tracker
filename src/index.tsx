import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import { Root } from "./components";
import { palette } from "./palette";
import { provideAppContext } from "./context";

const theme = createMuiTheme({palette});

// Don't use HOC inside render method. Ref: https://reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
const RootProvidingContext = provideAppContext(Root);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
            <RootProvidingContext />
        </HashRouter>
    </ThemeProvider>,
    document.getElementById("root"),
);
