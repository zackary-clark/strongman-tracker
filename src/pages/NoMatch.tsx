import { Home, Report } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ROOT_ROUTE } from "./constants";

export const NoMatch: FunctionComponent = () => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        }}
    >
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Report color="error" sx={{ fontSize: 200 }} />
            </Box>
            <Typography align="center" variant="h1" color="error">404</Typography>
            <Typography align="center" variant="h6">What is it you&apos;re trying to do?</Typography>
            <Typography align="center" variant="h6">Stop. Click below instead.</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton component={Link} to={ROOT_ROUTE} aria-label="home">
                    <Home fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    </Box>
);
