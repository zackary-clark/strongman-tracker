import React, { FunctionComponent, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticated } from "../context/keycloakContext";
import { useLoginWarning } from "../context/snackbarContext";
import { ROOT_ROUTE } from "./constants";

interface Props {
    children: ReactElement
}

export const RequireAuth: FunctionComponent<Props> = ({ children }) => {
    const authenticated = useAuthenticated();
    const openLoginWarning = useLoginWarning();

    if (!authenticated) {
        openLoginWarning();
        return <Navigate to={ROOT_ROUTE} replace />;
    }

    return children;
};
