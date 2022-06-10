import { Box, CircularProgress } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";

export const LoadingScreen: FunctionComponent = () => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        }}
    >
        <CircularProgress color="secondary" />
    </Box>);
