import { Edit } from "@mui/icons-material";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Popover,
    Stack,
    Typography
} from "@mui/material";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Protocol } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import { useConvertWeight } from "../../hooks/useConvertWeight";
import {
    useChangeProgrammedExerciseProtocolMutation,
    useChangeProgrammedExerciseTrainingMaxMutation,
    useDeleteProgrammedExerciseMutation,
    useProgrammedExerciseQuery
} from "../../operations/programmedExerciseOperations";
import { DialogCloseButton } from "../common/DialogCloseButton";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { ProtocolComponent } from "./ProtocolComponent";
import { TrainingMaxField } from "./TrainingMaxField";
import { UnitSelect } from "./UnitSelect";

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
    const [trainingMax, setTrainingMax] = useState<string>("");
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { data, loading, error } = useProgrammedExerciseQuery(programmedExerciseId);
    const programmedExercise = data?.programmedExercise;
    const { convertToUserUnit, convertUserUnitStringToGrams } = useConvertWeight(programmedExercise?.exercise.id);

    useEffect(() => {
        setProtocol(programmedExercise?.protocol ?? null);
    }, [programmedExercise?.protocol]);

    useEffect(() => {
        setTrainingMax(convertToUserUnit(programmedExercise?.trainingMax ?? 0).toString() ?? "");
    }, [programmedExercise?.trainingMax, convertToUserUnit]);

    const [deleteProgrammedExercise] = useDeleteProgrammedExerciseMutation(programmedExercise?.programmedWorkout, {
        onCompleted(data) {
            if (data.deleteProgrammedExercise?.success) {
                openSnackbar("success", "Exercise Deleted!");
                onClose();
            }
        },
    });

    const [changeProtocol] = useChangeProgrammedExerciseProtocolMutation();
    const [changeTrainingMax] = useChangeProgrammedExerciseTrainingMaxMutation();

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

    const handleBlurTrainingMax = () => {
        changeTrainingMax({ variables: {
            id: programmedExerciseId,
            trainingMax: convertUserUnitStringToGrams(trainingMax),
        }});
    };

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen />;

    return (
        <>
            <DialogTitle>
                <Stack direction="row">
                    <Typography noWrap variant="inherit">
                        {programmedExercise?.exercise.name}
                    </Typography>
                    <IconButton
                        aria-label="edit-exercise-preferences"
                        onClick={event => setAnchorEl(event.currentTarget.parentElement)}
                        size="small"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </Stack>
                <Popover
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <Stack direction="row" spacing={1} sx={{m: 1}}>
                        <UnitSelect exerciseId={programmedExercise?.exercise.id} />
                        <TrainingMaxField
                            value={trainingMax}
                            onChange={(event) => setTrainingMax(event.target.value)}
                            onBlur={handleBlurTrainingMax}
                        />
                    </Stack>
                </Popover>
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
