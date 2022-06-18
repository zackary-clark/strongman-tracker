import { Add } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Box, Fab, Stack, TextField } from "@mui/material";
import { compareDesc, parseISO } from "date-fns";
import format from "date-fns/format";
import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AllWorkoutsDocument,
    AllWorkoutsQuery,
    useAddWorkoutMutation,
    useAllWorkoutsQuery
} from "../../../generated/schema";
import { DATE_FORMAT } from "../../constants";
import { useOpenSnackbar } from "../../context/snackbarContext";
import { LoadingScreen } from "../common/LoadingScreen";
import { WorkoutTable } from "./WorkoutTable";

export const WorkoutList: FunctionComponent = () => {
    const [date, setDate] = useState<Date | null>(new Date());

    const navigate = useNavigate();
    const openSnackbar = useOpenSnackbar();
    const { loading, error: queryError, data } = useAllWorkoutsQuery();

    const [addWorkout, { error: mutationError }] = useAddWorkoutMutation({
        update(cache, {data}) {
            const newWorkout = data?.addWorkout?.workout;
            if (newWorkout) {
                const existingWorkoutsQuery: AllWorkoutsQuery | null = cache.readQuery({query: AllWorkoutsDocument});
                cache.writeQuery({
                    query: AllWorkoutsDocument,
                    data: {
                        workouts: existingWorkoutsQuery ? [...existingWorkoutsQuery.workouts, {...newWorkout, lifts: []}] : [newWorkout]
                    }
                });
            }
        }
    });

    const onPlusClick = async () => {
        if (date) {
            try {
                const payload = await addWorkout({
                    variables: {
                        input: {
                            date: format(date, DATE_FORMAT)
                        }
                    }
                });
                const workoutId = payload.data?.addWorkout?.workout?.id;
                if (workoutId) navigate(workoutId.toString());
            } catch (e) {
                // suppressing graphql errors
            }
        }
    };

    useEffect(() => {
        if (queryError) {
            console.error("Workout Query Failed");
            openSnackbar("Network Error!");
        }
    }, [queryError]);

    useEffect(() => {
        if (mutationError) {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("Save Failed!");
        }
    }, [mutationError]);

    if (loading) return <LoadingScreen />;

    const workouts = data?.workouts ?? [];
    const workoutsSortedByDate = [...workouts].sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));

    return (
        <Box mt={1}>
            <Stack>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label="Date"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField
                                data-testid="date-text-field"
                                sx={{margin: 1, width: "20ch"}} {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Fab
                        aria-label="add-workout"
                        data-testid="add-workout"
                        color="secondary"
                        onClick={onPlusClick}
                    >
                        <Add fontSize="large" />
                    </Fab>
                </Box>
            </Stack>
            {workoutsSortedByDate.map(workout => <WorkoutTable key={`${workout.__typename}__${workout.id}`} workout={workout} /> )}
        </Box>
    );
};
