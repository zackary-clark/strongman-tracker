import { Box } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useChangeProgramDescriptionMutation,
    useProgramQuery,
    useRenameProgramMutation
} from "../../operations/programOperations";
import { PROGRAM_ID_PARAM } from "../../pages/constants";
import { ErrorScreen } from "../common/ErrorScreen";
import { LoadingScreen } from "../common/LoadingScreen";
import { ProgramForm } from "./ProgramForm";

export const SingleProgramComponent: FunctionComponent = () => {
    const params = useParams();
    const id = params[PROGRAM_ID_PARAM];

    if (id === undefined) return <ErrorScreen />;

    const { data, loading } = useProgramQuery(id);
    const [renameProgram] = useRenameProgramMutation();
    const [changeDescription] = useChangeProgramDescriptionMutation();
    const program = data?.program;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (program) {
            setName(program.name);
            setDescription(program.description ?? "");
        }
    }, [program]);

    if (loading) return <LoadingScreen />;
    if (!program) return <ErrorScreen />;

    const handleNameOnBlur = () => {
        if (name.length > 0) {
            renameProgram({
                variables: {
                    input: {
                        id,
                        name
                    }
                }
            });
        } else {
            setName(program.name);
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

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <ProgramForm
                headingLabel={program.name}
                nameIsRequired={false}
                nameStateTuple={[name, setName]}
                nameOnBlur={handleNameOnBlur}
                descriptionStateTuple={[description, setDescription]}
                descriptionOnBlur={handleDescriptionOnBlur}
            />
        </Box>
    );
};
