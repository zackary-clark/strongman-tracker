import { Add, Remove } from "@mui/icons-material";
import {
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { Protocol, Set } from "../../../generated/schema";
import { ProtocolTableRow } from "./ProtocolTableRow";

interface Props {
    protocol: Protocol | null;
    setProtocol: React.Dispatch<React.SetStateAction<Protocol | null>>;
    exerciseId?: string;
}

export const ProtocolComponent: FunctionComponent<Props> = ({ protocol, setProtocol, exerciseId }) => (
    <Stack>
        <TableContainer component={Paper}>
            <Table size="small" padding="normal">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Weight</TableCell>
                        <TableCell align="center">Reps</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {protocol?.sets && protocol.sets.map((set, index) => (
                        <ProtocolTableRow
                            set={set}
                            key={index}
                            setSet={(changedSet: Set) => {
                                const newSets = protocol?.sets ? [...protocol.sets] : [];
                                newSets[index] = changedSet;
                                setProtocol({ sets: newSets });
                            }}
                            exerciseId={exerciseId}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Stack spacing={1} direction="row" sx={{ mt: 2 }} justifyContent="center">
            {protocol?.sets && protocol.sets.length > 0 && <IconButton
                size="small"
                onClick={() => {
                    setProtocol({ sets: protocol.sets.slice(0, protocol.sets.length - 1) });
                }}
            >
                <Remove />
            </IconButton>}
            <IconButton
                size="small"
                onClick={() => {
                    const newSets = protocol?.sets ? [...protocol.sets] : [];
                    const prevSet = protocol?.sets[protocol.sets.length - 1];
                    newSets.push(prevSet ?? {});
                    setProtocol({ sets: newSets });
                }}
            >
                <Add />
            </IconButton>
        </Stack>
    </Stack>
);
