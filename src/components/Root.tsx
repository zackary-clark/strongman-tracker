import { Box } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { MaxComponent } from "./maxes/MaxComponent";
import { NavBar } from "./navBar/NavBar";
import { ProjectDescription } from "./ProjectDescription";
import { ADD_RELATIVE_ROUTE, MAX_ROUTE, WORKOUT_ROUTE } from "./routes";
import { Snackbar } from "./snackBar/Snackbar";
import { AddWorkout } from "./workouts/AddWorkout";
import { WorkoutList } from "./workouts/WorkoutList";

export const Root: FunctionComponent = () => (
    <Box>
        <Snackbar/>
        <NavBar/>
        <Routes>
            <Route path="/" element={<ProjectDescription />} />
            <Route path={MAX_ROUTE} element={<MaxComponent />}/>
            <Route path={WORKOUT_ROUTE}>
                <Route path="" element={<WorkoutList />} />
                <Route path={ADD_RELATIVE_ROUTE} element={<AddWorkout />} />
            </Route>
        </Routes>
    </Box>
);
