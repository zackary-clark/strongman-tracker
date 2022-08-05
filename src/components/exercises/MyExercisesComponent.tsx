import { Box, capitalize, List, ListItemButton, ListItemText } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";
import { Exercise } from "../../../generated/schema";
import { useMyExercisesQuery } from "../../operations/exerciseOperations";
import { LoadingScreen } from "../common/LoadingScreen";

export const MyExercisesComponent: FunctionComponent = () => {
    const { loading, data } = useMyExercisesQuery();

    if (loading || !data) return <LoadingScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
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
            </List>
        </Box>
    );
};
