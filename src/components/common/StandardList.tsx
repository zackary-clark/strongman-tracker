import { AddCircle } from "@mui/icons-material";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import React, { FunctionComponent, MouseEventHandler } from "react";

interface StandardListOptions {
    key: string,
    primary: string,
    secondary?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
}

interface Props {
    options: StandardListOptions[],
    primaryWrap?: boolean,
    secondaryWrap?: boolean,
    showNew?: boolean,
    newOnClick?: MouseEventHandler<HTMLDivElement>,
    newLabel?: string,
}

export const StandardList: FunctionComponent<Props> = ({
    options,
    primaryWrap = false,
    secondaryWrap = false,
    showNew = false,
    newOnClick = () => {},
    newLabel = "Add New",
}) => (
    <Box sx={{ display: "flex", justifyContent: "center", marginX: 1, marginY: 2 }}>
        <Paper elevation={4} sx={{ width: "100%", maxWidth: 400 }}>
            <List disablePadding>
                {options.map((option) => (
                    <ListItemButton key={option.key} onClick={option.onClick}>
                        <ListItemText
                            inset
                            primary={option.primary}
                            primaryTypographyProps={{ noWrap: !primaryWrap }}
                            secondary={option.secondary}
                            secondaryTypographyProps={{ noWrap: !secondaryWrap }}
                        />
                    </ListItemButton>
                ))}
                {showNew && (
                    <ListItemButton onClick={newOnClick}>
                        <ListItemIcon>
                            <AddCircle color="secondary" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText
                            primary={newLabel}
                            primaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItemButton>
                )}
            </List>
        </Paper>
    </Box>
);
