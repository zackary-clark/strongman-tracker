import * as React from "react";
import { FunctionComponent } from "react";
import { Route, Routes as RRRoutes } from "react-router-dom";
import { MaxPage } from "./MaxPage";
import { MyExercisePage } from "./MyExercisePage";
import { NoMatch } from "./NoMatch";
import { ProgramPage } from "./ProgramPage";
import { RootPage } from "./RootPage";
import { WorkoutPage } from "./WorkoutPage";

export const Routes: FunctionComponent = () => (
    <RRRoutes>
        {RootPage}
        {MaxPage}
        {WorkoutPage}
        {MyExercisePage}
        {ProgramPage}
        <Route path="*" element={<NoMatch />} />
    </RRRoutes>
);
