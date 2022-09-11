import React, { FunctionComponent, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticated } from "../context/keycloakContext";
import { useLoginWarning } from "../context/snackbarContext";
import { ROOT_ROUTE } from "./constants";

export const RequireAuth: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const authenticated = useAuthenticated();
    const openLoginWarning = useLoginWarning();

    if (!authenticated) {
        openLoginWarning();
        return <Navigate to={ROOT_ROUTE} replace />;
    }

    return <>{children}</>;
};
