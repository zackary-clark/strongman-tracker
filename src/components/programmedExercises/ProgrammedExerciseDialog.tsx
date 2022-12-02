import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { ProgrammedWorkoutDocument } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import { useExercisesQuery } from "../../operations/exerciseOperations";
import { useAddProgrammedExerciseMutation } from "../../operations/programmedExerciseOperations";
import { ErrorScreen } from "../common/ErrorScreen";

interface Props {
    programmedWorkoutId: string;
    open: boolean;
    onClose: () => void;
}

export const ProgrammedExerciseDialog: FunctionComponent<Props> = ({
    programmedWorkoutId,
    open,
    onClose,
}) => {
    const openSnackbar = useSnackbar();

    if (!programmedWorkoutId) return <ErrorScreen />;

    const [exerciseOption, setExerciseOption] = useState<{ label: string, value: string } | null>(null);

    const { loading: areExercisesLoading, data: exercisesData } = useExercisesQuery();
    const exercises = exercisesData?.exercises ?? [];

    const isSaveEnabled = !!exerciseOption;

    const [addProgrammedExercise] = useAddProgrammedExerciseMutation({
        onCompleted(data) {
            if (data.addProgrammedExercise?.success) {
                openSnackbar("success", "Exercise Added!");
            }
            handleClose();
        },
        refetchQueries: [{ query: ProgrammedWorkoutDocument, variables: { input: { id: programmedWorkoutId } } }],
    });

    const handleAddClick = async () => {
        if (exerciseOption?.value) {
            await addProgrammedExercise({
                variables: {
                    input: {
                        programmedWorkout: programmedWorkoutId,
                        exercise: exerciseOption.value
                    }
                }
            });
        }
    };

    const handleClose = () => {
        setExerciseOption(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>New Exercise</DialogTitle>
            <DialogContent>
                <Stack>
                    <Autocomplete
                        loading={areExercisesLoading}
                        options={exercises.map(ex => ({
                            label: ex.name,
                            value: ex.id,
                        }))}
                        onChange={(event, value) => setExerciseOption(value)}
                        value={exerciseOption}
                        renderInput={(params) => <TextField {...params} label="Exercise" />}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" variant="outlined" sx={{m: 0.5}}>Cancel</Button>
                <Button
                    onClick={handleAddClick}
                    color="secondary"
                    variant="contained"
                    sx={{m: 0.5}}
                    disabled={!isSaveEnabled}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
