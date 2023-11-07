import { styled, TextField, Tooltip } from "@mui/material";
import React, { FunctionComponent } from "react";

interface Props {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
}

const SpinnerlessNumberField = styled(TextField)(() => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));

export const TrainingMaxField: FunctionComponent<Props> = ({
    value,
    onChange,
    onBlur,
}) => {
    return (
        <Tooltip title="Training max used when programming based on percentages">
            <SpinnerlessNumberField
                size="small"
                sx={{width: 64}}
                type="number"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label="Max"
            />
        </Tooltip>
    );
};
