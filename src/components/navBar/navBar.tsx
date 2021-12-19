import React from "react";
import { AppBar, createStyles, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { demo2Route, maxRoute, workoutsRoute } from "../routes";
import { MenuButton } from "./MenuButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export function NavBar(): React.ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root} data-testid={"nav-bar"}>
            <AppBar position="static" color={"primary"}>
                <Toolbar>
                    <MenuButton routeTo={workoutsRoute} label={"Workouts"} ariaLabel={"go-to-workouts"} />
                    <MenuButton routeTo={maxRoute} label={"Maxes"} ariaLabel={"go-to-maxes"} />
                    <MenuButton routeTo={demo2Route} label={"Demo"} ariaLabel={"go-to-demo"} />
                </Toolbar>
            </AppBar>
        </div>
    );
}
