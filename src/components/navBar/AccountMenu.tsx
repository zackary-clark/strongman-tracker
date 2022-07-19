import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useKeycloak } from "../../context/keycloakContext";

export const AccountMenu: FunctionComponent = () => {
    const keycloak = useKeycloak();

    const onClick = () => {
        keycloak.login();
    };

    return (
        <Box sx={{display: "flex"}}>
            <IconButton onClick={onClick}>
                <AccountCircle fontSize="large" />
            </IconButton>
        </Box>
    );
};
