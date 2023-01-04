import { Autocomplete, Button, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { Protocol } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import { useExercisesQuery } from "../../operations/exerciseOperations";
import { useAddProgrammedExerciseMutation } from "../../operations/programmedExerciseOperations";
import { DialogCloseButton } from "../common/DialogCloseButton";
import { ErrorScreen } from "../common/ErrorScreen";
import { ProtocolComponent } from "./ProtocolComponent";

interface Props {
    programmedWorkoutId: string;
    onClose: () => void;
}

export const NewProgrammedExerciseDialogContents: FunctionComponent<Props> = ({
    programmedWorkoutId,
    onClose,
}) => {
    const openSnackbar = useSnackbar();

    if (!programmedWorkoutId) return <ErrorScreen />;

    const [exerciseOption, setExerciseOption] = useState<{ label: string, value: string } | null>(null);
    const [protocol, setProtocol] = useState<Protocol | null>(null);

    const { loading: areExercisesLoading, data: exercisesData } = useExercisesQuery();
    const exercises = exercisesData?.exercises ?? [];

    const isSaveEnabled = !!exerciseOption;

    const [addProgrammedExercise] = useAddProgrammedExerciseMutation(programmedWorkoutId, {
        onCompleted(data) {
            if (data.addProgrammedExercise?.success) {
                openSnackbar("success", "Exercise Added!");
            }
            handleClose();
        },
    });

    const handleAddClick = async () => {
        if (exerciseOption?.value) {
            await addProgrammedExercise({
                variables: {
                    input: {
                        programmedWorkout: programmedWorkoutId,
                        exercise: exerciseOption.value,
                        protocol
                    }
                }
            });
        }
    };

    const handleClose = () => {
        setExerciseOption(null);
        setProtocol(null);
        onClose();
    };

    return (
        <>
            <DialogTitle>
                New Exercise
                <DialogCloseButton onClick={handleClose} />
            </DialogTitle>
            <DialogContent dividers sx={{px:1}}>
                <Stack spacing={2}>
                    <Autocomplete
                        loading={areExercisesLoading}
                        options={exercises.map(ex => ({
                            label: ex.name,
                            value: ex.id,
                        }))}
                        onChange={(event, value) => setExerciseOption(value)}
                        value={exerciseOption}
                        renderInput={(params) => <TextField {...params} label="Exercise" />}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                    />
                    <ProtocolComponent protocol={protocol} setProtocol={setProtocol} exerciseId={exerciseOption?.value} />
                </Stack>
            </DialogContent>
            <DialogActions>
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
        </>
    );
};
