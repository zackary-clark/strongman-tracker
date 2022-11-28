import { MockedResponse } from "@apollo/client/testing";
import { getByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
    AddProgrammedWorkoutDocument,
    AddProgrammedWorkoutMutation,
    DayOfWeek,
    MuscleGroup,
    ProgramDocument,
    ProgramQuery
} from "../../../generated/schema";
import { PROGRAMMED_WORKOUT_ROUTE } from "../../pages/constants";
import { ProgrammedWorkoutPage } from "../../pages/ProgrammedWorkoutPage";
import { renderPage } from "../../testUtils/renderWithProviders";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
    const originalModule = jest.requireActual("react-router-dom");

    return {
        ...originalModule,
        useNavigate: () => mockNavigate
    };
});

describe("ProgrammedWorkoutsPage", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should allow adding new programmed workout", async () => {
        const programQueryMock: MockedResponse<ProgramQuery> = {
            request: {
                query: ProgramDocument,
                variables: { input: { id: "d3b2a6dd-a28f-48f8-af1f-2a5b01bea22a" } }
            },
            result: {
                data: {
                    program: {
                        __typename: "Program",
                        id: "d3b2a6dd-a28f-48f8-af1f-2a5b01bea22a",
                        name: "5x5",
                        description: null,
                        workouts: [],
                    }
                }
            }
        };

        const addProgrammedWorkoutMock: MockedResponse<AddProgrammedWorkoutMutation> = {
            request: {
                query: AddProgrammedWorkoutDocument,
                variables: {
                    input: {
                        program: "d3b2a6dd-a28f-48f8-af1f-2a5b01bea22a",
                        name: "Skipped Leg Day",
                        description: "some description",
                        day: DayOfWeek.Mon,
                        focusGroups: [MuscleGroup.Quads],
                    }
                },
            },
            result: {
                data: {
                    addProgrammedWorkout: {
                        success: true,
                        programmedWorkout: {
                            __typename: "ProgrammedWorkout",
                            id: "bf693d96-0435-46fd-8609-4917e91527a5",
                            program: "d3b2a6dd-a28f-48f8-af1f-2a5b01bea22a",
                            name: "Skipped Leg Day",
                            description: "some description",
                            day: DayOfWeek.Mon,
                            focusGroups: [MuscleGroup.Quads],
                            order: null,
                            programmedExercises: [],
                        }
                    }
                }
            }
        };

        renderPage(
            ProgrammedWorkoutPage,
            PROGRAMMED_WORKOUT_ROUTE + "/new/" + "d3b2a6dd-a28f-48f8-af1f-2a5b01bea22a",
            [programQueryMock, addProgrammedWorkoutMock],
        );

        expect(await screen.findByText("New Workout for 5x5")).toBeInTheDocument();
        expect(screen.getByLabelText("add-workout")).toBeDisabled();

        await userEvent.type(screen.getByLabelText("Name *"), "Skipped Leg Day");
        await userEvent.type(screen.getByLabelText("Description"), "some description");
        await userEvent.click(await screen.findByText("MON"));
        // eslint-disable-next-line testing-library/prefer-screen-queries
        await userEvent.click(getByRole(screen.getByTestId("focus-group-select"), "button"));
        await userEvent.click(await screen.findByText("Quads"));
        await userEvent.click(await screen.findByRole("presentation"));
        await userEvent.click(screen.getByLabelText("add-workout"));

        expect(mockNavigate).toHaveBeenCalled();
    });
});
