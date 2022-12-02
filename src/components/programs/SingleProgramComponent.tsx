import { useApolloClient } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgramDocument } from "../../../generated/schema";
import { useSnackbar } from "../../context/snackbarContext";
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
    const [changeOrderLock, setChangeOrderLock] = useState(false);

    const openSnackbar = useSnackbar();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const { data: programData, loading: programLoading } = useProgramQuery(id);
    const [changeWorkoutOrder] = useChangeProgrammedWorkoutOrderMutation();

    const program = programData?.program;
    const workouts = program?.workouts ?? [];

    if (programLoading) return <LoadingScreen />;
    if (!program) return <ErrorScreen />;

    const handleArrow = async (id: string, order: "up" | "down") => {
        const originalIndex = workouts?.findIndex(w => w.id === id);

        if (
            workouts &&
            !changeOrderLock &&
            originalIndex !== undefined &&
            originalIndex >= 0 &&
            (order === "up" ? originalIndex > 0 : originalIndex < workouts.length - 1)
        ) {
            setChangeOrderLock(true);
            let shouldRefetch = false;
            let success = true;
            const offset = order === "up" ? 0 : 1;

            for (let i = 0; i <= originalIndex + offset; i++) {
                const workout = workouts[i];
                if (workout.order !== i || i >= originalIndex - 1 + offset) {
                    shouldRefetch = true;
                    if (i === originalIndex - 1 + offset) {
                        const next = workouts[i + 1];
                        const { data } = await changeWorkoutOrder({ variables: { id: next.id, order: i } });
                        success = success && !!data?.changeProgrammedWorkoutOrder?.success;
                    } else if (i === originalIndex + offset && i > 0) {
                        const prev = workouts[i - 1];
                        const { data } = await changeWorkoutOrder({ variables: { id: prev.id, order: i } });
                        success = success && !!data?.changeProgrammedWorkoutOrder?.success;
                    } else {
                        const { data } = await changeWorkoutOrder({ variables: { id: workout.id, order: i } });
                        success = success && !!data?.changeProgrammedWorkoutOrder?.success;
                    }
                }
            }

            shouldRefetch && apolloClient.refetchQueries({ include: [ProgramDocument] });

            success && openSnackbar("success", "Order Saved!");
            setChangeOrderLock(false);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <Stack sx={{ width: "100%", maxWidth: 400 }} spacing={2}>
                {editing ?
                    <ProgramForm program={program} /> :
                    <ProgramInfo program={program} onEditClick={() => setEditing(true)} />
                }
                <StandardList
                    options={workouts.map(workout => ({
                        key: workout.id,
                        primary: workout.name,
                        secondary: workout.programmedExercises?.map(ex => ex.exercise.name).join(", "),
                        onClick: () => navigate(`${PROGRAMMED_WORKOUT_ROUTE}/${workout.id}`),
                        upArrowClick: () => handleArrow(workout.id, "up"),
                        downArrowClick: () => handleArrow(workout.id, "down"),
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
