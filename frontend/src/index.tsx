import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { ThemeProvider } from "@material-ui/styles";

import Root from "./components/root/root";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

ReactDOM.render(
    <Provider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <Root />
            </HashRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root"),
);
