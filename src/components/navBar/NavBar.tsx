import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import { demo2Route, maxRoute, workoutsRoute } from "../routes";
import { MenuButton } from "./MenuButton";

export function NavBar(): React.ReactElement {
    return (
        <Box data-testid={"nav-bar"}>
            <AppBar enableColorOnDark position="static" sx={{backgroundColor: "primary.main"}}>
                <Toolbar>
                    <MenuButton routeTo={workoutsRoute} label={"Workouts"} ariaLabel={"go-to-workouts"} />
                    <MenuButton routeTo={maxRoute} label={"Maxes"} ariaLabel={"go-to-maxes"} />
                    <MenuButton routeTo={demo2Route} label={"Demo"} ariaLabel={"go-to-demo"} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
