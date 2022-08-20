import { Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { FunctionComponent } from "react";
import { Program } from "../../../generated/schema";

interface Props {
    program: Program,
    onEditClick: () => void,
}

export const ProgramInfo: FunctionComponent<Props> = ({ program, onEditClick }) => {
    return <Paper elevation={4}>
        <Grid container spacing={2} marginX={1.5} marginTop={0}>
            <Grid xs={1} />
            <Grid xs={10} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" align="center">
                    {program.name}
                </Typography>
            </Grid>
            <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                <IconButton aria-label="edit program details" onClick={onEditClick}>
                    <Edit fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
        {program.description ? (
                <Typography variant="body2" align="center" sx={{ margin: 2 }}>
                    {program.description}
                </Typography>
            ) :
            <Box marginBottom={1} />
        }
    </Paper>;
};
