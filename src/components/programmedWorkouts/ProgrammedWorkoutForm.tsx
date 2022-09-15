import React, { FunctionComponent, useEffect, useState } from "react";
import { DayOfWeek, MuscleGroup, ProgrammedWorkout } from "../../../generated/schema";
import {
    useChangeProgrammedWorkoutDayMutation,
    useChangeProgrammedWorkoutDescriptionMutation, useChangeProgrammedWorkoutFocusGroupsMutation,
    useRenameProgrammedWorkoutMutation
} from "../../operations/programmedWorkoutOperations";
import { ProgrammedWorkoutFormBase } from "./ProgrammedWorkoutFormBase";

interface Props {
    programmedWorkout: ProgrammedWorkout,
}

export const ProgrammedWorkoutForm: FunctionComponent<Props> = ({programmedWorkout}) => {
    const [renameWorkout] = useRenameProgrammedWorkoutMutation();
    const [changeDescription] = useChangeProgrammedWorkoutDescriptionMutation();
    const [changeDay] = useChangeProgrammedWorkoutDayMutation();
    const [changeFocusGroups] = useChangeProgrammedWorkoutFocusGroupsMutation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [day, setDay] = useState<DayOfWeek | null>(null);
    const [focusGroups, setFocusGroups] = useState<MuscleGroup[]>([]);

    useEffect(() => {
        if (programmedWorkout) {
            setName(programmedWorkout.name);
            setDescription(programmedWorkout.description ?? "");
            setDay(programmedWorkout.day ?? null);
            setFocusGroups(programmedWorkout.focusGroups ?? []);
        }
    }, [programmedWorkout]);

    const handleNameOnBlur = () => {
        if (name.length > 0) {
            renameWorkout({
                variables: {
                    input: {
                        id: programmedWorkout.id,
                        name
                    }
                }
            });
        } else {
            setName(programmedWorkout.name);
        }
    };

    const handleDescriptionOnBlur = () => {
        changeDescription({
            variables: {
                input: {
                    id: programmedWorkout.id,
                    description
                }
            }
        });
    };

    const handleDayOnClick = (_: unknown, newDay: DayOfWeek | null) => {
        changeDay({
            variables: {
                input: {
                    id: programmedWorkout.id,
                    day: newDay
                }
            }
        });
    };

    const handleFocusGroupsOnClose = () => {
        changeFocusGroups({
            variables: {
                input: {
                    id: programmedWorkout.id,
                    focusGroups
                }
            }
        });
    };

    return (
        <ProgrammedWorkoutFormBase
            headingLabel={programmedWorkout.name}
            nameIsRequired={false}
            nameStateTuple={[name, setName]}
            nameOnBlur={handleNameOnBlur}
            descriptionStateTuple={[description, setDescription]}
            descriptionOnBlur={handleDescriptionOnBlur}
            dayOfWeekStateTuple={[day, setDay]}
            dayOfWeekOnClick={handleDayOnClick}
            focusGroupsStateTuple={[focusGroups, setFocusGroups]}
            focusGroupsOnClose={handleFocusGroupsOnClose}
        />
    );
};
