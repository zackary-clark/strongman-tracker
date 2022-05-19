import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format, parseISO } from "date-fns";
import React, { FunctionComponent } from "react";
import { Workout } from "../../../generated/schema";

interface Props {
    workout: Workout
}

export const WorkoutTable: FunctionComponent<Props> = ({workout}) => (
    <Box data-testid="workout-table" margin={4}>
        <Box my={2}>
            {format(parseISO(workout.date), "d MMMM y")}
        </Box>
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{backgroundColor: "gruv.BG1", fontWeight: "bold"}}>
                        <TableCell>Lift</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Scheme</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workout.lifts.map(lift => (
                        <TableRow
                            key={lift.__typename + "__" + lift.id}
                            sx={{"&:nth-of-type(odd)": {backgroundColor: "action.hover"}}}
                        >
                            <TableCell>{lift.name}</TableCell>
                            <TableCell>{lift.weight}</TableCell>
                            <TableCell>{lift.sets}x{lift.reps}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
);
