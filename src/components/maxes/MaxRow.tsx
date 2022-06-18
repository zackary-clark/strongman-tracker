import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { isMatch, parseISO } from "date-fns";
import format from "date-fns/format";
import { FunctionComponent, MouseEventHandler, useEffect } from "react";
import * as React from "react";
import { AllMaxesDocument, AllMaxesQuery, Max, useDeleteMaxMutation } from "../../../generated/schema";
import { DATE_FORMAT } from "../../constants";
import { useOpenSnackbar } from "../../context/snackbarContext";

interface Props {
    max: Max;
}

export const MaxRow: FunctionComponent<Props> = ({max}) => {
    const openSnackbar = useOpenSnackbar();

    const [deleteMax, { error }] = useDeleteMaxMutation({
        variables: { input: { id: max.id } },
        update(cache, {data}) {
            const success = data?.deleteMax?.success ?? false;
            if (success) {
                const existingMaxesQuery: AllMaxesQuery | null = cache.readQuery({query: AllMaxesDocument});
                if (existingMaxesQuery) {
                    let deletedMax;
                    cache.writeQuery({
                        query: AllMaxesDocument,
                        data: {
                            maxes: existingMaxesQuery.maxes.filter(cachedMax => {
                                const isDeleted = cachedMax.id === max.id;
                                if (isDeleted) deletedMax = cachedMax;
                                return !isDeleted;
                            })
                        }
                    });
                    if (deletedMax) cache.evict({id: cache.identify(deletedMax)});
                }
            }
        }
    });

    useEffect(() => {
        if (error) {
            console.error("Delete Failed! Check graphql response for details");
            openSnackbar("Delete Failed!");
        }
    }, [error]);

    const handleDeleteClick: MouseEventHandler = async () => {
        try {
            await deleteMax();
        } catch (e) {
            // suppress, since graphql errors are really handled with the error effect above
        }
    };

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

const formatDateCell = (date: any) => {
    if (typeof date !== "string" || !isMatch(date, DATE_FORMAT)) throw new Error(`Date ${date} is in an unexpected format!`);
    return format(parseISO(date), "MM/dd/yyyy");
};
