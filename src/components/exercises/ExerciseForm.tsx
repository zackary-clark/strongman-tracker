import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { MuscleGroup } from "../../../generated/schema";
import { MuscleGroupMultiSelect } from "../common/MuscleGroupMultiSelect";

interface ExerciseFormProps {
    headingLabel?: string,
    nameIsRequired: boolean,
    nameStateTuple: [string, React.Dispatch<React.SetStateAction<string>>],
    nameOnBlur?: () => void,
    descriptionStateTuple: [string, React.Dispatch<React.SetStateAction<string>>],
    descriptionOnBlur?: () => void,
    focusGroupsStateTuple: [MuscleGroup[], React.Dispatch<React.SetStateAction<MuscleGroup[]>>],
    focusGroupsOnClose?: () => void,
}

export const ExerciseForm: FunctionComponent<ExerciseFormProps> = ({
    headingLabel,
    nameIsRequired,
    nameStateTuple,
    nameOnBlur = () => {},
    descriptionStateTuple,
    descriptionOnBlur = () => {},
    focusGroupsStateTuple,
    focusGroupsOnClose = () => {},
}) => {
    const [name, setName] = nameStateTuple;
    const [description, setDescription] = descriptionStateTuple;

    return (
        <Paper elevation={4} sx={{ width: "100%", maxWidth: 400 }}>
            {headingLabel ?
                <Typography variant="h6" align="center" sx={{ m: 1 }}>{headingLabel}</Typography> :
                <Box sx={{ paddingTop: 1 }} />
            }
            <Stack spacing={2} sx={{ marginX: 2, marginBottom: 2, marginTop: 1 }}>
                <TextField
                    label="Name"
                    value={name}
                    required={nameIsRequired}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={nameOnBlur}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    onBlur={descriptionOnBlur}
                />
                <MuscleGroupMultiSelect
                    focusGroupsStateTuple={focusGroupsStateTuple}
                    focusGroupsOnClose={focusGroupsOnClose}
                />
            </Stack>
        </Paper>
    );
};
