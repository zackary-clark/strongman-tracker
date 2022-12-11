import * as React from "react";
import { FunctionComponent } from "react";
import { Route, Routes as RRRoutes } from "react-router-dom";
import { ProjectDescription } from "../components/ProjectDescription";
import { ROOT_ROUTE } from "./constants";
import { MaxPage } from "./MaxPage";
import { MyExercisePage } from "./MyExercisePage";
import { NoMatch } from "./NoMatch";
import { ProgrammedWorkoutPage } from "./ProgrammedWorkoutPage";
import { ProgramPage } from "./ProgramPage";
import { Root } from "./Root";
import { WorkoutPage } from "./WorkoutPage";

export const Routes: FunctionComponent = () => (
    <RRRoutes>
        <Route path={ROOT_ROUTE} element={<Root />}>
            <Route index element={<ProjectDescription />} />
            {MaxPage}
            {WorkoutPage}
            {MyExercisePage}
            {ProgramPage}
            {ProgrammedWorkoutPage}
        </Route>
        <Route path="*" element={<NoMatch />} />
    </RRRoutes>
);
