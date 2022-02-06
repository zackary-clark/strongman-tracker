import { Add } from "@mui/icons-material";
import {
    Box,
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import * as React from "react";
import { useContext, useState } from "react";
import {
    AddMaxInput,
    AllMaxesDocument,
    AllMaxesQuery,
    useAddMaxMutation,
    useAllMaxesQuery
} from "../../../generated/schema";
import { SnackbarContext } from "../../context";
import { AddDialog } from "./AddDialog";
import { MaxRow } from "./MaxRow";

export function MaxComponent(): React.ReactElement {
    const {openSnackbar} = useContext(SnackbarContext);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

    const { loading, error: queryError, data } = useAllMaxesQuery();
    const [addMax, { error: mutationError }] = useAddMaxMutation({
        update(cache, {data}) {
            const newMax = data?.addMax?.max;
            if (newMax) {
                const existingMaxesQuery: AllMaxesQuery | null = cache.readQuery({query: AllMaxesDocument});
                cache.writeQuery({
                    query: AllMaxesDocument,
                    data: {
                        maxes: existingMaxesQuery ? [...existingMaxesQuery.maxes, newMax] : [newMax]
                    }
                });
            }
        }
    });

    if (loading) return <Typography>Loading...</Typography>;

    if (queryError) {
        console.error("Max Query Failed");
        openSnackbar("Network Error!");
    }

    if (mutationError) {
        console.error("AddMax Failed");
        openSnackbar("Save Failed!");
    }

    const maxes = data?.maxes || [];

    const addEntry = async (input: AddMaxInput) => {
        setIsAddDialogOpen(false);
        try {
            await addMax({
                variables: {
                    input
                }
            });
        } catch (e) {
            console.error("AddMax Error Caught: ", e);
        }
    };

    return (
        <Box className={"max-container"}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "gruv.BG1", fontWeight: "bold"}}>
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
                            <MaxRow max={max} key={max.id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isAddDialogOpen &&
            <AddDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} addMax={addEntry} />}
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
