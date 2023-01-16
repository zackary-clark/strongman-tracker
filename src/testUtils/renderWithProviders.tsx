import { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, RenderResult } from "@testing-library/react";
import React, { FunctionComponent, PropsWithChildren } from "react";
import { MemoryRouter, Routes } from "react-router-dom";
import { Snackbar } from "../components/snackBar/Snackbar";
import { SnackbarContextProvider } from "../context/snackbarContext";
import { typePolicies } from "../operations/typePolicies";
import { ROOT_ROUTE } from "../pages/constants";
import { createThemeWithMode } from "../theme";

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
    const Wrapper: FunctionComponent<PropsWithChildren> = ({children}) => (
        <ThemeWrapper>
            <RoutingWrapper>
                <ApolloWrapper>
                    {children}
                </ApolloWrapper>
            </RoutingWrapper>
        </ThemeWrapper>
    );
    return render(component, {wrapper: Wrapper});
};

export const renderWithSnackbarAndApollo = (component: React.ReactElement, mocks?: MockedResponse[]): RenderResult => {
    const ApolloWrapper = createApolloProviderWrapper(mocks);
    const Wrapper: FunctionComponent<PropsWithChildren> = ({children}) => (
        <ThemeWrapper>
            <ApolloWrapper>
                <SnackbarWrapper>
                    {children}
                </SnackbarWrapper>
            </ApolloWrapper>
        </ThemeWrapper>
    );
    return render(component, {wrapper: Wrapper});
};

export const renderWithAllProviders = (
    component: React.ReactElement,
    mocks?: MockedResponse[],
    path?: string,
): RenderResult => {
    const Wrapper = createAllProviderWrapper(mocks, path);
    return render(component, {wrapper: Wrapper});
};

export const renderPage = (page: React.ReactElement, path: string, mocks?: MockedResponse[]): RenderResult => {
    return renderWithAllProviders(<Routes>{page}</Routes>, mocks, path);
};

export const createAllProviderWrapper = (
    mocks?: MockedResponse[],
    path?: string,
): FunctionComponent<PropsWithChildren> => {
    const ApolloWrapper = createApolloProviderWrapper(mocks);
    const RoutingWrapper = createRoutingWrapper(path);
    return ({children}) => (
        <ThemeWrapper>
            <RoutingWrapper>
                <SnackbarWrapper>
                    <ApolloWrapper>
                        {children}
                    </ApolloWrapper>
                </SnackbarWrapper>
            </RoutingWrapper>
        </ThemeWrapper>
    );
};

const createApolloProviderWrapper = (mocks?: MockedResponse[]): FunctionComponent<PropsWithChildren> => ({children}) => {
    const cache = new InMemoryCache({ typePolicies });
    return (
        <MockedProvider cache={cache} mocks={mocks}>
            {children}
        </MockedProvider>
    );
};

const createRoutingWrapper = (path?: string): FunctionComponent<PropsWithChildren> => ({children}) => (
    <MemoryRouter initialEntries={[path ?? ROOT_ROUTE]}>
        {children}
    </MemoryRouter>
);

const SnackbarWrapper: FunctionComponent<PropsWithChildren> = ({children}) => (
    <SnackbarContextProvider>
        <Snackbar autoHideDuration={1} />
        {children}
    </SnackbarContextProvider>
);

const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({children}) => {
    const theme = createThemeWithMode("dark");
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};
