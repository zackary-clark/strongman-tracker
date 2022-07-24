import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, MouseEvent, useState } from "react";
import { useAuthenticated, useKeycloak } from "../../context/keycloakContext";
import { PreferencesForm } from "./PreferencesForm";

export const AccountMenu: FunctionComponent = () => {
    const keycloak = useKeycloak();
    const authenticated = useAuthenticated();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPreferencesDrawerOpen, setIsPreferencesDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setIsMenuOpen(!isMenuOpen);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    const handleOpenPreferencesDrawer = () => {
        setIsMenuOpen(false);
        setIsPreferencesDrawerOpen(true);
    };

    return (
        <>
            <Box sx={{display: "flex"}}>
                {authenticated ? (
                        <IconButton onClick={handleOpenMenu} aria-label="account icon">
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
            {authenticated && (
                <>
                    <Menu open={isMenuOpen} onClose={handleCloseMenu} anchorEl={anchorEl}>
                        <MenuItem onClick={handleOpenPreferencesDrawer}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                Preferences
                            </ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => keycloak.logout({redirectUri: getLocationMinusHash()})}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                Log Out
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                    <Drawer
                        data-testid="preferences drawer"
                        anchor="right"
                        open={isPreferencesDrawerOpen}
                        onClose={() => setIsPreferencesDrawerOpen(false)}
                    >
                        <Box sx={{ minWidth: 240 }}>
                            <PreferencesForm />
                        </Box>
                    </Drawer>
                </>
            )}
        </>
    );
};

const getLocationMinusHash = (): string => {
    const hash = window.location.hash;
    const fullHref = window.location.href;
    const index = fullHref.indexOf(hash);
    return fullHref.substring(0, index);
};
