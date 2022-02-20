import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import { demo2Route, maxRoute, workoutsRoute } from "../routes";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";

export const DesktopMenu: FunctionComponent = () => (
    <>
        <Box
            sx={{ display: {xs: "none", sm: "block"} }}>
            <Logo />
            <MenuButton routeTo={workoutsRoute} ariaLabel={"workouts"}>Workouts</MenuButton>
            <MenuButton routeTo={maxRoute} ariaLabel={"maxes"}>Maxes</MenuButton>
            <MenuButton routeTo={demo2Route} ariaLabel={"demo"}>Demo</MenuButton>
        </Box>
        <Box sx={{ flexGrow: 1, display: {xs: "none", sm: "block"} }} />
    </>
);
