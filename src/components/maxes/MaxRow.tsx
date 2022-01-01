import { TableCell, TableRow } from "@mui/material";
import * as React from "react";
import { IMax } from "../../data/max";

interface MaxRowProps {
    max: IMax;
}

export const MaxRow = ({max}: MaxRowProps) => (
    <TableRow sx={{"&:nth-of-type(odd)": {backgroundColor: "action.hover"}}}>
        <TableCell>{max.date}</TableCell>
        <TableCell data-testid="squat1RM">{max.squat1RM}</TableCell>
        <TableCell data-testid="bench1RM">{max.bench1RM}</TableCell>
        <TableCell data-testid="deadlift1RM">{max.deadlift1RM}</TableCell>
        <TableCell data-testid="press1RM">{max.press1RM}</TableCell>
        <TableCell />
    </TableRow>
);
