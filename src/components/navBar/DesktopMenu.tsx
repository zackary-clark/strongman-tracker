import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { navbarLinks } from "./navbarLinks";

export const DesktopMenu: FunctionComponent = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <>
            <Box>
                <Box sx={{ mr: 2 }} component="span">
                    <Logo />
                </Box>
                {isAuthenticated &&
                    <>
                        {navbarLinks.map(link => (
                            <MenuButton key={link.label + "_link"} routeTo={link.route} ariaLabel={link.label}>{link.label}</MenuButton>
                        ))}
                    </>
                }
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </>
    );
};
