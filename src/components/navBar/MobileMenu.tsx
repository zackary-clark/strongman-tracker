import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "../../context/keycloakContext";
import { useLoginWarning } from "../../context/snackbarContext";
import { MAX_ROUTE, WORKOUT_ROUTE } from "../../pages/constants";
import { Logo } from "./Logo";

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
                    <MenuItem
                        onClick={() => {
                            navigate(WORKOUT_ROUTE);
                            setIsMenuOpen(false);
                        }}
                    >
                        Workouts
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate(MAX_ROUTE);
                            setIsMenuOpen(false);
                        }}
                    >
                        Maxes
                    </MenuItem>
                </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Logo />
            </Box>
        </>
    );
};
