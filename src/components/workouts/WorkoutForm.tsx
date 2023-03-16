import { Delete } from "@mui/icons-material";
import { Box, CircularProgress, Container, IconButton, Tooltip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import * as React from "react";
import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../context/snackbarContext";
import {
    useAddLiftMutation,
    useDeleteLiftMutation,
    useDeleteWorkoutMutation,
    useOneWorkoutQuery
} from "../../operations/workoutOperations";
import { WORKOUT_ID_PARAM, WORKOUT_ROUTE } from "../../pages/constants";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { LiftForm, LiftView } from "./LiftForm";

export const WorkoutForm: FunctionComponent = () => {
    const openSnackbar = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();
    const workoutId = params[WORKOUT_ID_PARAM];

    if (workoutId === undefined) return <ErrorScreen />;

    const { loading, data } = useOneWorkoutQuery({ variables: { input: { id: workoutId } } });

    const workout = data?.workout;

    const [addLift, { loading: addLiftLoading }] = useAddLiftMutation(workout);
    const [deleteLift] = useDeleteLiftMutation(workout);
    const [deleteWorkout] = useDeleteWorkoutMutation();

    const onDateChange = (): void => openSnackbar("warning", "Sorry! Can't change dates (yet)!");

    if (loading) return <LoadingScreen />;

    if (!workout) return <ErrorScreen />;

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

    const onLiftDelete = async (id: string) => {
        await deleteLift({
            variables: {
                input: {
                    id
                }
            }
        });
    };

    const onWorkoutDelete = async () => {
        const result = await deleteWorkout({
            variables: {
                input: {
                    id: workoutId
                }
            }
        });
        if (result.data?.deleteWorkout?.success) {
            navigate(WORKOUT_ROUTE);
        }
    };

    return (
        <Container maxWidth="md" sx={{mt: 1}}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <DatePicker
                    label="Date"
                    onChange={onDateChange}
                    value={parseISO(workout.date)}
                    sx={{m: 1}}
                />
            </Box>
            {workout.lifts.map(lift => <LiftView key={lift.id} lift={lift} onDelete={onLiftDelete} />)}
            {addLiftLoading
                ? <Box sx={{display: "flex", justifyContent: "center", margin: 2}}><CircularProgress /></Box>
                : <LiftForm onSave={onLiftSave} />}
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Tooltip title={"Delete Entire Workout"}>
                    <IconButton
                        aria-label="delete-workout"
                        data-testid="delete-workout"
                        color="error"
                        onClick={onWorkoutDelete}
                        size="small"
                    >
                        <Delete />
                    </IconButton>
                </Tooltip>
            </Box>
        </Container>
    );
};
