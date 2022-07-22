import * as React from "react";
import { Outlet, Route } from "react-router-dom";
import { WorkoutForm } from "../components/workouts/WorkoutForm";
import { WorkoutList } from "../components/workouts/WorkoutList";
import { WORKOUT_ID_PARAM, WORKOUT_ROUTE } from "./constants";
import { RequireAuth } from "./RequireAuth";

export const WorkoutPage = (
    <Route path={WORKOUT_ROUTE} element={<RequireAuth><Outlet /></RequireAuth>}>
        <Route index element={<WorkoutList />} />
        <Route path={`:${WORKOUT_ID_PARAM}`} element={<WorkoutForm />} />
    </Route>
);
