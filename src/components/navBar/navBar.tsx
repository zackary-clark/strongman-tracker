import React from "react";
import {Link, LinkProps} from "react-router-dom";
import { maxRoute, demo2Route } from "../root/routes";
import {AppBar, Button, createStyles, makeStyles, Theme, Toolbar} from "@material-ui/core";

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

export default function NavBar() {
    const classes = useStyles();

    const MenuButton = (to: string, label: string) => (
        <Button
            href="#"
            color="secondary"
            variant="contained"
            component={LinkForward}
            to={to}
            className={classes.button}
        >
            {label}
        </Button>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"primary"}>
                <Toolbar>
                    {MenuButton(maxRoute, "Maxes")}
                    {MenuButton(demo2Route, "Demo2")}
                </Toolbar>
            </AppBar>
        </div>
    );
}
