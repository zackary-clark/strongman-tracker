import { Add } from "@mui/icons-material";
import { Box, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import {
    AddMaxInput,
    AllMaxesDocument,
    AllMaxesQuery,
    useAddMaxMutation,
    useAllMaxesQuery
} from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import { LoadingScreen } from "../common/LoadingScreen";
import { AddDialog } from "./AddDialog";
import { MaxRow } from "./MaxRow";

export const MaxComponent: FunctionComponent = () => {
    const openSnackbar = useSnackbar();
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

    useEffect(() => {
        if (queryError) {
            console.error("Max Query Failed");
            openSnackbar("error", "Network Error!");
        }
    }, [queryError]);

    useEffect(() => {
        if (mutationError) {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Save Failed!");
        }
    }, [mutationError]);

    if (loading) return <LoadingScreen />;

    const maxes = data?.maxes ?? [];

    const addEntry = async (input: AddMaxInput) => {
        setIsAddDialogOpen(false);
        try {
            await addMax({
                variables: {
                    input
                }
            });
        } catch (e) {
            // suppress, since graphql errors are really handled with mutationErrors
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
};
