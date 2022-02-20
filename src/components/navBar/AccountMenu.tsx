import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { FunctionComponent } from "react";

export const AccountMenu: FunctionComponent = () => (
    <Box sx={{display: "flex"}}>
        <Tooltip title="Auth, via Keycloak, coming soon!" placement="bottom-start">
            <IconButton>
                <AccountCircle fontSize="large" />
            </IconButton>
        </Tooltip>
    </Box>
);
