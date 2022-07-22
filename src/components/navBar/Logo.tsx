import { FitnessCenter } from "@mui/icons-material";
import React, { FunctionComponent } from "react";
import { ROOT_ROUTE } from "../../pages/constants";
import { MenuIconButton } from "./MenuButton";

export const Logo: FunctionComponent = () => (
    <MenuIconButton routeTo={ROOT_ROUTE} ariaLabel="home">
        <FitnessCenter fontSize="large" />
    </MenuIconButton>
);
