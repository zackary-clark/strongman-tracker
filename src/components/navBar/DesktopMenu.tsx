import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useAuthenticated } from "../../context/keycloakContext";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { navbarLinks } from "./navbarLinks";

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
