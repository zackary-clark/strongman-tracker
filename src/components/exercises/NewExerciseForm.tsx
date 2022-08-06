import { Check } from "@mui/icons-material";
import {
    Box,
    capitalize,
    Chip,
    Fab,
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
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MuscleGroup } from "../../../generated/schema";
import { useAddMyExerciseMutation } from "../../operations/exerciseOperations";
import { MY_EXERCISE_ROUTE } from "../../pages/constants";

export const NewExerciseForm: FunctionComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [focusGroups, setFocusGroups] = useState<MuscleGroup[]>([]);

    const saveEnabled = name?.length > 0;

    const [addMyExercise] = useAddMyExerciseMutation({
        onCompleted() {
            navigate(MY_EXERCISE_ROUTE);
        }
    });

    const handleAddClick = async () => {
        if (saveEnabled) {
            await addMyExercise({
                variables: {
                    input: {
                        name,
                        description: description === "" ? undefined : description,
                        focusGroups
                    }
                }
            });
        }
    };

    const handleFocusGroupChange = (event: SelectChangeEvent<MuscleGroup[]>) => {
        const value = event.target.value;
        setFocusGroups((typeof value === "string" ? value.split(",") : value) as MuscleGroup[]);
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
                <Paper elevation={4} sx={{ width: "100%", maxWidth: 400 }}>
                    <Typography variant="h6" align="center" sx={{ m: 1 }}>New Exercise</Typography>
                    <Stack spacing={2} sx={{ marginX: 2, marginBottom: 2, marginTop: 1 }}>
                        <TextField
                            label="Name"
                            value={name}
                            required
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <FormControl>
                            <InputLabel id="focus-group-label">Muscle Groups</InputLabel>
                            <Select
                                labelId="focus-group-label"
                                data-testid="focus-group-select"
                                multiple
                                value={focusGroups}
                                onChange={handleFocusGroupChange}
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
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Fab
                    aria-label="add-exercise"
                    color="success"
                    onClick={handleAddClick}
                    disabled={!saveEnabled}
                >
                    <Check />
                </Fab>
            </Box>
        </>
    );
};
