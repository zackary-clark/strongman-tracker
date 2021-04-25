import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Snackbar } from "../../src/components/snackBar";
import { SnackbarContextProvider } from "../../src/context";

export const renderInRouter = (component: React.ReactElement, path?: string) => {
    const RoutingWrapper: React.FunctionComponent = ({children}) => {
        return (
            <MemoryRouter initialEntries={[path ? path : "/"]}>
                {children}
            </MemoryRouter>
        );
    };
    return render(component, {wrapper: RoutingWrapper});
};

export const renderWithSnackbar = (component: React.ReactElement) => {
    const ComponentWithSnackbarAndContext = () => (
            <SnackbarContextProvider>
                <React.Fragment>
                    <Snackbar />
                    {component}
                </React.Fragment>
            </SnackbarContextProvider>
        );

    return render(<ComponentWithSnackbarAndContext />);
};
