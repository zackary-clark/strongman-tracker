import { FitnessCenter } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ROOT_ROUTE } from "../../pages/constants";

export const Logo: FunctionComponent = () => (
    <IconButton component={Link} to={ROOT_ROUTE} aria-label="home">
        <FitnessCenter fontSize="large" />
    </IconButton>
);
