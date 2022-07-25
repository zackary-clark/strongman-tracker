import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { isMatch, parseISO } from "date-fns";
import format from "date-fns/format";
import * as React from "react";
import { FunctionComponent } from "react";
import { Max } from "../../../generated/schema";
import { DATE_FORMAT } from "../../constants";
import { useConvertWeight } from "../../hooks/useConvertWeight";
import { useDeleteMaxMutation } from "../../operations/maxOperations";

interface Props {
    max: Max;
}

export const MaxRow: FunctionComponent<Props> = ({max}) => {
    const [deleteMax] = useDeleteMaxMutation();
    const { convertToUserUnit } = useConvertWeight();

    const handleDeleteClick = async () => await deleteMax({ variables: { input: { id: max.id } } });

    return (
        <TableRow sx={{"&:nth-of-type(odd)": {backgroundColor: "action.hover"}}}>
            <TableCell>{formatDateCell(max.date)}</TableCell>
            <TableCell>{convertToUserUnit(max.weight)}</TableCell>
            <TableCell size="small" align="right">
                <IconButton aria-label="Delete" size="small" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

const formatDateCell = (date: string) => {
    if (!isMatch(date, DATE_FORMAT)) throw new Error(`Date ${date} is in an unexpected format!`);
    return format(parseISO(date), "d MMM y");
};
