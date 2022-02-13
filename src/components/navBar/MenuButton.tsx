import React, { FunctionComponent } from "react";
import { Button } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

interface Props {
    routeTo: string;
    label: string;
    ariaLabel?: string;
}

const LinkForward = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref} {...props} />
));

export const MenuButton: FunctionComponent<Props> = ({routeTo, label, ariaLabel}) => {
    return (
        <Button
            href="#"
            variant="contained"
            component={LinkForward}
            to={routeTo}
            aria-label={ariaLabel}
            color="neutral"
            sx={{
                marginRight: 1
            }}
        >
            {label}
        </Button>
    );
};
