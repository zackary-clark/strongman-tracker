import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, RenderResult } from "@testing-library/react";
import Keycloak from "keycloak-js";
import React, { FunctionComponent, PropsWithChildren } from "react";
import { MemoryRouter, Routes } from "react-router-dom";
import { Snackbar } from "../components/snackBar/Snackbar";
import { KeycloakContext } from "../context/keycloakContext";
import { SnackbarContextProvider } from "../context/snackbarContext";
import { ROOT_ROUTE } from "../pages/constants";
import { theme } from "../theme";
import { createKeycloakMock } from "./keycloak";

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
    keycloakMock: Keycloak = createKeycloakMock()
): RenderResult => {
    const Wrapper = createAllProviderWrapper(mocks, path, keycloakMock);
    return render(component, {wrapper: Wrapper});
};

export const renderPage = (page: React.ReactElement, path: string, mocks?: MockedResponse[]): RenderResult => {
    return renderWithAllProviders(<Routes>{page}</Routes>, mocks, path);
};

export const createAllProviderWrapper = (
    mocks?: MockedResponse[],
    path?: string,
    keycloakMock: Keycloak = createKeycloakMock()
): FunctionComponent<PropsWithChildren> => {
    const ApolloWrapper = createApolloProviderWrapper(mocks);
    const RoutingWrapper = createRoutingWrapper(path);
    const KeycloakWrapper = createKeycloakWrapper(keycloakMock);
    return ({children}) => (
        <ThemeWrapper>
            <RoutingWrapper>
                <KeycloakWrapper>
                    <SnackbarWrapper>
                        <ApolloWrapper>
                            {children}
                        </ApolloWrapper>
                    </SnackbarWrapper>
                </KeycloakWrapper>
            </RoutingWrapper>
        </ThemeWrapper>
    );
};

const createApolloProviderWrapper = (mocks?: MockedResponse[]): FunctionComponent<PropsWithChildren> => ({children}) => (
    <MockedProvider mocks={mocks} addTypename={false}>
        {children}
    </MockedProvider>
);

const createRoutingWrapper = (path?: string): FunctionComponent<PropsWithChildren> => ({children}) => (
    <MemoryRouter initialEntries={[path ?? ROOT_ROUTE]}>
        {children}
    </MemoryRouter>
);

const SnackbarWrapper: FunctionComponent<PropsWithChildren> = ({children}) => (
    <SnackbarContextProvider>
        <Snackbar />
        {children}
    </SnackbarContextProvider>
);

const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({children}) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

const createKeycloakWrapper = (keycloak: Keycloak): FunctionComponent<PropsWithChildren> => ({children}) => (
    <KeycloakContext.Provider value={keycloak}>
        {children}
    </KeycloakContext.Provider>
);
