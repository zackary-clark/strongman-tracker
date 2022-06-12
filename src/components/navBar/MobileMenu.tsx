import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { MAX_ROUTE, WORKOUT_ROUTE } from "../../pages/constants";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";

export const MobileMenu: FunctionComponent = () => {
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
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
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
                    <MenuItem onClick={handleClose}>
                        <MenuButton routeTo={WORKOUT_ROUTE} ariaLabel={"workouts"} variant="text">Workouts</MenuButton>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <MenuButton routeTo={MAX_ROUTE} ariaLabel={"maxes"} variant="text">Maxes</MenuButton>
                    </MenuItem>
                </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: {xs: "flex", sm: "none"}, justifyContent: "center" }}>
                <Logo />
            </Box>
        </>
    );
};
