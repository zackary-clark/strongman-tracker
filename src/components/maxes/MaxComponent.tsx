import { Add } from "@mui/icons-material";
import { Box, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { AddMaxInput } from "../../../generated/schema";
import { useAddMaxMutation, useAllMaxesQuery } from "../../operations/maxOperations";
import { LoadingScreen } from "../common/LoadingScreen";
import { AddDialog } from "./AddDialog";
import { MaxRow } from "./MaxRow";

export const MaxComponent: FunctionComponent = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

    const { loading, data } = useAllMaxesQuery();
    const [addMax] = useAddMaxMutation();

    if (loading) return <LoadingScreen />;

    const maxes = data?.maxes ?? [];

    const addEntry = async (input: AddMaxInput) => {
        setIsAddDialogOpen(false);
        await addMax({ variables: { input } });
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
