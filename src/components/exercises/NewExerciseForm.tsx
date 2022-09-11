import { Check } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MuscleGroup } from "../../../generated/schema";
import { useAddMyExerciseMutation } from "../../operations/exerciseOperations";
import { MY_EXERCISE_ROUTE } from "../../pages/constants";
import { ExerciseForm } from "./ExerciseForm";

export const NewExerciseForm: FunctionComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [focusGroups, setFocusGroups] = useState<MuscleGroup[]>([]);

    const saveEnabled = name?.length > 0;

    const [addMyExercise] = useAddMyExerciseMutation({
        onCompleted() {
            navigate(MY_EXERCISE_ROUTE);
        }
    });

    const handleAddClick = async () => {
        if (saveEnabled) {
            await addMyExercise({
                variables: {
                    input: {
                        name,
                        description: description === "" ? undefined : description,
                        focusGroups
                    }
                }
            });
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
                <ExerciseForm
                    headingLabel="New Exercise"
                    nameIsRequired
                    nameStateTuple={[name, setName]}
                    descriptionStateTuple={[description, setDescription]}
                    focusGroupsStateTuple={[focusGroups, setFocusGroups]}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Fab
                    aria-label="add-exercise"
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
