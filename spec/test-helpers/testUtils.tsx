import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Snackbar } from "../../src/components/snackBar";
import { SnackbarContextProvider } from "../../src/context";

export const renderInRouter = (component: React.ReactElement, path?: string): RenderResult => {
    const RoutingWrapper: React.FunctionComponent = ({children}) => {
        return (
            <MemoryRouter initialEntries={[path ? path : "/"]}>
                {children}
            </MemoryRouter>
        );
    };
    return render(component, {wrapper: RoutingWrapper});
};

export const renderWithApolloProvider = (component: React.ReactElement, mocks?: MockedResponse[]): RenderResult => {
    const ApolloProviderWrapper: React.FunctionComponent = ({children}) => {
        return (
            <MockedProvider mocks={mocks} addTypename={false}>
                {children}
            </MockedProvider>
        );
    };
    return render(component, {wrapper: ApolloProviderWrapper});
};

export const renderWithSnackbar = (component: React.ReactElement): RenderResult => {
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
