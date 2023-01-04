import { Button, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Protocol } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import {
    useChangeProgrammedExerciseProtocolMutation,
    useDeleteProgrammedExerciseMutation,
    useProgrammedExerciseQuery
} from "../../operations/programmedExerciseOperations";
import { DialogCloseButton } from "../common/DialogCloseButton";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { ProtocolComponent } from "./ProtocolComponent";

interface Props {
    programmedExerciseId: string;
    onClose: () => void;
}

export const EditProgrammedExerciseDialogContents: FunctionComponent<Props> = ({
    programmedExerciseId,
    onClose,
}) => {
    const openSnackbar = useSnackbar();

    const [protocol, setProtocol] = useState<Protocol | null>(null);

    const { data, loading, error } = useProgrammedExerciseQuery(programmedExerciseId);
    const programmedExercise = data?.programmedExercise;

    useEffect(() => {
        setProtocol(programmedExercise?.protocol ?? null);
    }, [programmedExercise?.protocol]);

    const [deleteProgrammedExercise] = useDeleteProgrammedExerciseMutation(programmedExercise?.programmedWorkout, {
        onCompleted(data) {
            if (data.deleteProgrammedExercise?.success) {
                openSnackbar("success", "Exercise Deleted!");
                onClose();
            }
        },
    });

    const [changeProtocol] = useChangeProgrammedExerciseProtocolMutation();

    const handleDelete = useCallback(() => {
        return programmedExerciseId ?
            deleteProgrammedExercise({ variables: { id: programmedExerciseId } }) :
            {};
    }, [programmedExerciseId]);

    const handleSave = async () => {
        await changeProtocol({ variables: {
            id: programmedExerciseId,
            protocol: (protocol?.sets && protocol.sets.length > 0) ? {
                sets: protocol?.sets.map(set => ({ ...set, __typename: undefined })),
            } : null,
        }});
        handleClose();
    };

    const handleClose = () => {
        setProtocol(null);
        onClose();
    };

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen />;

    return (
        <>
            <DialogTitle>
                <Typography noWrap variant="inherit">
                    {programmedExercise?.exercise.name}
                </Typography>
                <DialogCloseButton onClick={handleClose} />
            </DialogTitle>
            <DialogContent dividers sx={{px:1}}>
                <ProtocolComponent protocol={protocol} setProtocol={setProtocol} exerciseId={programmedExercise?.exercise.id} />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", m: 0.5 }}>
                <Button onClick={handleDelete} color="error" variant="outlined">Delete</Button>
                <Stack spacing={1.5} direction="row">
                    <Button onClick={handleSave} color="secondary" variant="contained">Save</Button>
                </Stack>
            </DialogActions>
        </>
    );
};
