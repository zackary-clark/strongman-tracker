import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useAuthenticated } from "../../context/keycloakContext";
import { MAX_ROUTE, WORKOUT_ROUTE } from "../../pages/constants";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";

export const DesktopMenu: FunctionComponent = () => {
    const authenticated = useAuthenticated();
    return (
        <>
            <Box>
                <Box sx={{ mr: 2 }} component="span">
                    <Logo />
                </Box>
                {authenticated &&
                    <>
                        <MenuButton routeTo={WORKOUT_ROUTE} ariaLabel={"workouts"}>Workouts</MenuButton>
                        <MenuButton routeTo={MAX_ROUTE} ariaLabel={"maxes"}>Maxes</MenuButton>
                    </>
                }
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </>
    );
};
