import {
    Box,
    capitalize,
    Chip,
    FormControl,
    InputLabel, MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { MuscleGroup } from "../../../generated/schema";

interface Props {
    focusGroupsStateTuple: [MuscleGroup[], React.Dispatch<React.SetStateAction<MuscleGroup[]>>],
    focusGroupsOnClose?: () => void,
}

export const MuscleGroupMultiSelect: FunctionComponent<Props> = ({
    focusGroupsStateTuple,
    focusGroupsOnClose
}) => {
    const [focusGroups, setFocusGroups] = focusGroupsStateTuple;

    const handleFocusGroupChange = (event: SelectChangeEvent<MuscleGroup[]>) => {
        const value = event.target.value;
        setFocusGroups((typeof value === "string" ? value.split(",") : value) as MuscleGroup[]);
    };

    return (
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
    );
};