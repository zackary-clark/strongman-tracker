import { MockedResponse } from "@apollo/client/testing";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import {
    AddLiftDocument,
    AddLiftMutation,
    AddWorkoutDocument,
    AddWorkoutMutation,
    AllWorkoutsDocument,
    AllWorkoutsQuery,
    OneWorkoutDocument,
    OneWorkoutQuery,
    Workout
} from "../../generated/schema";
import { WorkoutList } from "../../src/components/workouts/WorkoutList";
import { WORKOUT_ROUTE } from "../../src/pages/constants";
import { WorkoutPage } from "../../src/pages/WorkoutPage";
import { renderPage, renderWithAllProviders, renderWithRouterAndApollo } from "../testUtils";

describe("Workout Page", () => {
    const allWorkoutsQueryMock: MockedResponse<AllWorkoutsQuery> = {
        request: {
            query: AllWorkoutsDocument
        },
        result: {
            data: {
                workouts: [
                    {
                        id: 1,
                        date: "2022-04-03",
                        lifts: [
                            {
                                id: 1,
                                name: "bench press",
                                reps: 5,
                                sets: 5,
                                weight: 135
                            },
                            {
                                id: 2,
                                name: "squat",
                                reps: 10,
                                sets: 3,
                                weight: 225
                            }
                        ]
                    },
                    {
                        id: 2,
                        date: "2022-03-30",
                        lifts: []
                    },
                    {
                        id: 3,
                        date: "2022-04-01",
                        lifts: []
                    },
                ]
            }
        }
    };

    describe("Workout List", () => {
        it("should show snackbar when AllWorkoutsQuery fails due to network error", async () => {
            const mocks: MockedResponse[] = [
                {
                    request: {
                        query: AllWorkoutsDocument
                    },
                    error: new Error("An error occurred")
                }
            ];
            renderWithAllProviders(<WorkoutList />, mocks);

            expect(await screen.findByText("Network Error!")).toBeInTheDocument();
        });
        it("should display one table per workout", async () => {
            renderWithRouterAndApollo(<WorkoutList />, [allWorkoutsQueryMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();
            expect(screen.getByText("1 April 2022")).toBeInTheDocument();
            expect(screen.getByText("30 March 2022")).toBeInTheDocument();
        });
        it("should order tables by date, most recent first", async () => {
            renderWithRouterAndApollo(<WorkoutList />, [allWorkoutsQueryMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();
            const workouts = screen.getAllByTestId("workout-table");
            expect(workouts[0]).toHaveTextContent("3 April 2022");
            expect(workouts[1]).toHaveTextContent("1 April 2022");
            expect(workouts[2]).toHaveTextContent("30 March 2022");
        });
        it("should show lifts in table", async () => {
            renderWithRouterAndApollo(<WorkoutList />, [allWorkoutsQueryMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();
            const workout = screen.getAllByTestId("workout-table")[0];

            expect(workout).toHaveTextContent("bench press");
            expect(workout).toHaveTextContent("135");
            expect(workout).toHaveTextContent("5x5");
            expect(workout).toHaveTextContent("squat");
        });
    });

    describe("Add Workout", () => {
        const workout: Workout = {
            id: 5,
            date: "2022-06-13",
            lifts: []
        };

        const oneWorkoutQueryMock: MockedResponse<OneWorkoutQuery> = {
            request: {
                query: OneWorkoutDocument,
                variables: {
                    input: {
                        id: workout.id
                    }
                }
            },
            result: {
                data: {
                    workout
                }
            }
        };

        const addWorkoutMutationMock: MockedResponse<AddWorkoutMutation> = {
            request: {
                query: AddWorkoutDocument,
                variables: {
                    input: {
                        date: workout.date
                    }
                }
            },
            result: {
                data: {
                    addWorkout: {
                        workout: {
                            id: workout.id,
                            date: workout.date
                        }
                    }
                }
            }
        };

        const addLiftMutationMock: MockedResponse<AddLiftMutation> = {
            request: {
                query: AddLiftDocument,
                variables: {
                    input: {
                        workout: workout.id,
                        name: "Deadlift",
                        weight: 315,
                        sets: 3,
                        reps: 3
                    }
                }
            },
            result: {
                data: {
                    addLift: {
                        workout: workout.id,
                        lift: {
                            id: 11,
                            name: "Deadlift",
                            weight: 315,
                            sets: 3,
                            reps: 3
                        }
                    }
                }
            }
        };

        it("should save new workout and allow adding lifts to it", async () => {
            renderPage(WorkoutPage, WORKOUT_ROUTE, [allWorkoutsQueryMock, oneWorkoutQueryMock, addWorkoutMutationMock, addLiftMutationMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();

            userEvent.clear(screen.getByLabelText("Date"));
            userEvent.type(screen.getByLabelText("Date"), "06132022");
            screen.getByTestId("add-workout").click();

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            userEvent.type(screen.getByLabelText("Name"), "Deadlift");
            userEvent.type(screen.getByLabelText("Weight"), "315");
            userEvent.type(screen.getByLabelText("Sets"), "3");
            userEvent.type(screen.getByLabelText("Reps"), "3");
            screen.getByLabelText("save").click();

            await new Promise(resolve => setTimeout(resolve, 10)); // need to "wait" for save to go through to make sure it did not fail

            expect(screen.queryByText("Save Failed!")).not.toBeInTheDocument();
        });
    });
});
