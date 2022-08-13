import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useProgramsQuery } from "../../operations/programOperations";
import { LoadingScreen } from "../common/LoadingScreen";
import { StandardList } from "../common/StandardList";

export const ProgramsComponent: FunctionComponent = () => {
    const navigate = useNavigate();
    const { loading, data } = useProgramsQuery();

    if (loading || !data) return <LoadingScreen />;

    return (
        <StandardList
            options={data.programs.map((program) => ({
                key: program.id,
                primary: program.name,
                secondary: program?.workouts?.map(p => p.name).join(", "),
                onClick: () => navigate(program.id),
            }))}
            showNew
            newOnClick={() => navigate("new")}
            newLabel="Add Program"
        />
    );
};
