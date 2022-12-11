import { useAuth0 } from "@auth0/auth0-react";
import { AccountCircle, FitnessCenter, Logout, Settings } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React, { FunctionComponent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { getVersion } from "../../env/getters";
import { MY_EXERCISE_ROUTE } from "../../pages/constants";
import { PreferencesForm } from "./PreferencesForm";

export const AccountMenu: FunctionComponent = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPreferencesDrawerOpen, setIsPreferencesDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const version = getVersion();

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
            {isAuthenticated ? (
                    <IconButton onClick={handleOpenMenu} aria-label="account icon">
                        <AccountCircle fontSize="large" />
                    </IconButton>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => loginWithRedirect()}
                        color="neutral"
                    >
                        Log In
                    </Button>
                )}
            {isAuthenticated && (
                <>
                    <Menu open={isMenuOpen} onClose={handleCloseMenu} anchorEl={anchorEl}>
                        <MenuItem component={Link} to={MY_EXERCISE_ROUTE} onClick={() => setIsMenuOpen(false)}>
                            <ListItemIcon>
                                <FitnessCenter fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                My Exercises
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleOpenPreferencesDrawer}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                Preferences
                            </ListItemText>
                        </MenuItem>
                        <Box sx={{ margin: 0, fontSize: "small", color: "text.disabled" }}>
                            <Divider textAlign="right">
                                {version ? `v${version}` : undefined}
                            </Divider>
                        </Box>
                        <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
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
