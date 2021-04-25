import * as React from "react";
import { useContext } from "react";
import { Snackbar as MUISnackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SnackbarContext } from "../../context";

interface ISnackbarProps {
    autoHideDuration?: number,
}

export function Snackbar(props: ISnackbarProps): React.ReactElement {
    const { isSnackbarOpen, onCloseSnackbar, snackbarMessage } = useContext(SnackbarContext);

    return (
        <div className={"snackbar"}>
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
        </div>
    );
}
