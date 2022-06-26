import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Box, CircularProgress, Container, TextField } from "@mui/material";
import { parseISO } from "date-fns";
import * as React from "react";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../context/snackbarContext";
import { useAddLiftMutation, useDeleteLiftMutation, useOneWorkoutQuery } from "../../operations/workoutOperations";
import { WORKOUT_ID_PARAM } from "../../pages/constants";
import { LoadingScreen } from "../common/LoadingScreen";
import { LiftForm, LiftView } from "./LiftForm";

export const WorkoutForm: FunctionComponent = () => {
    const openSnackbar = useSnackbar();
    const params = useParams();
    const workoutIdParam = params[WORKOUT_ID_PARAM];
    const workoutId = workoutIdParam ? parseInt(workoutIdParam) : undefined;

    if (workoutId === undefined) return <ErrorPage />;

    const { loading, data } = useOneWorkoutQuery({ variables: { input: { id: workoutId } } });

    const workout = data?.workout;

    const [addLift, { loading: addLiftLoading }] = useAddLiftMutation(workout);
    const [deleteLift] = useDeleteLiftMutation(workout);

    const onDateChange = (): void => openSnackbar("warning", "Sorry! Can't change dates (yet)!");

    if (loading) return <LoadingScreen />;

    if (!workout) return <ErrorPage />;

    const onLiftSave = async (name: string, weight: number, sets: number, reps: number) => {
        await addLift({
            variables: {
                input: {
                    workout: workoutId,
                    name,
                    weight,
                    sets,
                    reps
                }
            }
        });
    };

    const onLiftDelete = async (id: number) => {
        await deleteLift({
            variables: {
                input: {
                    id
                }
            }
        });
    };

    return (
        <Container maxWidth="md" sx={{mt: 1}}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                        label="Date"
                        onChange={onDateChange}
                        value={parseISO(workout.date)}
                        renderInput={(params) => <TextField
                            data-testid="date-text-field"
                            sx={{margin: 1, width: "20ch"}} {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            {workout.lifts.map(lift => <LiftView key={lift.id} lift={lift} onDelete={onLiftDelete} />)}
            {addLiftLoading
                ? <Box sx={{display: "flex", justifyContent: "center", margin: 2}}><CircularProgress /></Box>
                : <LiftForm onSave={onLiftSave} />}
        </Container>
    );
};

const ErrorPage: FunctionComponent = () => (
    <Box>Error Loading Workout</Box>
);
