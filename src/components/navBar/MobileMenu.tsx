import { useAuth0 } from "@auth0/auth0-react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginWarning } from "../../context/snackbarContext";
import { Logo } from "./Logo";
import { navbarLinks } from "./navbarLinks";

export const MobileMenu: FunctionComponent = () => {
    const { isAuthenticated } = useAuth0();
    const openLoginWarning = useLoginWarning();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isAuthenticated) {
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
                    color="neutral"
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
