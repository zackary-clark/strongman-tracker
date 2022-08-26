import { Box, Stack } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { useProgramQuery } from "../../operations/programOperations";
import { PROGRAM_ID_PARAM } from "../../pages/constants";
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
    const { data: programData, loading: programLoading } = useProgramQuery(id);
    const program = programData?.program;
    const workouts = program?.workouts;

    if (programLoading) return <LoadingScreen />;
    if (!program) return <ErrorScreen />;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <Stack sx={{ width: "100%", maxWidth: 400 }} spacing={2}>
                {editing ?
                    <ProgramForm program={program} /> :
                    <ProgramInfo program={program} onEditClick={() => setEditing(true)} />
                }
                {workouts && (
                    <StandardList
                        options={workouts.map(workout => ({
                            key: workout.id,
                            primary: workout.name,
                            secondary: "Exercise 1, Exercise 2",
                        }))}
                    />
                )}
            </Stack>
        </Box>
    );
};
