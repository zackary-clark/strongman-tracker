import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "../../context/keycloakContext";
import { useLoginWarning } from "../../context/snackbarContext";
import { Logo } from "./Logo";
import { navbarLinks } from "./navbarLinks";

export const MobileMenu: FunctionComponent = () => {
    const authenticated = useAuthenticated();
    const openLoginWarning = useLoginWarning();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (authenticated) {
            setIsMenuOpen(!isMenuOpen);
            setAnchorEl(event.currentTarget);
        } else {
            openLoginWarning();
        }
    };

    const handleClose = () => {
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    return (
        <>
            <Box>
                <IconButton
                    aria-label="navigation menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleIconClick}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    open={isMenuOpen}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                >
                    {navbarLinks.map(link => (
                        <MenuItem
                            key={link.label + "_link"}
                            onClick={() => {
                                navigate(link.route);
                                setIsMenuOpen(false);
                            }}
                        >
                            {link.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <Logo />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </>
    );
};
