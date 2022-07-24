import { Settings } from "@mui/icons-material";
import {
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Radio,
    RadioGroup
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { WeightUnit } from "../../../generated/schema";
import {
    useChangeWeightUnitPreferenceMutation,
    useUserPreferencesQuery
} from "../../operations/userPreferencesOperations";
import { LoadingScreen } from "../common/LoadingScreen";

export const PreferencesForm: FunctionComponent = () => {
    const { loading: queryLoading, data, error } = useUserPreferencesQuery();
    const [changeWeightUnit] = useChangeWeightUnitPreferenceMutation();

    if (queryLoading || error) return <LoadingScreen />;

    const preferences = data!.preferences;

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

    return (
        <List>
            <ListItem>
                <ListItemIcon><Settings /></ListItemIcon>
                <ListItemText>Preferences</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <FormControl>
                    <FormLabel id="weight-unit-radio-buttons-group-label">Units</FormLabel>
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
        </List>
    );
};
