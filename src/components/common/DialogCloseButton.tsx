import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";

interface Props {
    onClick: () => void,
}

export const DialogCloseButton: FunctionComponent<Props> = ({
    onClick,
}) => (
    <IconButton
        aria-label="close"
        onClick={onClick}
        sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
        }}
    >
        <Close />
    </IconButton>
);
