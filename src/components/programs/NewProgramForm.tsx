import { Check } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProgramMutation } from "../../operations/programOperations";
import { PROGRAM_ROUTE } from "../../pages/constants";
import { ProgramForm } from "./ProgramForm";

export const NewProgramForm: FunctionComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const saveEnabled = name?.length > 0;

    const [addProgram] = useAddProgramMutation({
        onCompleted() {
            navigate(PROGRAM_ROUTE);
        }
    });

    const handleAddClick = async () => {
        if (saveEnabled) {
            await addProgram({
                variables: {
                    input: {
                        name,
                        description: description === "" ? undefined : description,
                    }
                }
            });
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
                <ProgramForm
                    headingLabel="New Program"
                    nameIsRequired
                    nameStateTuple={[name, setName]}
                    descriptionStateTuple={[description, setDescription]}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Fab
                    aria-label="add-program"
                    color="success"
                    onClick={handleAddClick}
                    disabled={!saveEnabled}
                >
                    <Check />
                </Fab>
            </Box>
        </>
    );
};
