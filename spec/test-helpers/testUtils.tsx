import React, { FunctionComponent, ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Snackbar } from "../../src/components/snackBar";
import { provideSnackbarContext } from "../../src/context";

export const renderInRouter = (component: ReactElement<any>, path?: string) => {
    // @ts-ignore
    const RoutingWrapper: FunctionComponent = ({children}) => {
        return (
            <MemoryRouter initialEntries={[path ? path : "/"]}>
                {children}
            </MemoryRouter>
        );
    };
    return render(component, {wrapper: RoutingWrapper});
};

export const renderWithSnackbar = (component: ReactElement) => {
    const componentAndSnackbar = () => (
        <React.Fragment>
            <Snackbar />
            {component}
        </React.Fragment>
    );

    const ComponentWithSnackbarAndContext = provideSnackbarContext(componentAndSnackbar);

    return render(<ComponentWithSnackbarAndContext />);
};
