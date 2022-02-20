import { FitnessCenter } from "@mui/icons-material";
import React, { FunctionComponent } from "react";
import { MenuIconButton } from "./MenuButton";

export const Logo: FunctionComponent = () => (
    <MenuIconButton routeTo="/" ariaLabel="home">
        <FitnessCenter fontSize="large" />
    </MenuIconButton>
);
