import { Box, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

export const ErrorScreen: FunctionComponent = () => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        }}
        data-testid="loading spinner"
    >
        <Box>
            <Typography align="center" variant="h4" color="error">Failed to Fetch Data</Typography>
            <Typography align="center" variant="h5" color="error">Please Refresh</Typography>
        </Box>
    </Box>
);
