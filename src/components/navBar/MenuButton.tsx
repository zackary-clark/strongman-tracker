import { Button, IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link, LinkProps } from "react-router-dom";

interface Props {
    routeTo: string;
    ariaLabel?: string;
    variant?: "contained" | "outlined" | "text";
}

const LinkForward = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref} {...props} />
));

export const MenuButton: FunctionComponent<Props> = ({routeTo, ariaLabel, variant, children}) => (
    <Button
        href="#"
        variant={variant ?? "contained"}
        component={LinkForward}
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

export const MenuIconButton: FunctionComponent<Props> = ({routeTo, ariaLabel, children}) => (
    <IconButton
        component={LinkForward}
        to={routeTo}
        aria-label={ariaLabel}
        sx={{
            marginRight: 2
        }}
    >
        {children}
    </IconButton>
);
