import { MockedResponse } from "@apollo/client/testing";
import { getByRole, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import {
    AddMyExerciseDocument,
    AddMyExerciseMutation,
    ChangeExerciseDescriptionDocument,
    ChangeExerciseDescriptionMutation,
    ChangeExerciseFocusGroupsDocument,
    ChangeExerciseFocusGroupsMutation,
    Exercise,
    ExerciseDocument,
    ExerciseQuery,
    MuscleGroup,
    MyExercisesDocument,
    MyExercisesQuery,
    RenameExerciseDocument,
    RenameExerciseMutation
} from "../../../generated/schema";
import { MY_EXERCISE_ROUTE } from "../../pages/constants";
import { MyExercisePage } from "../../pages/MyExercisePage";
import { renderPage, renderWithRouterAndApollo } from "../../testUtils/renderWithProviders";
import { triggerAsync } from "../../testUtils/triggerAsync";
import { MyExercisesComponent } from "./MyExercisesComponent";

describe("MyExercisesPage", () => {
    const superCoolCustomExercise: Exercise = {
        __typename: "Exercise",
        id: "af0be2e2-aa3a-42eb-aaac-295f309e3347",
        name: "super cool custom exercise",
        description: "it's a description of how cool that exercise is",
        focusGroups: [MuscleGroup.Biceps]
    };
    const myExercisesQueryMock: MockedResponse<MyExercisesQuery> = {
        request: {
            query: MyExercisesDocument
        },
        result: {
            data: {
                exercises: [
                    superCoolCustomExercise,
                    {
                        __typename: "Exercise",
                        id: "9d019e2b-1775-40a7-b090-80c8d0873c88",
                        name: "Another Cool Exercise",
                        description: null,
                        focusGroups: []
                    }
                ]
            }
        }
    };

    it("should list custom exercises", async () => {
        renderWithRouterAndApollo(<MyExercisesComponent />, [myExercisesQueryMock]);

        expect(await screen.findByText("super cool custom exercise")).toBeInTheDocument();
        expect(screen.getByText("Biceps"));

        expect(screen.getByText("Another Cool Exercise"));
    });

    it("should allow adding new custom exercises", async () => {
        const addMyExerciseMutationMock: MockedResponse<AddMyExerciseMutation> = {
            request: {
                query: AddMyExerciseDocument,
                variables: {
                    input: {
                        name: "New and Different Press",
                        description: "super cool description",
                        focusGroups: [MuscleGroup.Shoulders]
                    }
                }
            },
            result: {
                data: {
                    addExercise: {
                        success: true,
                        exercise: {
                            __typename: "Exercise",
                            id: "2fb4c0ed-b0e1-4d19-8c24-f79cf5f1d56d",
                            name: "New and Different Press",
                            description: "super cool description",
                            focusGroups: [MuscleGroup.Shoulders]
                        }
                    }
                }
            }
        };

        const user = userEvent.setup();
        renderPage(MyExercisePage, MY_EXERCISE_ROUTE, [myExercisesQueryMock, addMyExerciseMutationMock, myExercisesQueryMock, myExercisesQueryMock]);

        expect(await screen.findByText("super cool custom exercise")).toBeInTheDocument();
        await user.click(screen.getByText("Add Custom Exercise"));

        expect(await screen.findByText("New Exercise")).toBeInTheDocument();
        expect(screen.getByLabelText("add-exercise")).toBeDisabled();
        await user.type(screen.getByLabelText("Name *"), "New and Different Press");
        await user.type(screen.getByLabelText("Description"), "super cool description");
        // eslint-disable-next-line testing-library/prefer-screen-queries
        await user.click(getByRole(screen.getByTestId("focus-group-select"), "button"));
        await user.click(await screen.findByText("Shoulders"));
        await user.click(await screen.findByRole("presentation"));

        await user.click(screen.getByLabelText("add-exercise"));

        expect(await screen.findByText("super cool custom exercise")).toBeInTheDocument();
    });

    describe("when editing", () => {
        const exerciseQueryMock: MockedResponse<ExerciseQuery> = {
            request: {
                query: ExerciseDocument,
                variables: { input: { id: superCoolCustomExercise.id } }
            },
            result: {
                data: {
                    exercise: superCoolCustomExercise
                }
            }
        };

        it("should display exercise details on click", async () => {
            renderPage(MyExercisePage, MY_EXERCISE_ROUTE, [myExercisesQueryMock, exerciseQueryMock]);

            expect(await screen.findByText(superCoolCustomExercise.name)).toBeInTheDocument();
            await userEvent.click(screen.getByRole("button", {name: "super cool custom exercise Biceps"}));

            expect(await screen.findByLabelText("Description")).toBeInTheDocument();
            expect(await screen.findByText(superCoolCustomExercise.name)).toBeInTheDocument();

            await waitFor(() => expect(screen.getByLabelText("Name")).toHaveValue(superCoolCustomExercise.name));
            expect(screen.getByLabelText("Description")).toHaveValue(superCoolCustomExercise.description);
            expect(screen.getByText("Biceps")).toBeInTheDocument();
        });

        it("should edit name on blur when not empty", async () => {
            const renameExerciseMock: MockedResponse<RenameExerciseMutation> = {
                request: {
                    query: RenameExerciseDocument,
                    variables: {
                        input: {
                            id: superCoolCustomExercise.id,
                            name: "new name"
                        }
                    }
                },
                result: {
                    data: {
                        renameExercise: {
                            exercise: {
                                ...superCoolCustomExercise,
                                name: "new name"
                            }
                        }
                    }
                }
            };

            const user = userEvent.setup();
            renderPage(MyExercisePage, `${MY_EXERCISE_ROUTE}/${superCoolCustomExercise.id}`, [exerciseQueryMock, renameExerciseMock]);

            expect(await screen.findByText(superCoolCustomExercise.name)).toBeInTheDocument();

            await waitFor(() => expect(screen.getByLabelText("Name")).toHaveValue(superCoolCustomExercise.name));

            await user.clear(screen.getByLabelText("Name"));
            await user.click(screen.getByText(superCoolCustomExercise.name));

            expect(screen.getByLabelText("Name")).toHaveValue(superCoolCustomExercise.name);

            await user.clear(screen.getByLabelText("Name"));
            await user.type(screen.getByLabelText("Name"), "new name");
            await user.click(screen.getByText(superCoolCustomExercise.name));

            await triggerAsync();

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
        });

        it("should edit description on blur", async () => {
            const changeExerciseDescriptionMock: MockedResponse<ChangeExerciseDescriptionMutation> = {
                request: {
                    query: ChangeExerciseDescriptionDocument,
                    variables: {
                        input: {
                            id: superCoolCustomExercise.id,
                            description: "new description"
                        }
                    }
                },
                result: {
                    data: {
                        changeExerciseDescription: {
                            exercise: {
                                ...superCoolCustomExercise,
                                description: "new description"
                            }
                        }
                    }
                }
            };

            const user = userEvent.setup();
            renderPage(MyExercisePage, `${MY_EXERCISE_ROUTE}/${superCoolCustomExercise.id}`, [exerciseQueryMock, changeExerciseDescriptionMock]);

            expect(await screen.findByText(superCoolCustomExercise.name)).toBeInTheDocument();

            await user.clear(screen.getByLabelText("Description"));
            await user.type(screen.getByLabelText("Description"), "new description{tab}");

            await triggerAsync();

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
        });

        it("should edit focus groups on blur", async () => {
            const changeExerciseFocusGroupsMock: MockedResponse<ChangeExerciseFocusGroupsMutation> = {
                request: {
                    query: ChangeExerciseFocusGroupsDocument,
                    variables: {
                        input: {
                            id: superCoolCustomExercise.id,
                            focusGroups: [MuscleGroup.Biceps, MuscleGroup.Hamstrings, MuscleGroup.Abs]
                        }
                    }
                },
                result: {
                    data: {
                        changeExerciseFocusGroup: {
                            exercise: {
                                ...superCoolCustomExercise,
                                focusGroups: [MuscleGroup.Biceps, MuscleGroup.Hamstrings, MuscleGroup.Abs]
                            }
                        }
                    }
                }
            };

            const user = userEvent.setup();
            renderPage(MyExercisePage, `${MY_EXERCISE_ROUTE}/${superCoolCustomExercise.id}`, [exerciseQueryMock, changeExerciseFocusGroupsMock]);

            expect(await screen.findByText(superCoolCustomExercise.name)).toBeInTheDocument();

            // eslint-disable-next-line testing-library/prefer-screen-queries
            await user.click(getByRole(screen.getByTestId("focus-group-select"), "button"));
            await user.click(await screen.findByText("Hamstrings"));
            await user.click(await screen.findByText("Abs"));
            await user.click(await screen.findByRole("presentation"));

            await triggerAsync();

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
        });
    });
});
