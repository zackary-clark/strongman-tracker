import { ExpandMore } from "@mui/icons-material";
import { Box, capitalize, ListItemText, Menu, MenuItem, Theme, useMediaQuery } from "@mui/material";
import React, { FunctionComponent, MouseEvent, useState } from "react";
import { WeightUnit } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
import { useConvertWeight } from "../../hooks/useConvertWeight";
import { useChangeUserExerciseWeightUnitMutation } from "../../operations/userExerciseUnitOperations";

interface Props {
    exerciseId?: string;
}

export const WeightHeaderCell: FunctionComponent<Props> = ({exerciseId}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { unit } = useConvertWeight(exerciseId);
    const [changeWeightUnit] = useChangeUserExerciseWeightUnitMutation();

    const openSnackbar = useSnackbar();
    const isExtraSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

    if (!exerciseId) return <></>;

    const openMenu = (event: MouseEvent<HTMLDivElement>) => {
        setIsMenuOpen(!isMenuOpen);
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    const handleMenuClick = (clickedUnit: WeightUnit) => {
        changeWeightUnit({
            variables: {
                input: {
                    exercise: exerciseId,
                    weightUnit: clickedUnit,
                }
            },
            onCompleted(data) {
                if (data.changeUserExerciseWeightUnit?.success) {
                    openSnackbar("success", "Unit Changed!");
                }
                closeMenu();
            },
        });
    };

    return (
        <>
            <Box
                sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                        opacity: [0.9, 0.8, 0.7],
                        cursor: "pointer",
                    },
                }}
                onClick={openMenu}
            >
                {isExtraSmallScreen ? capitalize(unit + "s") : `Weight (${unit}s)`}
                <ExpandMore />
            </Box>
            <Menu open={isMenuOpen} onClose={closeMenu} anchorEl={anchorEl}>
                <MenuItem onClick={() => handleMenuClick(WeightUnit.Kg)}>
                    <ListItemText>
                        Kilos
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick(WeightUnit.Lb)}>
                    <ListItemText>
                        Pounds
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};
