import { Box, Stack } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { useProgrammedWorkoutQuery } from "../../operations/programmedWorkoutOperations";
import { PROGRAMMED_WORKOUT_ID_PARAM } from "../../pages/constants";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { ProgrammedWorkoutForm } from "./ProgrammedWorkoutForm";
import { ProgrammedWorkoutInfo } from "./ProgrammedWorkoutInfo";

export const SingleWorkoutComponent: FunctionComponent = () => {
    const params = useParams();
    const id = params[PROGRAMMED_WORKOUT_ID_PARAM];

    if (id === undefined) return <ErrorScreen />;

    const [editing, setEditing] = useState(false);
    const { data, loading } = useProgrammedWorkoutQuery(id);
    const workout = data?.programmedWorkout;

    if (loading) return <LoadingScreen />;
    if (!workout) return <ErrorScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <Stack sx={{ width: "100%", maxWidth: 400 }} spacing={2}>
                {editing ?
                    <ProgrammedWorkoutForm programmedWorkout={workout} /> :
                    <ProgrammedWorkoutInfo programmedWorkout={workout} onEditClick={() => setEditing(true)} />
                }
            </Stack>
        </Box>
    );
};
