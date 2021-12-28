import { Add } from "@mui/icons-material";
import {
    Box,
    Dialog,
    DialogTitle,
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../context";
import { IMax } from "../../data/max";
import { getMaxes, postMax } from "../../webClient";

export function MaxComponent(): React.ReactElement {
    const {openSnackbar} = useContext(SnackbarContext);
    const [maxes, setMaxes] = useState<IMax[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        getMaxes()
            .then((res) => res.data)
            .then((resData) => {
                setMaxes(resData);
            })
            .catch(e => {
                console.error("Get Failed");
                openSnackbar("Network Error!");
            });
    }, []);

    const addEntry = (newData: IMax): Promise<void | IMax> => {
        return postMax(newData)
            .then(res => {
                const newMaxes: IMax[] = maxes.splice(0);
                newMaxes.push(res.data);
                setMaxes(newMaxes);
            })
            .catch(e => {
                console.error("Save Failed");
                openSnackbar("Save Failed!");
            })
            .finally(() => {
                setIsAddDialogOpen(false);
            });
    };

    return (
        <Box className={"max-container"}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "gruv.BG1", fontWeight: "bold",}}>
                            <TableCell>Date</TableCell>
                            <TableCell>Squat</TableCell>
                            <TableCell>Bench</TableCell>
                            <TableCell>Deadlift</TableCell>
                            <TableCell>OHP</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maxes.map(max => (
                            <MaxRow max={max} key={max._id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isAddDialogOpen && <AddDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />}
            <Fab
                aria-label="add-max"
                data-testid="add-max"
                color="secondary"
                sx={{margin: 1}}
                onClick={() => setIsAddDialogOpen(true)}
            >
                <Add fontSize="large" />
            </Fab>
        </Box>
    );
}

interface MaxRowProps {
    max: IMax;
}

const MaxRow = ({max}: MaxRowProps) => (
    <TableRow sx={{"&:nth-of-type(odd)": {backgroundColor: "action.hover"}}}>
        <TableCell>{max.date}</TableCell>
        <TableCell>{max.squat1RM}</TableCell>
        <TableCell>{max.bench1RM}</TableCell>
        <TableCell>{max.deadlift1RM}</TableCell>
        <TableCell>{max.press1RM}</TableCell>
        <TableCell />
    </TableRow>
);

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddDialog = ({open, onClose}: AddDialogProps) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New One Rep Max</DialogTitle>
    </Dialog>
);
