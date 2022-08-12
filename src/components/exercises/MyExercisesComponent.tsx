import { capitalize } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useMyExercisesQuery } from "../../operations/exerciseOperations";
import { LoadingScreen } from "../common/LoadingScreen";
import { StandardList } from "../common/StandardList";

export const MyExercisesComponent: FunctionComponent = () => {
    const navigate = useNavigate();
    const { loading, data } = useMyExercisesQuery();

    if (loading || !data) return <LoadingScreen />;

    return (
        <StandardList
            options={data.exercises.map(exercise => ({
                key: exercise.id,
                primary: exercise.name,
                secondary: exercise.focusGroups.map(e => capitalize(e)).join(", "),
                onClick: () => navigate(exercise.id),
            }))}
            showNew
            newLabel="Add Custom Exercise"
            newOnClick={() => navigate("new")}
        />
    );
};
