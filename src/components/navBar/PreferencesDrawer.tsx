import { Settings } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { FunctionComponent } from "react";
import { PreferencesForm } from "./PreferencesForm";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const PreferencesDrawer: FunctionComponent<Props> = ({ open, onClose }) => {
    return (
        <Drawer
            data-testid="preferences drawer"
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box sx={{ minWidth: 240 }}>
                <List>
                    <ListItem>
                        <ListItemIcon><Settings /></ListItemIcon>
                        <ListItemText>Preferences</ListItemText>
                    </ListItem>
                    <Divider />
                    <PreferencesForm />
                </List>
            </Box>
        </Drawer>
    );
};
