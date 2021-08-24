import React, { useState } from "react";

export type MUIClickHandler = (event?: React.SyntheticEvent, reason?: string) => void;

interface ISnackbarContext {
    isSnackbarOpen: boolean,
    snackbarMessage: string,
    onCloseSnackbar: MUIClickHandler,
    onOpenSnackbar: (message?: string) => void,
}

export const defaultSnackbarMessage = "An Error Occurred";

const defaultSnackbarContext: ISnackbarContext = {
    isSnackbarOpen: false,
    snackbarMessage: defaultSnackbarMessage,
    onCloseSnackbar: () => {},
    onOpenSnackbar: () => {},
};

export const SnackbarContext = React.createContext(defaultSnackbarContext);

export function SnackbarContextProvider(props: any) {
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
            onCloseSnackbar: closeSnackbar,
            onOpenSnackbar: openSnackbar
        }}>
            {props.children}
        </SnackbarContext.Provider>
    );
}
