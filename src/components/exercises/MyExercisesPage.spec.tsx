import { MockedResponse } from "@apollo/client/testing";
import { getByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
    AddMyExerciseDocument,
    AddMyExerciseMutation,
    MuscleGroup,
    MyExercisesDocument,
    MyExercisesQuery
} from "../../../generated/schema";
import { MY_EXERCISE_ROUTE } from "../../pages/constants";
import { MyExercisePage } from "../../pages/MyExercisePage";
import { renderPage, renderWithRouterAndApollo } from "../../testUtils/renderWithProviders";
import { MyExercisesComponent } from "./MyExercisesComponent";

describe("MyExercisesPage", () => {
    const myExercisesQueryMock: MockedResponse<MyExercisesQuery> = {
        request: {
            query: MyExercisesDocument
        },
        result: {
            data: {
                exercises: [
                    {
                        id: "af0be2e2-aa3a-42eb-aaac-295f309e3347",
                        name: "super cool custom exercise",
                        description: "it's a description of how cool that exercise is",
                        focusGroups: [MuscleGroup.Biceps]
                    },
                    {
                        id: "9d019e2b-1775-40a7-b090-80c8d0873c88",
                        name: "Another Cool Exercise",
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
                            id: "2fb4c0ed-b0e1-4d19-8c24-f79cf5f1d56d",
                            name: "New and Different Press",
                            description: "super cool description",
                            focusGroups: [MuscleGroup.Shoulders]
                        }
                    }
                }
            }
        };


        renderPage(MyExercisePage, MY_EXERCISE_ROUTE, [myExercisesQueryMock, addMyExerciseMutationMock, myExercisesQueryMock, myExercisesQueryMock]);

        expect(await screen.findByText("super cool custom exercise")).toBeInTheDocument();
        screen.getByText("Add Custom Exercise").click();

        expect(await screen.findByText("New Exercise")).toBeInTheDocument();
        expect(screen.getByLabelText("add-exercise")).toBeDisabled();
        await userEvent.type(screen.getByLabelText("Name *"), "New and Different Press");
        await userEvent.type(screen.getByLabelText("Description"), "super cool description");
        // eslint-disable-next-line testing-library/prefer-screen-queries
        await userEvent.click(getByRole(screen.getByTestId("focus-group-select"), "button"));
        (await screen.findByText("Shoulders")).click();
        (await screen.findByRole("presentation")).click();

        screen.getByLabelText("add-exercise").click();

        expect(await screen.findByText("super cool custom exercise")).toBeInTheDocument();
    });
});
