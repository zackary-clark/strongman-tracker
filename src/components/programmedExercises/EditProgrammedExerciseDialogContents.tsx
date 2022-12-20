import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Theme,
    Typography,
    useMediaQuery
} from "@mui/material";
import React, { FunctionComponent, useCallback } from "react";
import { useSnackbar } from "../../context/snackbarContext";
import {
    useDeleteProgrammedExerciseMutation,
    useProgrammedExerciseQuery
} from "../../operations/programmedExerciseOperations";
import { LoadingScreen } from "../common/LoadingScreen";

interface Props {
    programmedExerciseId: string;
    onClose: () => void;
}

export const EditProgrammedExerciseDialogContents: FunctionComponent<Props> = ({
    programmedExerciseId,
    onClose,
}) => {
    const openSnackbar = useSnackbar();

    const smallOrSmaller = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const { data, loading } = useProgrammedExerciseQuery(programmedExerciseId);
    const programmedExercise = data?.programmedExercise;

    const [deleteProgrammedExercise] = useDeleteProgrammedExerciseMutation(programmedExercise?.programmedWorkout, {
        onCompleted(data) {
            if (data.deleteProgrammedExercise?.success) {
                openSnackbar("success", "Exercise Deleted!");
                onClose();
            }
        },
    });

    const handleDelete = useCallback(() => {
        return programmedExerciseId ?
            deleteProgrammedExercise({ variables: { id: programmedExerciseId } }) :
            {};
    }, [programmedExerciseId]);

    if (loading) return <LoadingScreen />;

    return (
        <>
            <DialogTitle>{programmedExercise?.exercise.name}</DialogTitle>
            <DialogContent>
                <Typography variant="body2">Protocol planning coming!</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", m: 0.5 }}>
                <Button onClick={handleDelete} color="error" variant="outlined">Delete</Button>
                <Stack spacing={1.5} direction="row">
                    {!smallOrSmaller && <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>}
                    <Button color="secondary" variant="contained" disabled>Save</Button>
                </Stack>
            </DialogActions>
        </>
    );
};
