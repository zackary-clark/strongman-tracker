import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as React from "react";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navBar/NavBar";
import { Snackbar } from "../components/snackBar/Snackbar";
import { SnackbarContextProvider } from "../context/snackbarContext";
import { getApiAddress } from "../env/getters";
import { typePolicies } from "../operations/typePolicies";

export const Root: FunctionComponent = () => {
    const { getAccessTokenSilently } = useAuth0();

    const client = () => {
        const httpLink = createHttpLink({
            uri: getApiAddress()
        });

        const authLink = setContext(async (_, { headers }) => {
            const token = await getAccessTokenSilently();

            return {
                headers: {
                    ...headers,
                    ...(token ? { authorization: `Bearer ${token}` } : {})
                }
            };
        });

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache({ typePolicies })
        });
    };

    return (
        <ApolloProvider client={client()}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SnackbarContextProvider>
                    <Snackbar />
                    <NavBar />
                    <Outlet />
                </SnackbarContextProvider>
            </LocalizationProvider>
        </ApolloProvider>
    );
};
