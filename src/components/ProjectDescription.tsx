import { ChevronRight, GitHub } from "@mui/icons-material";
import { Box, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

export const ProjectDescription: FunctionComponent = () => (
    <Box margin={4}>
        <IconButton component={Link} href="https://github.com/zackary-clark/strongman-tracker">
            <GitHub fontSize="large" />
        </IconButton>
        <Typography variant="h4">
            What?
        </Typography>
        <Typography variant="body1" margin={4}>
            This is my React, Apollo and MUI project for strongman workout tracking.
        </Typography>
        <Typography variant="h4">
            How?
        </Typography>
        <Typography variant="body1" mt={4} mx={4}>
            To try out the app, login with the email <Typography variant="button" color="secondary">demo@demo.com</Typography> and password <Typography variant="button" color="secondary">demo</Typography>.
        </Typography>
        <Typography variant="body1" mb={4} mx={4}>
            Alternatively, you can register from within the login page to become a &quot;real&quot; user.
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
