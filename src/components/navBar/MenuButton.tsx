import { Button } from "@mui/material";
import React, { FunctionComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
    children: ReactNode;
    routeTo: string;
    ariaLabel?: string;
    variant?: "contained" | "outlined" | "text";
}

export const MenuButton: FunctionComponent<Props> = ({routeTo, ariaLabel, variant, children}) => (
    <Button
        href="#"
        variant={variant ?? "contained"}
        component={Link}
        to={routeTo}
        aria-label={ariaLabel}
        color="neutral"
        sx={{
            marginRight: 1
        }}
    >
        {children}
    </Button>
);
