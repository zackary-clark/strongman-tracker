import React, { FunctionComponent, SyntheticEvent, useContext, useState } from "react";
import { SnackbarCloseReason } from "@mui/material";

type SnackbarType = "error" | "warning" | "info" | "success";

type MUIClickHandler = (event: Event | SyntheticEvent, reason?: SnackbarCloseReason) => void;

export type OpenSnackbar = (type?: SnackbarType, message?: string) => void;

interface ISnackbarContext {
    isSnackbarOpen: boolean,
    type: SnackbarType,
    message: string,
    closeSnackbar: MUIClickHandler,
    openSnackbar: OpenSnackbar,
}

export const defaultSnackbarMessage = "An Error Occurred";

const defaultSnackbarContext: ISnackbarContext = {
    isSnackbarOpen: false,
    type: "error",
    message: defaultSnackbarMessage,
    closeSnackbar: () => {},
    openSnackbar: () => {},
};

export const SnackbarContext = React.createContext(defaultSnackbarContext);

export const SnackbarContextProvider: FunctionComponent = ({children}) => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(defaultSnackbarContext.isSnackbarOpen);
    const [type, setType] = useState(defaultSnackbarContext.type);
    const [message, setMessage] = useState(defaultSnackbarContext.message);

    const closeSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    const openSnackbar: OpenSnackbar = (type?: SnackbarType, message?: string) => {
        setType(type ?? defaultSnackbarContext.type);
        setMessage(message ?? defaultSnackbarContext.message);
        setIsSnackbarOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{
            isSnackbarOpen,
            message,
            type,
            closeSnackbar: closeSnackbar,
            openSnackbar: openSnackbar
        }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): OpenSnackbar => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error("useSnackbar must be used within a SnackbarContextProvider");
    }
    return context.openSnackbar;
};

export const useLoginWarning = (): () => void => {
    const openSnackbar = useSnackbar();
    return () => openSnackbar("warning", "Log In to see more!");
};
