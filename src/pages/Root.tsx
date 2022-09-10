import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Keycloak from "keycloak-js";
import * as React from "react";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navBar/NavBar";
import { Snackbar } from "../components/snackBar/Snackbar";
import { KeycloakContext } from "../context/keycloakContext";
import { SnackbarContextProvider } from "../context/snackbarContext";
import { getApiAddress } from "../env/getters";
import { typePolicies } from "../operations/typePolicies";

interface Props {
    keycloak: Keycloak;
}

export const Root: FunctionComponent<Props> = ({keycloak}) => (
    <ApolloProvider client={client(keycloak)}>
        <KeycloakContext.Provider value={keycloak}>
            <SnackbarContextProvider>
                <Snackbar />
                <NavBar />
                <Outlet />
            </SnackbarContextProvider>
        </KeycloakContext.Provider>
    </ApolloProvider>
);

const client = (keycloak: Keycloak) => {
    const httpLink = createHttpLink({
        uri: getApiAddress()
    });

    const authLink = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${keycloak.token}`
        }
    }));

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({typePolicies})
    });
};
