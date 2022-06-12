import * as React from "react";
import { Route } from "react-router-dom";
import { AddWorkout } from "../components/workouts/AddWorkout";
import { WorkoutList } from "../components/workouts/WorkoutList";
import { ADD_RELATIVE_ROUTE, WORKOUT_ROUTE } from "./constants";

export const WorkoutPage = (
    <Route path={WORKOUT_ROUTE}>
        <Route path="" element={<WorkoutList />} />
        <Route path={ADD_RELATIVE_ROUTE} element={<AddWorkout />} />
    </Route>
);
