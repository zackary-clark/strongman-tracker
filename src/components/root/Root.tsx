import { FunctionComponent } from "react";
import * as React from "react";
import { Route } from "react-router-dom";
import { Box } from "@mui/material";
import { NavBar } from "../navBar";
import { Demo } from "../demo";
import { MaxComponent } from "../maxes";
import { demo2Route, maxRoute, workoutsRoute } from "../routes";
import { Snackbar } from "../snackBar";
import { WorkoutsComponent } from "../workouts";

export const Root: FunctionComponent = () => (
    <Box>
        <Snackbar/>
        <NavBar/>
        <Route exact path={workoutsRoute} component={WorkoutsComponent}/>
        <Route exact path={maxRoute} component={MaxComponent}/>
        <Route exact path={demo2Route} component={Demo}/>
    </Box>
);
