import { ChevronRight, GitHub } from "@mui/icons-material";
import React, { FunctionComponent } from "react";
import { Box, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

export const ProjectDescription: FunctionComponent = () => (
    <Box margin={4}>
        <IconButton>
            <Link href="https://github.com/zackary-clark" color="inherit" variant="inherit">
                <GitHub fontSize="large" />
            </Link>
        </IconButton>
        <Typography variant="h4">
            What?
        </Typography>
        <Typography variant="body1" margin={4}>
            This is my React / Apollo / MUI project for strongman/powerlifting workout tracking.
        </Typography>
        <Typography variant="h4">
            Why?
        </Typography>
        <Box margin={4}>
            <Typography variant="body1">
                Mostly as a learning exercise. But I do <i>actually</i> think a niche exists in the workout tracking &quot;market&quot;
                for powerlifting and strongman specific features.
            </Typography>
            <Typography variant="body1">
                Features such as (but not limited to):
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemIcon><ChevronRight /></ListItemIcon>
                    <ListItemText>&quot;Rate of Perceived Exertion&quot; (RPE)</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><ChevronRight /></ListItemIcon>
                    <ListItemText>Use of chains and bands</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><ChevronRight /></ListItemIcon>
                    <ListItemText>Programming based on percentage of One Rep Max</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><ChevronRight /></ListItemIcon>
                    <ListItemText>Changing rep/set schemes each week (for example when peaking for a meet)</ListItemText>
                </ListItem>
            </List>
            <Typography variant="body1">
                At my current pace, I&apos;ll implement those features by the year 3022 at the earliest, but this is really just to learn
                and keep my skills sharp during periods where I cannot be &quot;hands on keyboard&quot; as much as I&apos;d like at work.
            </Typography>
        </Box>
    </Box>
);
