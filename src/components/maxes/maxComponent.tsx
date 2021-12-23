import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IMax } from "../../data/max";
import { getMaxes, postMax } from "../../webClient";
import { SnackbarContext } from "../../context";

export function MaxComponent(): React.ReactElement {
    const { onOpenSnackbar } = useContext(SnackbarContext);
    const [ maxes, setMaxes ] = useState<IMax[]>([]);

    useEffect(() => {
        getMaxes()
            .then((res) => res.data)
            .then((resData) => {
                setMaxes(resData);
            })
            .catch(e => {
                console.error("Get Failed");
                onOpenSnackbar("Network Error!");
            });
    }, []);

    const addEntry = (newData: IMax): Promise<void | IMax> => {
        return postMax(newData)
            .then(res => {
                const newMaxes: IMax[] = maxes.splice(0);
                newMaxes.push(res.data);
                setMaxes(newMaxes);
            })
            .catch(e => {
                console.error("Save Failed");
                onOpenSnackbar("Save Failed!");
            });
    };

    return (
        <Box className={"max-container"}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "gruv.BG1", fontWeight: "bold", }}>
                            <TableCell>Date</TableCell>
                            <TableCell>Squat</TableCell>
                            <TableCell>Bench</TableCell>
                            <TableCell>Deadlift</TableCell>
                            <TableCell>OHP</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maxes.map(max => (
                            <MaxRow max={max} key={max._id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

interface MaxRowProps {
    max: IMax;
}

const MaxRow = ({max}: MaxRowProps) => (
    <TableRow sx={{"&:nth-of-type(odd)": {backgroundColor: "action.hover"}}}>
        <TableCell>{max.date}</TableCell>
        <TableCell>{max.squat1RM}</TableCell>
        <TableCell>{max.bench1RM}</TableCell>
        <TableCell>{max.deadlift1RM}</TableCell>
        <TableCell>{max.press1RM}</TableCell>
    </TableRow>
);
