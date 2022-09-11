import { styled, Theme, ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import React, { FunctionComponent } from "react";
import { DayOfWeek } from "../../../generated/schema";

interface Props {
    dayOfWeekStateTuple: [DayOfWeek | null, React.Dispatch<React.SetStateAction<DayOfWeek | null>>],
}

export const DayOfWeekToggleButtonGroup: FunctionComponent<Props> = ({dayOfWeekStateTuple}) => {
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const [day, setDay] = dayOfWeekStateTuple;

    const handleDayOfWeek = (
        event: React.MouseEvent<HTMLElement>,
        newDay: DayOfWeek | null,
    ) => {
        setDay(newDay);
    };

    return (
        <ToggleButtonGroupFixedStyling
            value={day}
            exclusive
            fullWidth
            onChange={handleDayOfWeek}
            aria-label="day select"
        >
            {Object.values(DayOfWeek).map((day) => (
                <ToggleButton key={day} value={day} aria-label={`${day} button`}>
                    {isSmallScreen ? day[0].toUpperCase() : day.toUpperCase()}
                </ToggleButton>
            ))}
        </ToggleButtonGroupFixedStyling>
    );
};

const ToggleButtonGroupFixedStyling = styled(ToggleButtonGroup)`
  & .MuiToggleButtonGroup-grouped {
    padding-bottom: 11px;
    padding-top: 11px;
    padding-left: 0;
    padding-right: 0;
  }
`;
