import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Link, LinkProps } from "react-router-dom";
import { AppBar, Button, Theme, Toolbar, createStyles, makeStyles } from "@material-ui/core";
import { demo2Route, maxRoute } from "../root/routes";
import React from "react";

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

export default function NavBar(): JSX.Element {
    const classes: ClassNameMap<"button" | "root"> = useStyles();

    const MenuButton = (to: string, label: string): JSX.Element => (
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
