import { Box } from "@mui/material";
import { compareDesc, parseISO } from "date-fns";
import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { useAllWorkoutsQuery } from "../../../generated/schema";
import { useOpenSnackbar } from "../../context/snackbarContext";
import { LoadingScreen } from "../LoadingScreen";
import { WorkoutTable } from "./WorkoutTable";

export const WorkoutComponent: FunctionComponent = () => {
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
            {workoutsSortedByDate.map(workout => <WorkoutTable key={`${workout.__typename}__${workout.id}`} workout={workout} /> )}
        </Box>
    );
};
