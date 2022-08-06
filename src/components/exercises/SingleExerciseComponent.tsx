import { Box } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MuscleGroup } from "../../../generated/schema";
import {
    useChangeExerciseDescriptionMutation,
    useChangeExerciseFocusGroupsMutation,
    useExerciseQuery,
    useRenameExerciseMutation
} from "../../operations/exerciseOperations";
import { EXERCISE_ID_PARAM } from "../../pages/constants";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { ExerciseForm } from "./ExerciseForm";

export const SingleExerciseComponent: FunctionComponent = () => {
    const params = useParams();
    const id = params[EXERCISE_ID_PARAM];

    if (id === undefined) return <ErrorScreen />;

    const { data, loading } = useExerciseQuery(id);
    const [renameExercise] = useRenameExerciseMutation();
    const [changeDescription] = useChangeExerciseDescriptionMutation();
    const [changeFocusGroups] = useChangeExerciseFocusGroupsMutation();
    const exercise = data?.exercise;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [focusGroups, setFocusGroups] = useState<MuscleGroup[]>([]);

    useEffect(() => {
        if (exercise) {
            setName(exercise.name);
            setDescription(exercise.description ?? "");
            setFocusGroups(exercise.focusGroups);
        }
    }, [exercise]);

    if (loading) return <LoadingScreen />;
    if (!exercise) return <ErrorScreen />;

    const handleNameOnBlur = () => {
        if (name.length > 0) {
            renameExercise({
                variables: {
                    input: {
                        id,
                        name
                    }
                }
            });
        } else {
            setName(exercise.name);
        }
    };

    const handleDescriptionOnBlur = () => {
        changeDescription({
            variables: {
                input: {
                    id,
                    description
                }
            }
        });
    };

    const handleFocusGroupsOnClose = () => {
        changeFocusGroups({
            variables: {
                input: {
                    id,
                    focusGroups
                }
            }
        });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <ExerciseForm
                headingLabel={exercise.name}
                nameIsRequired={false}
                nameStateTuple={[name, setName]}
                nameOnBlur={handleNameOnBlur}
                descriptionStateTuple={[description, setDescription]}
                descriptionOnBlur={handleDescriptionOnBlur}
                focusGroupsStateTuple={[focusGroups, setFocusGroups]}
                focusGroupsOnClose={handleFocusGroupsOnClose}
            />
        </Box>
    );
};
