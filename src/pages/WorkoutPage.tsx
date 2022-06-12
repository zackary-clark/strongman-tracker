import * as React from "react";
import { Route } from "react-router-dom";
import { WorkoutForm } from "../components/workouts/WorkoutForm";
import { WorkoutList } from "../components/workouts/WorkoutList";
import { WORKOUT_ID_PARAM, WORKOUT_ROUTE } from "./constants";

export const WorkoutPage = (
    <Route path={WORKOUT_ROUTE}>
        <Route index element={<WorkoutList />} />
        <Route path={`:${WORKOUT_ID_PARAM}`} element={<WorkoutForm />} />
    </Route>
);
