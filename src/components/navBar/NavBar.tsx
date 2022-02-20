import { AppBar, Box, Toolbar } from "@mui/material";
import React, { FunctionComponent } from "react";
import { AccountMenu } from "./AccountMenu";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export const NavBar: FunctionComponent = () => (
    <Box data-testid={"nav-bar"}>
        <AppBar enableColorOnDark position="sticky" sx={{backgroundColor: "primary.main"}}>
            <Toolbar>
                <DesktopMenu />
                <MobileMenu />
                <AccountMenu />
            </Toolbar>
        </AppBar>
    </Box>
);
