import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Theme, Toolbar, Typography, useMediaQuery } from "@mui/material";
import React, { FunctionComponent } from "react";
import { AccountMenu } from "./AccountMenu";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export const NavBar: FunctionComponent = () => {
    const { user } = useAuth0();

    const mediumOrLarger = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    const smallOrSmaller = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <AppBar data-testid={"nav-bar"} enableColorOnDark position="sticky" sx={{ backgroundColor: "primary.main" }}>
            <Toolbar>
                {mediumOrLarger && <DesktopMenu />}
                {smallOrSmaller && <MobileMenu />}
                {mediumOrLarger && (
                    <Typography color={theme => theme.palette.neutral.main}>
                        {user?.email}
                    </Typography>
                )}
                <AccountMenu showUsername={smallOrSmaller} />
            </Toolbar>
        </AppBar>
    );
};
