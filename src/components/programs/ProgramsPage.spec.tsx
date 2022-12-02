import { MockedResponse } from "@apollo/client/testing";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "react";
import {
    AddProgramDocument,
    AddProgramMutation,
    ChangeProgramDescriptionDocument,
    ChangeProgramDescriptionMutation,
    ChangeProgrammedWorkoutOrderDocument,
    ChangeProgrammedWorkoutOrderMutation,
    Program,
    ProgramDocument,
    ProgrammedWorkout,
    ProgramQuery,
    ProgramsDocument,
    ProgramsQuery,
    RenameProgramDocument,
    RenameProgramMutation,
} from "../../../generated/schema";
import { PROGRAM_ROUTE } from "../../pages/constants";
import { ProgramPage } from "../../pages/ProgramPage";
import { renderPage } from "../../testUtils/renderWithProviders";
import { triggerAsync } from "../../testUtils/triggerAsync";

describe("ProgramsPage", () => {
    const heavySquatDay: ProgrammedWorkout = {
        __typename: "ProgrammedWorkout",
        id: "cdeabc05-1158-4534-93a8-57e2e3a138a9",
        program: "9763dc8e-0aa5-4af3-b287-6f65072de666",
        name: "Heavy Squat Day",
        description: null,
        focusGroups: null,
        day: null,
        order: 0,
        programmedExercises: [],
    };
    const benchDay: ProgrammedWorkout = {
        __typename: "ProgrammedWorkout",
        id: "63eccdce-baa4-4b64-bfc1-45d485991801",
        program: "9763dc8e-0aa5-4af3-b287-6f65072de666",
        name: "Bench Day",
        description: null,
        focusGroups: null,
        day: null,
        order: 1,
        programmedExercises: [],
    };
    const cardioDay: ProgrammedWorkout = {
        __typename: "ProgrammedWorkout",
        id: "1e116b64-182e-4b42-9f8a-73fff85fdd61",
        program: "9763dc8e-0aa5-4af3-b287-6f65072de666",
        name: "Cardio Day",
        description: null,
        focusGroups: null,
        day: null,
        order: 2,
        programmedExercises: [],
    };
    const superHardProgram: Program = {
        __typename: "Program",
        id: "9763dc8e-0aa5-4af3-b287-6f65072de666",
        name: "Super Hard Program",
        description: "What a hard program.",
        workouts: [
            heavySquatDay,
            benchDay,
            cardioDay,
        ],
    };

    const programsQueryMock: MockedResponse<ProgramsQuery> = {
        request: {
            query: ProgramsDocument,
        },
        result: {
            data: {
                programs: [
                    superHardProgram,
                    {
                        __typename: "Program",
                        id: "e26d55d7-0a92-40dc-a4c0-091446d84a1d",
                        name: "A Different Program than the other one",
                        description: null,
                        workouts: [],
                    }
                ]
            }
        }
    };

    it("should list programs", async () => {
        renderPage(ProgramPage, PROGRAM_ROUTE, [programsQueryMock]);

        expect(await screen.findByText("Super Hard Program")).toBeInTheDocument();
        expect(screen.getByText("Heavy Squat Day, Bench Day, Cardio Day"));

        expect(screen.getByText("A Different Program than the other one")).toBeInTheDocument();
    });

    it("should allow adding new programs", async () => {
        const addProgramMutationMock: MockedResponse<AddProgramMutation> = {
            request: {
                query: AddProgramDocument,
                variables: {
                    input: {
                        name: "Some New Program",
                        description: "with a description",
                    }
                }
            },
            result: {
                data: {
                    addProgram: {
                        success: true,
                        program: {
                            __typename: "Program",
                            id: "449989e7-a9a6-437e-bd8c-cec3d53a9cc4",
                            name: "Some New Program",
                            description: "with a description",
                            workouts: [],
                        }
                    }
                }
            }
        };

        renderPage(ProgramPage, PROGRAM_ROUTE, [programsQueryMock, addProgramMutationMock, programsQueryMock, programsQueryMock]);

        expect(await screen.findByText("Super Hard Program")).toBeInTheDocument();
        await userEvent.click(screen.getByText("Add Program"));

        expect(await screen.findByText("New Program")).toBeInTheDocument();
        expect(screen.getByLabelText("add-program")).toBeDisabled();
        await userEvent.type(screen.getByLabelText("Name *"), "Some New Program");
        await userEvent.type(screen.getByLabelText("Description"), "with a description");

        await userEvent.click(screen.getByLabelText("add-program"));

        expect(await screen.findByText("Super Hard Program")).toBeInTheDocument();
    });

    describe("when editing", () => {
        const programQueryMock: MockedResponse<ProgramQuery> = {
            request: {
                query: ProgramDocument,
                variables: { input: { id: superHardProgram.id } }
            },
            result: {
                data: {
                    program: superHardProgram
                }
            }
        };

        it("should display program details on click", async () => {
            renderPage(ProgramPage, PROGRAM_ROUTE, [programsQueryMock, programQueryMock]);

            expect(await screen.findByText(superHardProgram.name)).toBeInTheDocument();
            await userEvent.click(
                screen.getByRole(
                    "button",
                    {name: "Super Hard Program Heavy Squat Day, Bench Day, Cardio Day"}
                )
            );

            expect(await screen.findByText("What a hard program.")).toBeInTheDocument();
            expect(await screen.findByText("Super Hard Program")).toBeInTheDocument();
        });

        describe("when reordering workouts", () => {
            it("should display workout list", async () => {
                renderPage(
                    ProgramPage,
                    PROGRAM_ROUTE + "/" + superHardProgram.id,
                    [programQueryMock]
                );

                expect(await screen.findByText("Heavy Squat Day")).toBeInTheDocument();
                expect(screen.getByText("Bench Day")).toBeInTheDocument();
                expect(screen.getByText("Cardio Day")).toBeInTheDocument();
            });

            it("should handle swapping order of two workouts", async () => {
                const firstChangeWorkoutOrderMock = generateChangeWorkoutOrderMock(cardioDay, 1);
                const secondChangeWorkoutOrderMock = generateChangeWorkoutOrderMock(benchDay, 2);
                const secondProgramQueryMock: MockedResponse<ProgramQuery> = {
                    request: {
                        query: ProgramDocument,
                        variables: { input: { id: superHardProgram.id } }
                    },
                    result: {
                        data: {
                            program: {
                                ...superHardProgram,
                                workouts: [
                                    heavySquatDay,
                                    {...cardioDay, order: 1},
                                    {...benchDay, order: 2},
                                ]
                            }
                        }
                    }
                };
                const thirdChangeWorkoutOrderMock = generateChangeWorkoutOrderMock(benchDay, 1);
                const fourthChangeWorkoutOrderMock = generateChangeWorkoutOrderMock(cardioDay, 2);

                renderPage(
                    ProgramPage,
                    PROGRAM_ROUTE + "/" + superHardProgram.id,
                    [
                        programQueryMock,
                        firstChangeWorkoutOrderMock,
                        secondChangeWorkoutOrderMock,
                        secondProgramQueryMock,
                        thirdChangeWorkoutOrderMock,
                        fourthChangeWorkoutOrderMock,
                    ],
                );

                expect(await screen.findByText("Heavy Squat Day")).toBeInTheDocument();

                await userEvent.click(screen.getByLabelText("up button for 1e116b64-182e-4b42-9f8a-73fff85fdd61"));

                expect(await screen.findByText("Order Saved!")).toBeInTheDocument();
                await waitForElementToBeRemoved(() => screen.queryByText("Order Saved!"));

                await userEvent.click(screen.getByLabelText("down button for 1e116b64-182e-4b42-9f8a-73fff85fdd61"));

                expect(await screen.findByText("Order Saved!")).toBeInTheDocument();
            });

            it("should do nothing when moving first workout up", async () => {
                renderPage(ProgramPage, PROGRAM_ROUTE + "/" + superHardProgram.id, [programQueryMock]);

                expect(await screen.findByText("Heavy Squat Day")).toBeInTheDocument();

                await userEvent.click(screen.getByLabelText("up button for cdeabc05-1158-4534-93a8-57e2e3a138a9"));

                await triggerAsync();

                expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
            });

            it("should do nothing when moving last workout down", async () => {
                renderPage(ProgramPage, PROGRAM_ROUTE + "/" + superHardProgram.id, [programQueryMock]);

                expect(await screen.findByText("Heavy Squat Day")).toBeInTheDocument();

                await userEvent.click(screen.getByLabelText("down button for 1e116b64-182e-4b42-9f8a-73fff85fdd61"));

                await triggerAsync();

                expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
            });

            it("should handle moving workouts when they don't have orders", async () => {
                const deadliftDay: ProgrammedWorkout = {
                    __typename: "ProgrammedWorkout",
                    id: "5af4b81f-62cf-49be-b2f1-ed605f52d750",
                    program: "3f578d2b-7f96-4faf-931f-2720d56e6914¨",
                    name: "Deadlift Day",
                    description: null,
                    focusGroups: null,
                    day: null,
                    order: null,
                    programmedExercises: [],
                };
                const differentDay: ProgrammedWorkout = {
                    __typename: "ProgrammedWorkout",
                    id: "c610c30a-495f-4f2b-a604-b1e25dd21dba",
                    program: "3f578d2b-7f96-4faf-931f-2720d56e6914¨",
                    name: "Different Day",
                    description: null,
                    focusGroups: null,
                    day: null,
                    order: null,
                    programmedExercises: [],
                };
                const otherDay: ProgrammedWorkout = {
                    __typename: "ProgrammedWorkout",
                    id: "cb4f6265-4fb7-4db1-844e-abbe78ba4f16",
                    program: "3f578d2b-7f96-4faf-931f-2720d56e6914¨",
                    name: "Other Day",
                    description: null,
                    focusGroups: null,
                    day: null,
                    order: null,
                    programmedExercises: [],
                };
                const pressDay: ProgrammedWorkout = {
                    __typename: "ProgrammedWorkout",
                    id: "e3063dd8-111a-45f2-83ac-6a59c56bd840",
                    program: "3f578d2b-7f96-4faf-931f-2720d56e6914¨",
                    name: "Press Day",
                    description: null,
                    focusGroups: null,
                    day: null,
                    order: null,
                    programmedExercises: [],
                };
                const easyProgram: Program = {
                    __typename: "Program",
                    id: "3f578d2b-7f96-4faf-931f-2720d56e6914¨",
                    name: "Easy Program",
                    description: "This things a joke",
                    workouts: [
                        deadliftDay,
                        differentDay,
                        otherDay,
                        pressDay,
                    ],
                };

                const easyProgramQueryMock: MockedResponse<ProgramQuery> = {
                    request: {
                        query: ProgramDocument,
                        variables: { input: { id: easyProgram.id } }
                    },
                    result: {
                        data: {
                            program: easyProgram
                        }
                    }
                };
                const orderMock0 = generateChangeWorkoutOrderMock(deadliftDay, 0);
                const orderMock1 = generateChangeWorkoutOrderMock(differentDay, 1);
                const orderMock2 = generateChangeWorkoutOrderMock(pressDay, 2);
                const orderMock3 = generateChangeWorkoutOrderMock(otherDay, 3);

                renderPage(
                    ProgramPage,
                    PROGRAM_ROUTE + "/" + easyProgram.id,
                    [easyProgramQueryMock, orderMock0, orderMock1, orderMock2, orderMock3]
                );

                expect(await screen.findByText("Deadlift Day")).toBeInTheDocument();

                await userEvent.click(screen.getByLabelText("down button for cb4f6265-4fb7-4db1-844e-abbe78ba4f16"));

                expect(await screen.findByText("Order Saved!")).toBeInTheDocument();
            });
        });

        it("should edit name on blur", async () => {
            const renameProgramMock: MockedResponse<RenameProgramMutation> = {
                request: {
                    query: RenameProgramDocument,
                    variables: {
                        input: {
                            id: superHardProgram.id,
                            name: "new name"
                        }
                    }
                },
                result: {
                    data: {
                        renameProgram: {
                            program: {
                                ...superHardProgram,
                                name: "new name"
                            },
                            success: true,
                        }
                    }
                }
            };

            renderPage(
                ProgramPage,
                `${PROGRAM_ROUTE}/${superHardProgram.id}`,
                [programQueryMock, renameProgramMock, programQueryMock]
            );

            expect(await screen.findByText(superHardProgram.name)).toBeInTheDocument();

            await userEvent.click(screen.getByLabelText("edit program details"));

            await waitFor(() => expect(screen.getByLabelText("Name")).toHaveValue(superHardProgram.name));

            await userEvent.clear(screen.getByLabelText("Name"));
            await userEvent.click(screen.getByText(superHardProgram.name));

            expect(screen.getByLabelText("Name")).toHaveValue(superHardProgram.name);

            await userEvent.clear(screen.getByLabelText("Name"));
            await userEvent.type(screen.getByLabelText("Name"), "new name");
            await userEvent.click(screen.getByText(superHardProgram.name));

            await triggerAsync();

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();

            await userEvent.click(screen.getByLabelText("close"));

            expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
        });

        it("should edit description on blur", async () => {
            const changeProgramDescriptionMock: MockedResponse<ChangeProgramDescriptionMutation> = {
                request: {
                    query: ChangeProgramDescriptionDocument,
                    variables: {
                        input: {
                            id: superHardProgram.id,
                            description: "new description"
                        }
                    }
                },
                result: {
                    data: {
                        changeProgramDescription: {
                            program: {
                                ...superHardProgram,
                                description: "new description"
                            },
                            success: true
                        }
                    }
                }
            };

            renderPage(
                ProgramPage,
                `${PROGRAM_ROUTE}/${superHardProgram.id}`,
                [programQueryMock, changeProgramDescriptionMock, programQueryMock]
            );

            await userEvent.click(await screen.findByLabelText("edit program details"));

            await waitFor(() => expect(screen.getByLabelText("Name")).toHaveValue(superHardProgram.name));

            await userEvent.clear(screen.getByLabelText("Description"));
            await userEvent.type(screen.getByLabelText("Description"), "new description{tab}");

            await triggerAsync();

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
        });
    });
});

const generateChangeWorkoutOrderMock = (workout: ProgrammedWorkout, order?: number): MockedResponse<ChangeProgrammedWorkoutOrderMutation> => {
    return {
        request: {
            query: ChangeProgrammedWorkoutOrderDocument,
            variables: {id: workout.id, order }
        },
        result: {
            data: {
                changeProgrammedWorkoutOrder: {
                    success: true,
                    programmedWorkout: {
                        __typename: "ProgrammedWorkout",
                        id: workout.id,
                        program: workout.program,
                        name: workout.name,
                        description: workout.description,
                        focusGroups: workout.focusGroups,
                        day: workout.day,
                        order: order ? order : workout.order,
                        programmedExercises: [],
                    }
                }
            }
        }
    };
};
