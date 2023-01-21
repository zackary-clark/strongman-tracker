import { FormControl, FormControlLabel, FormLabel, ListItem, Radio, RadioGroup } from "@mui/material";
import React, { FunctionComponent } from "react";
import { LengthUnit, WeightUnit } from "../../../generated/schema";
import {
    useChangeLengthUnitPreferenceMutation,
    useChangeWeightUnitPreferenceMutation,
    useUserPreferencesQuery
} from "../../operations/userPreferencesOperations";
import { PreferencesSkeleton } from "./PreferencesSkeleton";

export const PreferencesForm: FunctionComponent = () => {
    const { loading: queryLoading, data, error } = useUserPreferencesQuery();
    const [changeWeightUnit] = useChangeWeightUnitPreferenceMutation();
    const [changeLengthUnit] = useChangeLengthUnitPreferenceMutation();

    if (queryLoading) return <PreferencesSkeleton />;
    if (error || !data?.preferences) return null;

    const preferences = data.preferences;

    const onWeightUnitChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if (!Object.values<string>(WeightUnit).includes(value)) {
            console.error(`${value} is not a valid Weight Unit`);
        } else {
            changeWeightUnit({
                variables: {
                    input: {
                        // @ts-ignore value type is guaranteed by the check above
                        weightUnit: value
                    }
                }
            });
        }
    };

    const onLengthUnitChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if (!Object.values<string>(LengthUnit).includes(value)) {
            console.error(`${value} is not a valid Length Unit`);
        } else {
            changeLengthUnit({
                variables: {
                    input: {
                        // @ts-ignore value type is guaranteed by the check above
                        lengthUnit: value
                    }
                }
            });
        }
    };

    return (
        <>
            <ListItem>
                <FormControl>
                    <FormLabel id="weight-unit-radio-buttons-group-label">Mass</FormLabel>
                    <RadioGroup
                        aria-labelledby="weight-unit-radio-buttons-group-label"
                        name="weight-unit-group"
                        value={preferences.weightUnit}
                        onChange={onWeightUnitChange}
                    >
                        <FormControlLabel value={WeightUnit.Kg} control={<Radio />} label="Kilos" />
                        <FormControlLabel value={WeightUnit.Lb} control={<Radio />} label="Pounds" />
                    </RadioGroup>
                </FormControl>
            </ListItem>
            <ListItem>
                <FormControl>
                    <FormLabel id="length-unit-radio-buttons-group-label">Length</FormLabel>
                    <RadioGroup
                        aria-labelledby="length-unit-radio-buttons-group-label"
                        name="length-unit-group"
                        value={preferences.lengthUnit}
                        onChange={onLengthUnitChange}
                    >
                        <FormControlLabel value={LengthUnit.Cm} control={<Radio />} label="Centimeters" />
                        <FormControlLabel value={LengthUnit.In} control={<Radio />} label="Inches" />
                    </RadioGroup>
                </FormControl>
            </ListItem>
        </>
    );
};
