import { Edit } from "@mui/icons-material";
import { Avatar, Box, capitalize, Chip, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { FunctionComponent } from "react";
import { ProgrammedWorkout } from "../../../generated/schema";

interface Props {
    programmedWorkout: ProgrammedWorkout,
    onEditClick: () => void,
}

export const ProgrammedWorkoutInfo: FunctionComponent<Props> = ({ programmedWorkout, onEditClick }) => {
    const hasFocusGroups = programmedWorkout?.focusGroups && programmedWorkout.focusGroups?.length > 0;
    return (
        <Paper>
            <Grid container spacing={2} marginX={1.5} marginTop={0}>
                <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                    {programmedWorkout.day && (
                        <Avatar sx={{ bgcolor: "primary.main", fontSize: "1rem" }}>
                            {capitalize(programmedWorkout.day)}
                        </Avatar>
                    )}
                </Grid>
                <Grid xs={10} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6" align="center">
                        {programmedWorkout.name}
                    </Typography>
                </Grid>
                <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton aria-label="edit program details" onClick={onEditClick}>
                        <Edit fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
            {programmedWorkout.description && (
                <Typography variant="body2" align="center" sx={{ margin: 2 }}>
                    {programmedWorkout.description}
                </Typography>
            )}
            {hasFocusGroups && (
                <Box sx={{ display: "flex", justifyContent: "center", marginX: 2 }}>
                    <Stack direction="row" spacing={1}>
                        {/* @ts-ignore */}
                        {programmedWorkout.focusGroups.map(value => (
                            <Chip key={value} label={capitalize(value)} size="small" />
                        ))}
                    </Stack>
                </Box>
            )}
            {(hasFocusGroups || !programmedWorkout.description) && (
                <Box marginBottom={1} />
            )}
        </Paper>
    );
};
