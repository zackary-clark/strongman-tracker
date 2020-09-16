import React, { ComponentType, ReactNode } from "react";

export type MUIClickHandler = (event?: React.SyntheticEvent, reason?: string) => void;

interface IContext {
    isSnackbarOpen: boolean,
    onCloseSnackbar: MUIClickHandler,
    onOpenSnackbar: MUIClickHandler,
}

const defaultContext: IContext = {
    isSnackbarOpen: false,
    onCloseSnackbar: () => {},
    onOpenSnackbar: () => {},
};

const AppContext = React.createContext(defaultContext);

export function provideAppContext(WrappedComponent: ComponentType<any>) {
    return class extends React.Component<any, IContext> {
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

            this.state = {...defaultContext, onCloseSnackbar: this.closeSnackbar, onOpenSnackbar: this.openSnackbar};
        }

        public render(): ReactNode {
            return (
                <AppContext.Provider value={this.state}>
                    <WrappedComponent {...this.props} />
                </AppContext.Provider>
            );
        }
    };
}

export function withAppContext(WrappedComponent: ComponentType<any>) {
    return class extends React.Component {
        public constructor(props: any) {
            super(props);
        }

        public render(): ReactNode {
            return (
                <AppContext.Consumer>
                    {({isSnackbarOpen, onCloseSnackbar, onOpenSnackbar}) => (
                        <WrappedComponent
                            isSnackbarOpen={isSnackbarOpen}
                            onCloseSnackbar={onCloseSnackbar}
                            onOpenSnackbar={onOpenSnackbar}
                            {...this.props}
                        />
                    )}
                </AppContext.Consumer>
            );
        }
    };
}
