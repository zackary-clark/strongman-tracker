import { useReactiveVar } from "@apollo/client";
import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Box, IconButton, Theme, Toolbar, useMediaQuery } from "@mui/material";
import React, { FunctionComponent } from "react";
import { themeModeVar } from "../../reactiveVariables";
import { AccountMenu } from "./AccountMenu";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export const NavBar: FunctionComponent = () => {
    const mediumOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    const smallOrSmaller = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const themeMode = useReactiveVar(themeModeVar);

    return (
        <AppBar data-testid={"nav-bar"} enableColorOnDark position="sticky" sx={{ backgroundColor: "primary.main" }}>
            <Toolbar>
                {mediumOrLarger && <DesktopMenu />}
                {smallOrSmaller && <MobileMenu />}
                <Box>
                    {themeMode === "light" ? (
                        <IconButton onClick={() => themeModeVar("dark")} color="neutral">
                            <LightMode />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => themeModeVar("light")} color="neutral">
                            <DarkMode />
                        </IconButton>
                    )}
                    <AccountMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
};
