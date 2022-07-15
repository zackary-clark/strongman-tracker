import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Keycloak from "keycloak-js";
import React, { FunctionComponent } from "react";

interface Props {
    keycloak?: Keycloak
}

export const AccountMenu: FunctionComponent<Props> = ({keycloak}) => {
    const onClick = () => {
        keycloak?.login();
    };

    return (
        <Box sx={{display: "flex"}}>
            <IconButton onClick={onClick}>
                <AccountCircle fontSize="large" />
            </IconButton>
        </Box>
    );
};
