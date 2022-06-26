import { Add } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Box, Fab, Stack, TextField } from "@mui/material";
import { compareDesc, parseISO } from "date-fns";
import format from "date-fns/format";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DATE_FORMAT } from "../../constants";
import { useAddWorkoutMutation, useAllWorkoutsQuery } from "../../operations/workoutOperations";
import { LoadingScreen } from "../common/LoadingScreen";
import { WorkoutTable } from "./WorkoutTable";

export const WorkoutList: FunctionComponent = () => {
    const [date, setDate] = useState<Date | null>(new Date());

    const navigate = useNavigate();
    const { loading, data } = useAllWorkoutsQuery();

    const [addWorkout] = useAddWorkoutMutation();

    const onPlusClick = async () => {
        if (date) {
            const payload = await addWorkout({
                variables: {
                    input: {
                        date: format(date, DATE_FORMAT)
                    }
                }
            });
            const workoutId = payload.data?.addWorkout?.workout?.id;
            if (workoutId) navigate(workoutId.toString());
        }
    };

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
