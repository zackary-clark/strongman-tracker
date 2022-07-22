import * as React from "react";
import { Route } from "react-router-dom";
import { MaxComponent } from "../components/maxes/MaxComponent";
import { MAX_ROUTE } from "./constants";
import { RequireAuth } from "./RequireAuth";

export const MaxPage = (
    <Route
        path={MAX_ROUTE}
        element={
            <RequireAuth>
                <MaxComponent />
            </RequireAuth>
        }
    />
);
