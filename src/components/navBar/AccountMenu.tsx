import { AccountCircle, Logout } from "@mui/icons-material";
import { Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, MouseEvent, useState } from "react";
import { useAuthenticated, useKeycloak } from "../../context/keycloakContext";

export const AccountMenu: FunctionComponent = () => {
    const keycloak = useKeycloak();
    const authenticated = useAuthenticated();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setIsMenuOpen(!isMenuOpen);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{display: "flex"}}>
                {authenticated ? (
                        <IconButton onClick={handleOpen} aria-label="account icon">
                            <AccountCircle fontSize="large" />
                        </IconButton>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => keycloak.login()}
                            color="neutral"
                        >
                            Log In
                        </Button>
                    )}
            </Box>
            <Menu open={isMenuOpen} onClose={handleClose} anchorEl={anchorEl}>
                <MenuItem onClick={() => keycloak.logout({redirectUri: getLocationMinusHash()})}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Log Out
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

const getLocationMinusHash = (): string => {
    const hash = window.location.hash;
    const fullHref = window.location.href;
    const index = fullHref.indexOf(hash);
    return fullHref.substring(0, index);
};
