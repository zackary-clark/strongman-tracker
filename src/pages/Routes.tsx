import * as React from "react";
import { FunctionComponent } from "react";
import { Routes as RRRoutes } from "react-router-dom";
import { MaxPage } from "./MaxPage";
import { RootPage } from "./RootPage";
import { WorkoutPage } from "./WorkoutPage";

export const Routes: FunctionComponent = () => (
    <RRRoutes>
        {RootPage}
        {MaxPage}
        {WorkoutPage}
    </RRRoutes>
);
