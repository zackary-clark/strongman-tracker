import { useApolloClient } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgramDocument } from "../../../generated/schema";
import { useChangeOrder } from "../../hooks/useChangeOrder";
import { useChangeProgrammedWorkoutOrderMutation } from "../../operations/programmedWorkoutOperations";
import { useProgramQuery } from "../../operations/programOperations";
import { PROGRAM_ID_PARAM, PROGRAMMED_WORKOUT_ROUTE } from "../../pages/constants";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { StandardList } from "../common/StandardList";
import { ProgramForm } from "./ProgramForm";
import { ProgramInfo } from "./ProgramInfo";

export const SingleProgramComponent: FunctionComponent = () => {
    const params = useParams();
    const id = params[PROGRAM_ID_PARAM];

    if (id === undefined) return <ErrorScreen />;

    const [editing, setEditing] = useState(false);

    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const { data: programData, loading: programLoading } = useProgramQuery(id);
    const [changeWorkoutOrder] = useChangeProgrammedWorkoutOrderMutation();

    const handleArrow = useChangeOrder(
        async (id: string, order: number) => {
            const { data } = await changeWorkoutOrder({ variables: { id, order } });
            return !!data?.changeProgrammedWorkoutOrder?.success;
        },
        () => {
            apolloClient.refetchQueries({ include: [ProgramDocument] });
        },
    );

    const program = programData?.program;
    const workouts = program?.workouts ?? [];

    if (programLoading) return <LoadingScreen />;
    if (!program) return <ErrorScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <Stack sx={{ width: "100%", maxWidth: 400 }} spacing={2}>
                {editing ?
                    <ProgramForm program={program} onCloseClick={() => setEditing(false)} /> :
                    <ProgramInfo program={program} onEditClick={() => setEditing(true)} />
                }
                <StandardList
                    options={workouts.map(workout => ({
                        key: workout.id,
                        primary: workout.name,
                        secondary: workout.programmedExercises?.map(ex => ex.exercise.name).join(", "),
                        onClick: () => navigate(`${PROGRAMMED_WORKOUT_ROUTE}/${workout.id}`),
                        upArrowClick: () => handleArrow(workouts, workout.id, "up"),
                        downArrowClick: () => handleArrow(workouts, workout.id, "down"),
                        avatarText: workout.day,
                    }))}
                    showArrowButtons
                    showNew
                    newLabel="Add Workout"
                    newOnClick={() => navigate(PROGRAMMED_WORKOUT_ROUTE + "/new/" + program.id)}
                />
            </Stack>
        </Box>
    );
};
