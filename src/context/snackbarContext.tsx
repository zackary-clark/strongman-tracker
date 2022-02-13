import React, { SyntheticEvent, useContext, useState } from "react";
import { SnackbarCloseReason } from "@mui/material";

type MUIClickHandler = (event: Event | SyntheticEvent, reason?: SnackbarCloseReason) => void;

interface ISnackbarContext {
    isSnackbarOpen: boolean,
    snackbarMessage: string,
    closeSnackbar: MUIClickHandler,
    openSnackbar: (message?: string) => void,
}

export const defaultSnackbarMessage = "An Error Occurred";

const defaultSnackbarContext: ISnackbarContext = {
    isSnackbarOpen: false,
    snackbarMessage: defaultSnackbarMessage,
    closeSnackbar: () => {},
    openSnackbar: () => {},
};

export const SnackbarContext = React.createContext(defaultSnackbarContext);

export const SnackbarContextProvider: React.FunctionComponent = ({children}) => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(defaultSnackbarContext.isSnackbarOpen);
    const [snackbarMessage, setSnackbarMessage] = useState(defaultSnackbarContext.snackbarMessage);

    const closeSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    const openSnackbar = (message?: string) => {
        setSnackbarMessage(message || defaultSnackbarContext.snackbarMessage);
        setIsSnackbarOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{
            isSnackbarOpen,
            snackbarMessage,
            closeSnackbar: closeSnackbar,
            openSnackbar: openSnackbar
        }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useOpenSnackbar = (): (message?: string) => void => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error("useOpenSnackbar must be used within a SnackbarContextProvider");
    }
    return context.openSnackbar;
};
