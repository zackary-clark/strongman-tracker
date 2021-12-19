import * as React from "react";
import { useContext } from "react";
import { Box, Snackbar as MUISnackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SnackbarContext } from "../../context";

interface Props {
    autoHideDuration?: number,
}

export function Snackbar(props: Props): React.ReactElement {
    const { isSnackbarOpen, onCloseSnackbar, snackbarMessage } = useContext(SnackbarContext);

    return (
        <Box className={"snackbar"}>
            <MUISnackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                autoHideDuration={props.autoHideDuration || 5000}
                open={isSnackbarOpen}
                onClose={onCloseSnackbar}
            >
                <Alert severity={"error"} variant={"filled"} onClose={onCloseSnackbar}>
                    {snackbarMessage}
                </Alert>
            </MUISnackbar>
        </Box>
    );
}
