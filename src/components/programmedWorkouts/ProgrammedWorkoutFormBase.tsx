import { Clear } from "@mui/icons-material";
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { FunctionComponent } from "react";
import { DayOfWeek, MuscleGroup } from "../../../generated/schema";
import { DayOfWeekToggleButtonGroup } from "../common/DayOfWeekToggleButtonGroup";
import { MuscleGroupMultiSelect } from "../common/MuscleGroupMultiSelect";

interface Props {
    headingLabel: string,
    nameIsRequired: boolean,
    nameStateTuple: [string, React.Dispatch<React.SetStateAction<string>>],
    nameOnBlur?: () => void,
    descriptionStateTuple: [string, React.Dispatch<React.SetStateAction<string>>],
    descriptionOnBlur?: () => void,
    dayOfWeekStateTuple: [DayOfWeek | null, React.Dispatch<React.SetStateAction<DayOfWeek | null>>],
    dayOfWeekOnClick?: (event: React.MouseEvent<HTMLElement>, newDay: DayOfWeek | null) => void,
    focusGroupsStateTuple: [MuscleGroup[], React.Dispatch<React.SetStateAction<MuscleGroup[]>>],
    focusGroupsOnClose?: () => void,
    onCloseClick?: () => void,
}

export const ProgrammedWorkoutFormBase: FunctionComponent<Props> = ({
    headingLabel,
    nameIsRequired,
    nameStateTuple,
    nameOnBlur = () => {},
    descriptionStateTuple,
    descriptionOnBlur = () => {},
    dayOfWeekStateTuple,
    dayOfWeekOnClick,
    focusGroupsStateTuple,
    focusGroupsOnClose = () => {},
    onCloseClick,
}) => {
    const [name, setName] = nameStateTuple;
    const [description, setDescription] = descriptionStateTuple;

    return (
        <Paper elevation={4} sx={{ width: "100%", maxWidth: 400 }}>
            <Grid container spacing={2} marginX={1.5} marginTop={0}>
                <Grid xs={1} />
                <Grid xs={10} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6" align="center">
                        {headingLabel}
                    </Typography>
                </Grid>
                <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                    {onCloseClick && (
                        <IconButton aria-label="close" onClick={onCloseClick}>
                            <Clear fontSize="small" />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
            <Stack spacing={2} sx={{ marginX: 2, marginBottom: 2, marginTop: 1 }}>
                <TextField
                    label="Name"
                    value={name}
                    required={nameIsRequired}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={nameOnBlur}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    onBlur={descriptionOnBlur}
                    multiline
                />
                <DayOfWeekToggleButtonGroup dayOfWeekStateTuple={dayOfWeekStateTuple} dayOfWeekOnClick={dayOfWeekOnClick} />
                <MuscleGroupMultiSelect focusGroupsStateTuple={focusGroupsStateTuple} focusGroupsOnClose={focusGroupsOnClose} />
            </Stack>
        </Paper>
    );
};
