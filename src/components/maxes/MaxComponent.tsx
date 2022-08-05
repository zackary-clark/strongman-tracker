import { Add } from "@mui/icons-material";
import {
    Box,
    capitalize,
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
import { FunctionComponent, useState } from "react";
import { AddMaxInput, Max, MaxType } from "../../../generated/schema";
import { useConvertWeight } from "../../hooks/useConvertWeight";
import { useAddMaxMutation, useAllMaxesQuery } from "../../operations/maxOperations";
import { LoadingScreen } from "../common/LoadingScreen";
import { AddDialog } from "./AddDialog";
import { MaxRow } from "./MaxRow";

export const MaxComponent: FunctionComponent = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

    const { loading, data } = useAllMaxesQuery();
    const [addMax] = useAddMaxMutation();
    const { unit } = useConvertWeight();

    if (loading) return <LoadingScreen />;

    const addEntry = async (input: AddMaxInput) => {
        setIsAddDialogOpen(false);
        await addMax({ variables: { input } });
    };

    return (
        <Box className={"max-container"}>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <Fab
                    aria-label="add-max"
                    data-testid="add-max"
                    color="secondary"
                    sx={{ marginTop: 1 }}
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    <Add fontSize="large" />
                </Fab>
                {Object.values(MaxType).map((type: MaxType) => {
                    const maxes: Max[] = data ? data[getFieldName(type)] : [];
                    return (
                        <Paper key={getFieldName(type)} sx={{ marginX: 4, marginY: 1, width: 300 }} elevation={0}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Typography variant="subtitle1">
                                    {capitalize(type)}
                                </Typography>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{backgroundColor: "gruv.BG1", fontWeight: "bold"}}>
                                            <TableCell>Date</TableCell>
                                            <TableCell>{`Weight (${unit}s)`}</TableCell>
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
                        </Paper>
                    );
                })}
            </Box>
            { isAddDialogOpen &&
                <AddDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} addMax={addEntry} />}
        </Box>
    );
};

type FieldName = "deadliftMaxes" | "squatMaxes" | "pressMaxes" | "benchMaxes";

const getFieldName = (type: MaxType): FieldName => {
    return `${type}Maxes`;
};
