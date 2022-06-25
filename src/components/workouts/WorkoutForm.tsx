import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Box, CircularProgress, Container, TextField } from "@mui/material";
import { parseISO } from "date-fns";
import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAddLiftMutation, useOneWorkoutQuery } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import { WORKOUT_ID_PARAM } from "../../pages/constants";
import { LoadingScreen } from "../common/LoadingScreen";
import { LiftForm, LiftView } from "./LiftForm";

export const WorkoutForm: FunctionComponent = () => {
    const openSnackbar = useSnackbar();
    const params = useParams();
    const workoutIdParam = params[WORKOUT_ID_PARAM];
    const workoutId = workoutIdParam ? parseInt(workoutIdParam) : undefined;

    if (workoutId === undefined) return <ErrorPage />;

    const { loading, error: oneWorkoutError, data } = useOneWorkoutQuery({variables: {input: {id: workoutId}}});
    const [addLift, { loading: addLiftLoading, error: addLiftError }] = useAddLiftMutation({
        update(cache, {data: mutationData}) {
            const newLift = mutationData?.addLift?.lift;
            const newWorkoutId = mutationData?.addLift?.workout;
            const workout = data?.workout;
            if (newWorkoutId && newLift && workout) {
                cache.modify({
                    id: cache.identify(workout),
                    fields: {
                        lifts(cachedLifts) {
                            return [...cachedLifts, newLift];
                        }
                    }
                });
            }
        }
    });

    useEffect(() => {
        if (oneWorkoutError) {
            console.error("One Workout Query Failed");
            openSnackbar("error", "Network Error!");
        }
    }, [oneWorkoutError]);

    useEffect(() => {
        if (addLiftError) {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Save Failed!");
        }
    }, [addLiftError]);

    const onDateChange = (): void => {
        openSnackbar("warning", "Sorry! Can't change dates (yet)!");
    };

    if (loading) return <LoadingScreen />;

    const workout = data?.workout;

    if (!workout) return <ErrorPage />;

    const onLiftSave = async (name: string, weight: number, sets: number, reps: number) => {
        try {
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
        } catch (e) {
            // suppressed graphql errors
        }
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
            {workout.lifts.map(lift => <LiftView key={lift.id} lift={lift} />)}
            {addLiftLoading
                ? <Box sx={{display: "flex", justifyContent: "center", margin: 2}}><CircularProgress /></Box>
                : <LiftForm onSave={onLiftSave} />}
        </Container>
    );
};

const ErrorPage: FunctionComponent = () => (
    <Box>Error Loading Workout</Box>
);
