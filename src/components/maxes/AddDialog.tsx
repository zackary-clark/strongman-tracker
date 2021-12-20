import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import * as React from "react";
import { IMax } from "../../data/max";

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
    addMax: (newMax: IMax) => void;
}

export const AddDialog = ({open, onClose, addMax}: AddDialogProps) => {

    const [date, setDate] = React.useState<Date | null>(null);
    const [squat, setSquat] = React.useState<string>("");
    const [bench, setBench] = React.useState<string>("");
    const [deadlift, setDeadlift] = React.useState<string>("");
    const [press, setPress] = React.useState<string>("");

    const handleSaveClick = () => {
        if (date) {
            addMax({
                date: date.toDateString(),
                squat1RM: squat,
                bench1RM: bench,
                deadlift1RM: deadlift,
                press1RM: press
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Max</DialogTitle>
            <DialogContent>
                <Stack>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label="Date"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField
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