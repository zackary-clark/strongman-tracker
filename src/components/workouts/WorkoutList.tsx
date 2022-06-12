import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { compareDesc, parseISO } from "date-fns";
import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAllWorkoutsQuery } from "../../../generated/schema";
import { useOpenSnackbar } from "../../context/snackbarContext";
import { ADD_WORKOUT_ROUTE } from "../../pages/constants";
import { LoadingScreen } from "../common/LoadingScreen";
import { WorkoutTable } from "./WorkoutTable";

export const WorkoutList: FunctionComponent = () => {
    const openSnackbar = useOpenSnackbar();
    const { loading, error: queryError, data } = useAllWorkoutsQuery();

    useEffect(() => {
        if (queryError) {
            console.error("Workout Query Failed");
            openSnackbar("Network Error!");
        }
    }, [queryError]);

    if (loading) return <LoadingScreen />;

    const workouts = data?.workouts ?? [];
    const workoutsSortedByDate = [...workouts].sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));

    return (
        <Box>
            <Box sx={{display: "flex", justifyContent: "center", my: 2}}>
                {/*@ts-ignore MUI typing is wrong about 'component' not being a valid prop*/}
                <Fab
                    href="#"
                    component={Link}
                    to={ADD_WORKOUT_ROUTE}
                    aria-label="add-workout"
                    data-testid="add-workout"
                    color="secondary"
                >
                    <Add fontSize="large" />
                </Fab>
            </Box>
            {workoutsSortedByDate.map(workout => <WorkoutTable key={`${workout.__typename}__${workout.id}`} workout={workout} /> )}
        </Box>
    );
};
