import { Box } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";
import { Route } from "react-router-dom";
import { MaxComponent } from "./maxes/MaxComponent";
import { NavBar } from "./navBar/NavBar";
import { ProjectDescription } from "./ProjectDescription";
import { maxRoute, workoutsRoute } from "./routes";
import { Snackbar } from "./snackBar/Snackbar";
import { WorkoutComponent } from "./workouts/WorkoutComponent";

export const Root: FunctionComponent = () => (
    <Box>
        <Snackbar/>
        <NavBar/>
        <Route exact path="/" component={ProjectDescription} />
        <Route exact path={workoutsRoute} component={WorkoutComponent}/>
        <Route exact path={maxRoute} component={MaxComponent}/>
    </Box>
);
