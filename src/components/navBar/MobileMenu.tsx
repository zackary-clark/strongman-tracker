import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useAuthenticated } from "../../context/keycloakContext";
import { MAX_ROUTE, WORKOUT_ROUTE } from "../../pages/constants";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";

export const MobileMenu: FunctionComponent = () => {
    const authenticated = useAuthenticated();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsMenuOpen(!isMenuOpen);
        setAnchorEl(event.currentTarget);
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
                    {authenticated &&
                        [
                            <MenuItem key="workouts-menu-item" onClick={handleClose}>
                                <MenuButton routeTo={WORKOUT_ROUTE} ariaLabel={"workouts"} variant="text">Workouts</MenuButton>
                            </MenuItem>,
                            <MenuItem key="maxes-menu-item" onClick={handleClose}>
                                <MenuButton routeTo={MAX_ROUTE} ariaLabel={"maxes"} variant="text">Maxes</MenuButton>
                            </MenuItem>
                        ]
                    }
                </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Logo />
            </Box>
        </>
    );
};
