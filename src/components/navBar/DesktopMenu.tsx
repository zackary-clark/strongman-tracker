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
                <Logo />
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
