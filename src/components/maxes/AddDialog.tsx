import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/format";
import * as React from "react";
import { FunctionComponent } from "react";
import { AddMaxInput, MaxType } from "../../../generated/schema";
import { DATE_FORMAT } from "../../constants";
import { useConvertWeight } from "../../hooks/useConvertWeight";

interface Props {
    open: boolean;
    onClose: () => void;
    addMax: (input: AddMaxInput) => void;
}

export const AddDialog: FunctionComponent<Props> = ({open, onClose, addMax}) => {

    const { unit, convertUserUnitStringToGrams } = useConvertWeight();

    const [date, setDate] = React.useState<Date | null>(new Date());
    const [weight, setWeight] = React.useState<string>("");
    const [type, setType] = React.useState<MaxType | undefined>(undefined);

    const handleSaveClick = () => {
        if (date && type) {
            addMax({
                date: format(date, DATE_FORMAT),
                weight: convertUserUnitStringToGrams(weight),
                type
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Max</DialogTitle>
            <DialogContent>
                <Stack>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date"
                            value={date}
                            onChange={(newValue: Date | null) => {
                                setDate(newValue);
                            }}
                            renderInput={(params: any) => <TextField
                                data-testid="date-text-field"
                                sx={{margin: 1, width: "20ch"}} {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        label={`Weight (${unit}s)`}
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                        type="number"
                        sx={{margin: 1, width: "20ch"}}
                    />
                    <FormControl sx={{ m: 1, width: "20ch" }}>
                        <InputLabel id="max-lift-type-label">Lift</InputLabel>
                        <Select
                            data-testid="max-lift-type"
                            labelId="max-lift-type-label"
                            id="max-lift-type"
                            value={type}
                            label="Lift"
                            onChange={(event) => setType(event.target.value as MaxType)}
                        >
                            {Object.values(MaxType).map((type: MaxType) => (
                                <MenuItem key={`${type}-option`} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="outlined" sx={{margin: 0.5}}>Cancel</Button>
                <Button onClick={handleSaveClick} color="secondary" variant="contained" sx={{margin: 0.5}}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
