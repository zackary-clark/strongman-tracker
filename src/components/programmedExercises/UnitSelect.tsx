import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { FunctionComponent } from "react";
import { WeightUnit } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import { useConvertWeight } from "../../hooks/useConvertWeight";
import { useChangeUserExerciseWeightUnitMutation } from "../../operations/userExerciseUnitOperations";

interface Props {
    exerciseId?: string;
}

export const UnitSelect: FunctionComponent<Props> = ({exerciseId}) => {
    const { unit } = useConvertWeight(exerciseId);
    const [changeWeightUnit] = useChangeUserExerciseWeightUnitMutation();

    const openSnackbar = useSnackbar();

    const handleMenuClick = (clickedUnit: WeightUnit) => {
        if (exerciseId) {
            changeWeightUnit({
                variables: {
                    input: {
                        exercise: exerciseId,
                        weightUnit: clickedUnit,
                    }
                },
                onCompleted(data) {
                    if (data.changeUserExerciseWeightUnit?.success) {
                        openSnackbar("success", "Unit Changed!");
                    }
                },
            });
        }
    };

    return (
        <FormControl size="small" sx={{width: 64}}>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
                labelId="unit-label"
                value={exerciseId ? unit : ""}
                label="Unit"
                onChange={(event) => handleMenuClick(event.target.value as WeightUnit)}
            >
                {Object.values(WeightUnit).map((unit: WeightUnit) => (
                    <MenuItem key={`${unit}-option`} value={unit}>{unit}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
