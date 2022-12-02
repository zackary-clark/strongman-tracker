import { Box, Stack } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { useProgrammedWorkoutQuery } from "../../operations/programmedWorkoutOperations";
import { PROGRAMMED_WORKOUT_ID_PARAM } from "../../pages/constants";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { StandardList } from "../common/StandardList";
import { ProgrammedExerciseDialog } from "../programmedExercises/ProgrammedExerciseDialog";
import { ProgrammedWorkoutForm } from "./ProgrammedWorkoutForm";
import { ProgrammedWorkoutInfo } from "./ProgrammedWorkoutInfo";

export const SingleProgrammedWorkoutComponent: FunctionComponent = () => {
    const params = useParams();
    const id = params[PROGRAMMED_WORKOUT_ID_PARAM];

    if (id === undefined) return <ErrorScreen />;

    const [editing, setEditing] = useState(false);
    const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
    const { data, loading } = useProgrammedWorkoutQuery(id);

    const programmedWorkout = data?.programmedWorkout;
    const programmedExercises = programmedWorkout?.programmedExercises ?? [];

    if (loading) return <LoadingScreen />;
    if (!programmedWorkout) return <ErrorScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <Stack sx={{ width: "100%", maxWidth: 400 }} spacing={2}>
                {editing ?
                    <ProgrammedWorkoutForm programmedWorkout={programmedWorkout} /> :
                    <ProgrammedWorkoutInfo programmedWorkout={programmedWorkout} onEditClick={() => setEditing(true)} />
                }
                <StandardList
                    options={programmedExercises.map(progEx => ({
                        key: progEx.id,
                        primary: progEx.exercise.name,
                    }))}
                    showNew
                    newLabel="Add Exercise"
                    newOnClick={() => setIsExerciseDialogOpen(true)}
                />
            </Stack>
            <ProgrammedExerciseDialog
                programmedWorkoutId={programmedWorkout.id}
                open={isExerciseDialogOpen}
                onClose={() => setIsExerciseDialogOpen(false)}
            />
        </Box>
    );
};
