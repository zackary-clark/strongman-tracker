import * as React from "react";
import { Outlet, Route } from "react-router-dom";
import { MyExercisesComponent } from "../components/exercises/MyExercisesComponent";
import { NewExerciseForm } from "../components/exercises/NewExerciseForm";
import { SingleExerciseComponent } from "../components/exercises/SingleExerciseComponent";
import { EXERCISE_ID_PARAM, MY_EXERCISE_ROUTE } from "./constants";
import { RequireAuth } from "./RequireAuth";

export const MyExercisePage = (
    <Route path={MY_EXERCISE_ROUTE} element={<RequireAuth><Outlet /></RequireAuth>}>
        <Route index element={<MyExercisesComponent />} />
        <Route path="new" element={<NewExerciseForm />} />
        <Route path={`:${EXERCISE_ID_PARAM}`} element={<SingleExerciseComponent />} />
    </Route>
);
