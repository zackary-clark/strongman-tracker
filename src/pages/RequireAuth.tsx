import { useAuth0 } from "@auth0/auth0-react";
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useLoginWarning } from "../context/snackbarContext";
import { ROOT_ROUTE } from "./constants";

export const RequireAuth: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const { isAuthenticated } = useAuth0();
    const openLoginWarning = useLoginWarning();

    if (!isAuthenticated) {
        openLoginWarning();
        return <Navigate to={ROOT_ROUTE} replace />;
    }

    return <>{children}</>;
};
