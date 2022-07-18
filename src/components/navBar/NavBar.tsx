import { AppBar, Box, Theme, Toolbar, useMediaQuery } from "@mui/material";
import Keycloak from "keycloak-js";
import React, { FunctionComponent } from "react";
import { AccountMenu } from "./AccountMenu";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

interface Props {
    keycloak?: Keycloak
}

export const NavBar: FunctionComponent<Props> = ({keycloak}) => {
    const mediumOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    const smallOrSmaller = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <Box data-testid={"nav-bar"}>
            <AppBar enableColorOnDark position="sticky" sx={{ backgroundColor: "primary.main" }}>
                <Toolbar>
                    {mediumOrLarger && <DesktopMenu />}
                    {smallOrSmaller && <MobileMenu />}
                    <AccountMenu keycloak={keycloak} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};
