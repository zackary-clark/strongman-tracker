import { AppBar, Box, Toolbar } from "@mui/material";
import Keycloak from "keycloak-js";
import React, { FunctionComponent } from "react";
import { AccountMenu } from "./AccountMenu";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

interface Props {
    keycloak?: Keycloak
}

export const NavBar: FunctionComponent<Props> = ({keycloak}) => (
    <Box data-testid={"nav-bar"}>
        <AppBar enableColorOnDark position="sticky" sx={{backgroundColor: "primary.main"}}>
            <Toolbar>
                {/* TODO: useMediaQuery() instead of css-based hiding? */}
                <DesktopMenu />
                <MobileMenu />
                <AccountMenu keycloak={keycloak} />
            </Toolbar>
        </AppBar>
    </Box>
);
