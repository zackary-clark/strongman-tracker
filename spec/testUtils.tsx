import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import { Snackbar } from "../src/components/snackBar/Snackbar";
import { SnackbarContextProvider } from "../src/context/snackbarContext";

export const renderWithRouter = (component: React.ReactElement, path?: string): RenderResult => {
    return render(component, {wrapper: createRoutingWrapper(path)});
};

export const renderWithApollo = (component: React.ReactElement, mocks?: MockedResponse[]): RenderResult => {
    return render(component, {wrapper: createApolloProviderWrapper(mocks)});
};

export const renderWithSnackbar = (component: React.ReactElement): RenderResult => {
    return render(component, {wrapper: SnackbarWrapper});
};

export const renderWithRouterAndApollo = (component: React.ReactElement, mocks?: MockedResponse[], path?: string): RenderResult => {
    const ApolloWrapper = createApolloProviderWrapper(mocks);
    const RoutingWrapper = createRoutingWrapper(path);
    const Wrapper: React.FunctionComponent = ({children}) => (
        <RoutingWrapper>
            <ApolloWrapper>
                {children}
            </ApolloWrapper>
        </RoutingWrapper>
    );
    return render(component, {wrapper: Wrapper});
};

export const renderWithSnackbarAndApollo = (component: React.ReactElement, mocks?: MockedResponse[]): RenderResult => {
    const ApolloWrapper = createApolloProviderWrapper(mocks);
    const Wrapper: React.FunctionComponent = ({children}) => (
        <ApolloWrapper>
            <SnackbarWrapper>
                {children}
            </SnackbarWrapper>
        </ApolloWrapper>
    );
    return render(component, {wrapper: Wrapper});
};

export const renderWithAllProviders = (component: React.ReactElement, mocks?: MockedResponse[], path?: string): RenderResult => {
    const ApolloWrapper = createApolloProviderWrapper(mocks);
    const RoutingWrapper = createRoutingWrapper(path);
    const Wrapper: React.FunctionComponent = ({children}) => (
        <RoutingWrapper>
            <SnackbarWrapper>
                <ApolloWrapper>
                    {children}
                </ApolloWrapper>
            </SnackbarWrapper>
        </RoutingWrapper>
    );
    return render(component, {wrapper: Wrapper});
};

export const renderPage = (page: React.ReactElement, path: string, mocks?: MockedResponse[]): RenderResult => {
    return renderWithAllProviders(<Routes>{page}</Routes>, mocks, path);
};

const createApolloProviderWrapper = (mocks?: MockedResponse[]): React.FunctionComponent => ({children}) => {
    return (
        <MockedProvider mocks={mocks} addTypename={false}>
            {children}
        </MockedProvider>
    );
};

const createRoutingWrapper = (path?: string): React.FunctionComponent => ({children}) => {
    return (
        <MemoryRouter initialEntries={[path ?? "/"]}>
            {children}
        </MemoryRouter>
    );
};

const SnackbarWrapper: React.FunctionComponent = ({children}) => {
    return (
        <SnackbarContextProvider>
            <Snackbar />
            {children}
        </SnackbarContextProvider>
    );
};
