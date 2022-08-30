import { AddCircle, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack
} from "@mui/material";
import React, { FunctionComponent, MouseEventHandler } from "react";

interface StandardListOptions {
    key: string,
    primary: string,
    secondary?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
    upArrowClick?: MouseEventHandler<HTMLButtonElement>,
    downArrowClick?: MouseEventHandler<HTMLButtonElement>,
}

interface Props {
    options: StandardListOptions[],
    primaryWrap?: boolean,
    secondaryWrap?: boolean,
    showNew?: boolean,
    newOnClick?: MouseEventHandler<HTMLDivElement>,
    newLabel?: string,
    showArrowButtons?: boolean,
}

const ArrowButtons: FunctionComponent<{option: StandardListOptions}> = ({option}) => {
    return <Stack>
        <IconButton
            edge="end"
            size="small"
            aria-label={`up button for ${option.key}`}
            onClick={option.upArrowClick}
        >
            <KeyboardArrowUp />
        </IconButton>
        <IconButton
            edge="end"
            size="small"
            aria-label={`down button for ${option.key}`}
            onClick={option.downArrowClick}
        >
            <KeyboardArrowDown />
        </IconButton>
    </Stack>;
};

export const StandardList: FunctionComponent<Props> = ({
    options,
    primaryWrap = false,
    secondaryWrap = false,
    showNew = false,
    newOnClick = () => {},
    newLabel = "Add New",
    showArrowButtons = false,
}) => (
    <Box sx={{ display: "flex", justifyContent: "center", marginX: 1, marginY: 2 }}>
        <Paper elevation={4} sx={{ width: "100%", maxWidth: 400 }}>
            <List disablePadding>
                {options.map((option) => (
                    <ListItem
                        key={option.key}
                        disablePadding
                        secondaryAction={showArrowButtons && <ArrowButtons option={option} />}
                    >
                        <ListItemButton onClick={option.onClick}>
                            <ListItemText
                                inset
                                primary={option.primary}
                                primaryTypographyProps={{ noWrap: !primaryWrap }}
                                secondary={option.secondary}
                                secondaryTypographyProps={{ noWrap: !secondaryWrap }}
                            />
                        </ListItemButton>
                    </ListItem>
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
