import React from "react";

interface IContext {
    snackbar: ISnackbar,
}

interface ISnackbar {
    open: boolean,
    severity: "error" | "warning" | "info" | "success",
    content: string,
}

const defaultContext: IContext = {
    snackbar: {
        open: false,
        severity: "info",
        content: "Information",
    }
};

export const AppContext = React.createContext(defaultContext);
