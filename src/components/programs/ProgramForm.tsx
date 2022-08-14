import React, { FunctionComponent, useEffect, useState } from "react";
import { Program } from "../../../generated/schema";
import { useChangeProgramDescriptionMutation, useRenameProgramMutation } from "../../operations/programOperations";
import { ProgramFormBase } from "./ProgramFormBase";

interface Props {
    program: Program,
}

export const ProgramForm: FunctionComponent<Props> = ({ program }) => {
    const [renameProgram] = useRenameProgramMutation();
    const [changeDescription] = useChangeProgramDescriptionMutation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (program) {
            setName(program.name);
            setDescription(program.description ?? "");
        }
    }, [program]);

    const handleNameOnBlur = () => {
        if (name.length > 0) {
            renameProgram({
                variables: {
                    input: {
                        id: program.id,
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
                    id: program.id,
                    description
                }
            }
        });
    };

    return (
        <ProgramFormBase
            headingLabel={program.name}
            nameIsRequired={false}
            nameStateTuple={[name, setName]}
            nameOnBlur={handleNameOnBlur}
            descriptionStateTuple={[description, setDescription]}
            descriptionOnBlur={handleDescriptionOnBlur}
        />
    );
};
