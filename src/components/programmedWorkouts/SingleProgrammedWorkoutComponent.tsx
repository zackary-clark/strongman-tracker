import { useApolloClient } from "@apollo/client";
import { Box, Dialog, Stack } from "@mui/material";
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
import { EditProgrammedExerciseDialogContents } from "../programmedExercises/EditProgrammedExerciseDialogContents";
import { NewProgrammedExerciseDialogContents } from "../programmedExercises/NewProgrammedExerciseDialogContents";
import { ProgrammedWorkoutForm } from "./ProgrammedWorkoutForm";
import { ProgrammedWorkoutInfo } from "./ProgrammedWorkoutInfo";

export const SingleProgrammedWorkoutComponent: FunctionComponent = () => {
    const params = useParams();
    const id = params[PROGRAMMED_WORKOUT_ID_PARAM];

    if (id === undefined) return <ErrorScreen />;

    const [editing, setEditing] = useState(false);
    const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState<string | null>(null);
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

    const closeNewDialog = () => {
        setIsNewDialogOpen(false);
    };

    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
        setIdToEdit(null);
    };

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
                        onClick: () => {
                            setIdToEdit(progEx.id);
                            setIsEditDialogOpen(true);
                        }
                    }))}
                    showArrowButtons
                    showNew
                    newLabel="Add Exercise"
                    newOnClick={() => setIsNewDialogOpen(true)}
                />
            </Stack>
            <Dialog open={isEditDialogOpen && !!idToEdit} onClose={closeEditDialog} fullWidth maxWidth="sm">
                {idToEdit && <EditProgrammedExerciseDialogContents programmedExerciseId={idToEdit} onClose={closeEditDialog} />}
            </Dialog>
            <Dialog open={isNewDialogOpen} onClose={closeNewDialog} fullWidth maxWidth="sm">
                <NewProgrammedExerciseDialogContents
                    programmedWorkoutId={programmedWorkout.id}
                    onClose={closeNewDialog}
                />
            </Dialog>
        </Box>
    );
};
