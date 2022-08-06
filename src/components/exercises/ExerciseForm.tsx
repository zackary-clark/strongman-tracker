import {
    Box,
    capitalize,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { MuscleGroup } from "../../../generated/schema";

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
    const [focusGroups, setFocusGroups] = focusGroupsStateTuple;

    const handleFocusGroupChange = (event: SelectChangeEvent<MuscleGroup[]>) => {
        const value = event.target.value;
        setFocusGroups((typeof value === "string" ? value.split(",") : value) as MuscleGroup[]);
    };

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
                <FormControl>
                    <InputLabel id="focus-group-label">Muscle Groups</InputLabel>
                    <Select
                        labelId="focus-group-label"
                        data-testid="focus-group-select"
                        multiple
                        value={focusGroups}
                        onChange={handleFocusGroupChange}
                        onClose={focusGroupsOnClose}
                        input={<OutlinedInput label="Muscle Groups" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={capitalize(value)} size="small" />
                                ))}
                            </Box>
                        )}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 48 * 4.5 + 8,
                                }
                            }
                        }}
                    >
                        {Object.values(MuscleGroup).map((group) => (
                            <MenuItem
                                key={group}
                                value={group}
                            >
                                {capitalize(group)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </Paper>
    );
};
