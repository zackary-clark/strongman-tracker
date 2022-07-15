import { ApolloError } from "@apollo/client";
import { OpenSnackbar } from "../context/snackbarContext";

export const onQueryError = (openSnackbar: OpenSnackbar): (error: ApolloError) => void => {
    return function({ networkError }) {
        // @ts-ignore
        if (networkError?.statusCode === 403) {
            console.error("Forbidden");
            openSnackbar("error", "Not Logged In!");
        } else {
            console.error("Query Failed! Check graphql response for details");
            openSnackbar("error", "Network Error!");
        }
    };
};

export const onMutationError = (openSnackbar: OpenSnackbar): (error: ApolloError) => void => {
    return function({ networkError }) {
        // @ts-ignore
        if (networkError?.statusCode === 403) {
            console.error("Forbidden");
            openSnackbar("error", "Not Logged In!");
        } else {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Network Error!");
        }
    };
};
