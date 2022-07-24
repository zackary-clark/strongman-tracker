import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import format from "date-fns/format";
import { FunctionComponent } from "react";
import * as React from "react";
import { AddMaxInput } from "../../../generated/schema";
import { DATE_FORMAT } from "../../constants";

interface Props {
    open: boolean;
    onClose: () => void;
    addMax: (input: AddMaxInput) => void;
}

export const AddDialog: FunctionComponent<Props> = ({open, onClose, addMax}) => {

    const [date, setDate] = React.useState<Date | null>(null);
    const [squat, setSquat] = React.useState<string>("");
    const [bench, setBench] = React.useState<string>("");
    const [deadlift, setDeadlift] = React.useState<string>("");
    const [press, setPress] = React.useState<string>("");

    const handleSaveClick = () => {
        if (date) {
            addMax({
                date: format(date, DATE_FORMAT),
                squat1RM: parseInt(squat),
                bench1RM: parseInt(bench),
                deadlift1RM: parseInt(deadlift),
                press1RM: parseInt(press)
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
                        label="Squat"
                        value={squat}
                        onChange={(event) => setSquat(event.target.value)}
                        type="number"
                        sx={{margin: 1, width: "20ch"}}
                    />
                    <TextField
                        label="Bench"
                        value={bench}
                        onChange={(event) => setBench(event.target.value)}
                        type="number"
                        sx={{margin: 1, width: "20ch"}}
                    />
                    <TextField
                        label="Deadlift"
                        value={deadlift}
                        onChange={(event) => setDeadlift(event.target.value)}
                        type="number"
                        sx={{margin: 1, width: "20ch"}}
                    />
                    <TextField
                        label="Press"
                        value={press}
                        onChange={(event) => setPress(event.target.value)}
                        type="number"
                        sx={{margin: 1, width: "20ch"}}
                    />

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" sx={{margin: 0.5}}>Cancel</Button>
                <Button onClick={handleSaveClick} color="secondary" variant="contained" sx={{margin: 0.5}}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
