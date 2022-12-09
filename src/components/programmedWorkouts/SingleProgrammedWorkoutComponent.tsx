import { useApolloClient } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { ProgrammedWorkoutDocument } from "../../../generated/schema";
import { useChangeOrder } from "../../hooks/useChangeOrder";
import { useChangeProgrammedExerciseOrderMutation } from "../../operations/programmedExerciseOperations";
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
    const [changeExerciseOrder] = useChangeProgrammedExerciseOrderMutation();
    const apolloClient = useApolloClient();

    const handleArrow = useChangeOrder(
        async (id, order) => {
            const { data } = await changeExerciseOrder({ variables: { id, order }});
            return !!data?.changeProgrammedExerciseOrder?.success;
        },
        () => {
            apolloClient.refetchQueries({ include: [ProgrammedWorkoutDocument] });
        }
    );

    const programmedWorkout = data?.programmedWorkout;
    const programmedExercises = programmedWorkout?.programmedExercises ?? [];

    if (loading) return <LoadingScreen />;
    if (!programmedWorkout) return <ErrorScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <Stack sx={{ width: "100%", maxWidth: 400 }} spacing={2}>
                {editing ?
                    <ProgrammedWorkoutForm programmedWorkout={programmedWorkout} onCloseClick={() => setEditing(false)} /> :
                    <ProgrammedWorkoutInfo programmedWorkout={programmedWorkout} onEditClick={() => setEditing(true)} />
                }
                <StandardList
                    options={programmedExercises.map(progEx => ({
                        key: progEx.id,
                        primary: progEx.exercise.name,
                        upArrowClick: () => handleArrow(programmedExercises, progEx.id, "up"),
                        downArrowClick: () => handleArrow(programmedExercises, progEx.id, "down"),
                    }))}
                    showArrowButtons
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
