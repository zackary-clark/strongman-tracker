import { Delete, Save } from "@mui/icons-material";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Lift } from "../../../generated/schema";
import { useConvertWeight } from "../../hooks/useConvertWeight";

interface LiftViewProps {
    lift: Lift;
    onDelete: (id: string) => void;
}

export const LiftView: FunctionComponent<LiftViewProps> = ({lift, onDelete}) => {
    const { unit, convertToUserUnit } = useConvertWeight();
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row">
                <TextField
                    disabled
                    label="Name"
                    value={lift.name}
                    sx={{ margin: 1, width: "20ch" }}
                />
                <TextField
                    disabled
                    label={`Weight (${unit}s)`}
                    value={convertToUserUnit(lift.weight)}
                    type="number"
                    sx={{ margin: 1, width: "10ch" }}
                />
                <TextField
                    disabled
                    label="Sets"
                    value={lift.sets}
                    type="number"
                    sx={{ margin: 1, width: "10ch" }}
                />
                <TextField
                    disabled
                    label="Reps"
                    value={lift.reps}
                    type="number"
                    sx={{ margin: 1, width: "10ch" }}
                />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconButton aria-label={`delete lift ${lift.id}`} onClick={() => onDelete(lift.id)}>
                        <Delete />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );
};

interface LiftFormProps {
    onSave: (name: string, weight: number, sets: number, reps: number) => void;
}

export const LiftForm: FunctionComponent<LiftFormProps> = ({onSave}) => {
    const { unit, convertUserUnitStringToGrams } = useConvertWeight();
    const [name, setName] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [sets, setSets] = useState<string>("");
    const [reps, setReps] = useState<string>("");

    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <Stack direction="row">
                <TextField
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    sx={{margin: 1, width: "20ch"}}
                />
                <TextField
                    label={`Weight (${unit}s)`}
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    type="number"
                    sx={{margin: 1, width: "10ch"}}
                />
                <TextField
                    label="Sets"
                    value={sets}
                    onChange={(event) => setSets(event.target.value)}
                    type="number"
                    sx={{margin: 1, width: "10ch"}}
                />
                <TextField
                    label="Reps"
                    value={reps}
                    onChange={(event) => setReps(event.target.value)}
                    type="number"
                    sx={{margin: 1, width: "10ch"}}
                />
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <IconButton onClick={() => onSave(name, convertUserUnitStringToGrams(weight), parseInt(sets), parseInt(reps))} aria-label="save">
                        <Save />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );
};
