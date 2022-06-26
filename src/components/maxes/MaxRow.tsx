import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { isMatch, parseISO } from "date-fns";
import format from "date-fns/format";
import * as React from "react";
import { FunctionComponent } from "react";
import { Max } from "../../../generated/schema";
import { DATE_FORMAT } from "../../constants";
import { useDeleteMaxMutation } from "../../operations/maxOperations";

interface Props {
    max: Max;
}

export const MaxRow: FunctionComponent<Props> = ({max}) => {
    const [deleteMax] = useDeleteMaxMutation();

    const handleDeleteClick = async () => await deleteMax({ variables: { input: { id: max.id } } });

    return (
        <TableRow sx={{"&:nth-of-type(odd)": {backgroundColor: "action.hover"}}}>
            <TableCell>{formatDateCell(max.date)}</TableCell>
            <TableCell data-testid="squat1RM">{max.squat1RM}</TableCell>
            <TableCell data-testid="bench1RM">{max.bench1RM}</TableCell>
            <TableCell data-testid="deadlift1RM">{max.deadlift1RM}</TableCell>
            <TableCell data-testid="press1RM">{max.press1RM}</TableCell>
            <TableCell size="small" align="right">
                <IconButton aria-label="Delete" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

const formatDateCell = (date: string) => {
    if (!isMatch(date, DATE_FORMAT)) throw new Error(`Date ${date} is in an unexpected format!`);
    return format(parseISO(date), "MM/dd/yyyy");
};
