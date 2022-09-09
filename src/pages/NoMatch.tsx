import { Box, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

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
            <Typography align="center" variant="h1" color="error">404</Typography>
            <Typography align="center" variant="h4" color="error">Not Found</Typography>
        </Box>
    </Box>
);
