import * as React from "react";
import { Route } from "react-router-dom";
import { MyExercisesComponent } from "../components/exercises/MyExercisesComponent";
import { MY_EXERCISE_ROUTE } from "./constants";
import { RequireAuth } from "./RequireAuth";

export const MyExercisePage = (
    <Route path={MY_EXERCISE_ROUTE} element={<RequireAuth><MyExercisesComponent /></RequireAuth>} />
);
