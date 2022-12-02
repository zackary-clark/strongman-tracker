import * as React from "react";
import { Outlet, Route } from "react-router-dom";
import { NewProgrammedWorkout } from "../components/programmedWorkouts/NewProgrammedWorkout";
import { SingleProgrammedWorkoutComponent } from "../components/programmedWorkouts/SingleProgrammedWorkoutComponent";
import { PROGRAM_ID_PARAM, PROGRAMMED_WORKOUT_ID_PARAM, PROGRAMMED_WORKOUT_ROUTE } from "./constants";
import { RequireAuth } from "./RequireAuth";

export const ProgrammedWorkoutPage = (
    <Route path={PROGRAMMED_WORKOUT_ROUTE} element={<RequireAuth><Outlet /></RequireAuth>}>
        <Route path={`new/:${PROGRAM_ID_PARAM}`} element={<NewProgrammedWorkout />} />
        <Route path={`:${PROGRAMMED_WORKOUT_ID_PARAM}`} element={<SingleProgrammedWorkoutComponent />} />
    </Route>
);
