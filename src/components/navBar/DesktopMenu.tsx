import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import { MAX_ROUTE, WORKOUT_ROUTE } from "../routes";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";

export const DesktopMenu: FunctionComponent = () => (
    <>
        <Box
            sx={{ display: {xs: "none", sm: "block"} }}>
            <Logo />
            <MenuButton routeTo={WORKOUT_ROUTE} ariaLabel={"workouts"}>Workouts</MenuButton>
            <MenuButton routeTo={MAX_ROUTE} ariaLabel={"maxes"}>Maxes</MenuButton>
        </Box>
        <Box sx={{ flexGrow: 1, display: {xs: "none", sm: "block"} }} />
    </>
);
