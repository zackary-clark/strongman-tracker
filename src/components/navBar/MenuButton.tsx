import React from "react";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Link, LinkProps } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginRight: theme.spacing(1),
        },
    }),
);

interface Props {
    routeTo: string;
    label: string;
    ariaLabel?: string;
}

const LinkForward = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref} {...props} />
));

export const MenuButton = ({routeTo, label, ariaLabel}: Props): React.ReactElement => {
    const classes = useStyles();

    return (
        <Button
            href="#"
            variant="contained"
            component={LinkForward}
            to={routeTo}
            className={classes.button}
            aria-label={ariaLabel}
        >
            {label}
        </Button>
    );
};
