import { TableCell, TableRow } from "@mui/material";
import { isMatch, parseISO } from "date-fns";
import format from "date-fns/format";
import { FunctionComponent } from "react";
import * as React from "react";
import { Max } from "../../../generated/schema";

interface Props {
    max: Max;
}

export const MaxRow: FunctionComponent<Props> = ({max}) => (
    <TableRow sx={{"&:nth-of-type(odd)": {backgroundColor: "action.hover"}}}>
        <TableCell>{formatDateCell(max.date)}</TableCell>
        <TableCell data-testid="squat1RM">{max.squat1RM}</TableCell>
        <TableCell data-testid="bench1RM">{max.bench1RM}</TableCell>
        <TableCell data-testid="deadlift1RM">{max.deadlift1RM}</TableCell>
        <TableCell data-testid="press1RM">{max.press1RM}</TableCell>
        <TableCell />
    </TableRow>
);

const formatDateCell = (date: any) => {
    if (typeof date !== "string" || !isMatch(date, "yyyy-MM-dd")) throw new Error(`Date ${date} is in an unexpected format!`);
    return format(parseISO(date), "MM/dd/yyyy");
};
