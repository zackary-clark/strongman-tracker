import { AddCircle } from "@mui/icons-material";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useProgramsQuery } from "../../operations/programOperations";
import { LoadingScreen } from "../common/LoadingScreen";

export const ProgramsComponent: FunctionComponent = () => {
    const navigate = useNavigate();
    const { loading, data } = useProgramsQuery();

    if (loading || !data) return <LoadingScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
            <Paper elevation={4} sx={{ width: "100%", maxWidth: 400 }}>
                <List aria-label="Programs" disablePadding>
                    {data.programs.map((program) => (
                        <ListItemButton key={program.id} onClick={() => navigate(program.id)}>
                            <ListItemText
                                inset
                                primary={program.name}
                                primaryTypographyProps={{ noWrap: true }}
                                secondary="Workout 1, Workout 2"
                                secondaryTypographyProps={{ noWrap: true }}
                            />
                        </ListItemButton>
                    ))}
                    <ListItemButton onClick={() => navigate("new")}>
                        <ListItemIcon>
                            <AddCircle color="secondary" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Add Program"
                            primaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItemButton>
                </List>
            </Paper>
        </Box>
    );
};
