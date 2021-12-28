import * as React from "react";
import { useContext } from "react";
import { Box, Alert, Snackbar as MUISnackbar } from "@mui/material";
import { SnackbarContext } from "../../context";

interface Props {
    autoHideDuration?: number,
}

export function Snackbar({autoHideDuration}: Props): React.ReactElement {
    const {isSnackbarOpen, closeSnackbar, snackbarMessage} = useContext(SnackbarContext);

    return (
        <Box className={"snackbar"}>
            <MUISnackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                autoHideDuration={autoHideDuration || 5000}
                open={isSnackbarOpen}
                onClose={closeSnackbar}
            >
                <Alert severity={"error"} variant={"filled"} onClose={closeSnackbar}>
                    {snackbarMessage}
                </Alert>
            </MUISnackbar>
        </Box>
    );
}
