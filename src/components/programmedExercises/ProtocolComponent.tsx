import { Add, Remove } from "@mui/icons-material";
import {
    capitalize,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    useMediaQuery
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { Protocol, Set } from "../../../generated/schema";
import { useConvertWeight } from "../../hooks/useConvertWeight";
import { ProtocolTableRow } from "./ProtocolTableRow";

interface Props {
    protocol: Protocol | null;
    setProtocol: React.Dispatch<React.SetStateAction<Protocol | null>>;
}

export const ProtocolComponent: FunctionComponent<Props> = ({ protocol, setProtocol }) => {
    const { unit } = useConvertWeight();
    const isExtraSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

    return (
        <Stack>
            <TableContainer component={Paper}>
                <Table size="small" padding="normal">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{isExtraSmallScreen ? capitalize(unit + "s") : `Weight (${unit}s)`}</TableCell>
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
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={1} direction="row" sx={{mt:2}} justifyContent="center">
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
};
