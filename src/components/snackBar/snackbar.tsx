import * as React from "react";
import { Snackbar as MUISnackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { MUIClickHandler, withAppContext } from "../../context";

interface ISnackbarProps {
    onCloseSnackbar: MUIClickHandler,
    isSnackbarOpen: boolean,
}

class SnackbarSansContext extends React.Component<ISnackbarProps> {
    public render(): React.ReactNode {
        return (
            <div className={"snackbar"}>
                <MUISnackbar
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    autoHideDuration={5000}
                    open={this.props.isSnackbarOpen}
                    onClose={this.props.onCloseSnackbar}
                >
                    <Alert severity={"error"} variant={"filled"} onClose={this.props.onCloseSnackbar}>
                        This is an error.
                    </Alert>
                </MUISnackbar>
            </div>
        );
    }
}

export const Snackbar = withAppContext(SnackbarSansContext);
