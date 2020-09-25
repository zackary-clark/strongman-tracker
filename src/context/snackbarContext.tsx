import React, { ComponentType, ReactNode } from "react";
import { Subtract } from "utility-types/dist/mapped-types";

export type MUIClickHandler = (event?: React.SyntheticEvent, reason?: string) => void;

interface ISnackbarContext {
    isSnackbarOpen?: boolean,
    snackbarMessage?: string,
    onCloseSnackbar?: MUIClickHandler,
    onOpenSnackbar?: MUIClickHandler,
}

export const defaultSnackbarMessage = "An Error Occurred";

const defaultSnackbarContext: ISnackbarContext = {
    isSnackbarOpen: false,
    snackbarMessage: defaultSnackbarMessage,
    onCloseSnackbar: () => {},
    onOpenSnackbar: () => {},
};

const SnackbarContext = React.createContext(defaultSnackbarContext);

export function provideSnackbarContext(WrappedComponent: ComponentType<any>) {
    return class extends React.Component<any, ISnackbarContext> {
        closeSnackbar: () => void;
        openSnackbar: () => void;

        public constructor(props: any) {
            super(props);

            this.closeSnackbar = () => {
                this.setState({isSnackbarOpen: false});
            };

            this.openSnackbar = () => {
                this.setState({isSnackbarOpen: true});
            };

            this.state = {...defaultSnackbarContext, onCloseSnackbar: this.closeSnackbar, onOpenSnackbar: this.openSnackbar};
        }

        public render(): ReactNode {
            return (
                <SnackbarContext.Provider value={this.state}>
                    <WrappedComponent {...this.props} />
                </SnackbarContext.Provider>
            );
        }
    };
}

export function withSnackbarContext<T extends ISnackbarContext>(WrappedComponent: ComponentType<T>) {
    return class extends React.Component<Subtract<T, ISnackbarContext>> {
        public constructor(props: T) {
            super(props);
        }

        public render(): ReactNode {
            return (
                <SnackbarContext.Consumer>
                    {({
                          isSnackbarOpen,
                          snackbarMessage,
                          onCloseSnackbar,
                          onOpenSnackbar
                    }) => (
                        <WrappedComponent
                            isSnackbarOpen={isSnackbarOpen}
                            snackbarMessage={snackbarMessage}
                            onCloseSnackbar={onCloseSnackbar}
                            onOpenSnackbar={onOpenSnackbar}
                            {...this.props as T}
                        />
                    )}
                </SnackbarContext.Consumer>
            );
        }
    };
}
