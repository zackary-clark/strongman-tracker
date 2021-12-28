import React, { PropsWithChildren, SyntheticEvent, useState } from "react";
import { SnackbarCloseReason } from "@mui/material";

export type MUIClickHandler = (event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => void;

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

export function SnackbarContextProvider({children}: PropsWithChildren<unknown>): JSX.Element {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(defaultSnackbarContext.isSnackbarOpen);
    const [snackbarMessage, setSnackbarMessage] = useState(defaultSnackbarContext.snackbarMessage);

    const closeSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    const openSnackbar = (message?: string) => {
        setIsSnackbarOpen(true);
        setSnackbarMessage(message || defaultSnackbarContext.snackbarMessage);
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
}
