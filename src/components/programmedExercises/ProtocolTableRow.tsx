import { TableCell, TableRow, TextField } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Set } from "../../../generated/schema";
import { useConvertWeight } from "../../hooks/useConvertWeight";

interface Props {
    set: Set
    setSet: (set: Set) => void;
}

export const ProtocolTableRow: FunctionComponent<Props> = ({ set, setSet }) => {
    const { convertToUserUnit, convertUserUnitStringToGrams } = useConvertWeight();

    const handleChange = (changedValues: Partial<Set>) => {
        setSet({
            ...set,
            ...changedValues,
            __typename: undefined,
        });
    };

    return (
        <TableRow>
            <TableCell align="center">
                <TextField
                    size="small"
                    value={set.weight ? convertToUserUnit(set.weight).toString() : ""}
                    onChange={(event) => handleChange({
                        weight: event.target.value ? convertUserUnitStringToGrams(event.target.value) : null,
                    })}
                    type="number"
                    fullWidth
                />
            </TableCell>
            <TableCell align="center">
                <TextField
                    size="small"
                    value={set.repetitions ? set.repetitions.toString() : ""}
                    onChange={event => handleChange({
                        repetitions: event.target.value ? Number.parseInt(event.target.value) : null,
                    })}
                    type="number"
                    fullWidth
                />
            </TableCell>
        </TableRow>
    );
};
