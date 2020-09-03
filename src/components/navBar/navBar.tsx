import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { AppBar, Button, Theme, Toolbar, createStyles, makeStyles } from "@material-ui/core";
import { demo2Route, maxRoute } from "../root/routes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        button: {
            marginRight: theme.spacing(1),
        },
    }),
);

const LinkForward = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref} {...props} />
));

export function NavBar(): JSX.Element {
    const classes = useStyles();

    const MenuButton = (to: string, label: string, ariaLabel?: string): JSX.Element => (
        <Button
            href="#"
            color="secondary"
            variant="contained"
            component={LinkForward}
            to={to}
            className={classes.button}
            aria-label={ariaLabel}
        >
            {label}
        </Button>
    );

    return (
        <div className={classes.root} data-testid={"nav-bar"}>
            <AppBar position="static" color={"primary"}>
                <Toolbar>
                    {MenuButton(maxRoute, "Maxes", "go-to-maxes")}
                    {MenuButton(demo2Route, "Demo2")}
                </Toolbar>
            </AppBar>
        </div>
    );
}
