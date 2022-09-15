import { Check } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DayOfWeek, MuscleGroup, ProgramDocument } from "../../../generated/schema";
import { useAddProgrammedWorkoutMutation } from "../../operations/programmedWorkoutOperations";
import { useProgramQuery } from "../../operations/programOperations";
import { PROGRAM_ID_PARAM, PROGRAM_ROUTE } from "../../pages/constants";
import { ErrorScreen } from "../common/ErrorScreen";
import { ProgrammedWorkoutFormBase } from "./ProgrammedWorkoutFormBase";

export const NewProgrammedWorkout: FunctionComponent = () => {
    const params = useParams();
    const programId = params[PROGRAM_ID_PARAM];

    if (!programId) return <ErrorScreen />;

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [day, setDay] = useState<DayOfWeek | null>(null);
    const [focusGroups, setFocusGroups] = useState<MuscleGroup[]>([]);

    const { data: programData } = useProgramQuery(programId);
    const programName = programData?.program?.name;

    const saveEnabled = name?.length > 0;

    const [addProgrammedWorkout] = useAddProgrammedWorkoutMutation({
        onCompleted() {
            navigate(PROGRAM_ROUTE + "/" + programId);
        },
        refetchQueries: [{ query: ProgramDocument, variables: { input: { id: programId } } }],
    });

    const handleAddClick = async () => {
        if (saveEnabled) {
            await addProgrammedWorkout({
                variables: {
                    input: {
                        program: programId,
                        name,
                        description: description === "" ? undefined : description,
                        day,
                        focusGroups,
                    }
                }
            });
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
                <ProgrammedWorkoutFormBase
                    headingLabel={`New Workout${programName && ` for ${programName}`}`}
                    nameIsRequired
                    nameStateTuple={[name, setName]}
                    descriptionStateTuple={[description, setDescription]}
                    dayOfWeekStateTuple={[day, setDay]}
                    focusGroupsStateTuple={[focusGroups, setFocusGroups]}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Fab
                    aria-label="add-workout"
                    color="secondary"
                    onClick={handleAddClick}
                    disabled={!saveEnabled}
                >
                    <Check />
                </Fab>
            </Box>
        </>
    );
};
