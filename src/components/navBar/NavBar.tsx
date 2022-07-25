import { AppBar, Theme, Toolbar, useMediaQuery } from "@mui/material";
import React, { FunctionComponent } from "react";
import { AccountMenu } from "./AccountMenu";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export const NavBar: FunctionComponent = () => {
    const mediumOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    const smallOrSmaller = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <AppBar data-testid={"nav-bar"} enableColorOnDark position="sticky" sx={{ backgroundColor: "primary.main" }}>
            <Toolbar>
                {mediumOrLarger && <DesktopMenu />}
                {smallOrSmaller && <MobileMenu />}
                <AccountMenu />
            </Toolbar>
        </AppBar>
    );
};
