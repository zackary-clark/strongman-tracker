import * as React from "react";
import { FunctionComponent, useContext } from "react";
import { Box, Alert, Snackbar as MUISnackbar } from "@mui/material";
import { SnackbarContext } from "../../context/snackbarContext";

interface Props {
    autoHideDuration?: number,
}

export const Snackbar: FunctionComponent<Props> = ({autoHideDuration}) => {
    const {isSnackbarOpen, closeSnackbar, message, type} = useContext(SnackbarContext);

    return (
        <Box className={"snackbar"}>
            <MUISnackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                autoHideDuration={autoHideDuration || 5000}
                open={isSnackbarOpen}
                onClose={closeSnackbar}
            >
                <Alert severity={type} variant="filled" onClose={closeSnackbar}>
                    {message}
                </Alert>
            </MUISnackbar>
        </Box>
    );
};
