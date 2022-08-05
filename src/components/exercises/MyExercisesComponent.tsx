import { AddCircle } from "@mui/icons-material";
import { Box, capitalize, List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";
import { Exercise } from "../../../generated/schema";
import { useMyExercisesQuery } from "../../operations/exerciseOperations";
import { LoadingScreen } from "../common/LoadingScreen";

export const MyExercisesComponent: FunctionComponent = () => {
    const { loading, data } = useMyExercisesQuery();

    if (loading || !data) return <LoadingScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
            <Paper elevation={4} sx={{ width: "100%", maxWidth: 400 }}>
                <List aria-label="my-exercises" disablePadding>
                    {data.exercises.map((exercise: Exercise) => (
                        <ListItemButton key={exercise.id}>
                            <ListItemText
                                inset
                                primary={exercise.name}
                                primaryTypographyProps={{ noWrap: true }}
                                secondary={exercise.focusGroups.map(e => capitalize(e)).join(", ")}
                                secondaryTypographyProps={{ noWrap: true }}
                            />
                        </ListItemButton>
                    ))}
                    <ListItemButton>
                        <ListItemIcon><AddCircle color="secondary" fontSize="large" /></ListItemIcon>
                        <ListItemText
                            primary="Add Custom Exercise"
                            primaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItemButton>
                </List>
            </Paper>
        </Box>
    );
};
