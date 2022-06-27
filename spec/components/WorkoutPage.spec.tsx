import { MockedResponse } from "@apollo/client/testing";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import {
    AddLiftDocument,
    AddLiftMutation,
    AddWorkoutDocument,
    AddWorkoutMutation,
    AllWorkoutsDocument,
    AllWorkoutsQuery, DeleteLiftDocument, DeleteLiftMutation, Lift,
    OneWorkoutDocument,
    OneWorkoutQuery,
    Workout
} from "../../generated/schema";
import { WorkoutList } from "../../src/components/workouts/WorkoutList";
import { WORKOUT_ROUTE } from "../../src/pages/constants";
import { WorkoutPage } from "../../src/pages/WorkoutPage";
import { renderPage, renderWithAllProviders, renderWithRouterAndApollo } from "../testUtils";

describe("Workout Page", () => {
    const benchNSquat = {
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
    };

    const allWorkoutsQueryMock: MockedResponse<AllWorkoutsQuery> = {
        request: {
            query: AllWorkoutsDocument
        },
        result: {
            data: {
                workouts: [
                    benchNSquat,
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
        const oneWorkoutQueryMock: MockedResponse<OneWorkoutQuery> = {
            request: {
                query: OneWorkoutDocument,
                variables: {
                    input: {
                        id: benchNSquat.id
                    }
                }
            },
            result: {
                data: {
                    workout: benchNSquat
                }
            }
        };

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
        it("should show workout form on date click", async () => {
            renderPage(WorkoutPage, WORKOUT_ROUTE, [allWorkoutsQueryMock, oneWorkoutQueryMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();

            screen.getByText("3 April 2022").click();

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            expect(screen.getAllByLabelText("Name")[0]).toHaveDisplayValue("bench press");
            expect(screen.getAllByLabelText("Weight")[0]).toHaveDisplayValue("135");
            expect(screen.getAllByLabelText("Sets")[0]).toHaveDisplayValue("5");
            expect(screen.getAllByLabelText("Reps")[0]).toHaveDisplayValue("5");
        });
    });

    describe("Add Workout", () => {
        const lift: Lift = {
            id: 12,
            name: "existing lift",
            weight: 225,
            sets: 4,
            reps: 4
        };

        const workout: Workout = {
            id: 5,
            date: "2022-06-13",
            lifts: [lift]
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

        it("should save new workout and allow adding lifts to it", async () => {
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

            renderPage(WorkoutPage, WORKOUT_ROUTE, [allWorkoutsQueryMock, oneWorkoutQueryMock, addWorkoutMutationMock, addLiftMutationMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();

            userEvent.clear(screen.getByLabelText("Date"));
            userEvent.type(screen.getByLabelText("Date"), "06132022");
            screen.getByTestId("add-workout").click();

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            expect(screen.getAllByLabelText("Name")[0]).toHaveDisplayValue("existing lift");
            expect(screen.getAllByLabelText("Weight")[0]).toHaveDisplayValue("225");
            expect(screen.getAllByLabelText("Sets")[0]).toHaveDisplayValue("4");
            expect(screen.getAllByLabelText("Reps")[0]).toHaveDisplayValue("4");

            userEvent.type(screen.getAllByLabelText("Name")[1], "Deadlift");
            userEvent.type(screen.getAllByLabelText("Weight")[1], "315");
            userEvent.type(screen.getAllByLabelText("Sets")[1], "3");
            userEvent.type(screen.getAllByLabelText("Reps")[1], "3");
            screen.getByLabelText("save").click();

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 20)); // need to "wait" for save to go through to make sure it did not fail
            });

            expect(screen.queryByText("Save Failed!")).not.toBeInTheDocument();
        });

        it("should delete workout on trash button click", async () => {
            const deleteLiftMutationMock: MockedResponse<DeleteLiftMutation> = {
                request: {
                    query: DeleteLiftDocument,
                    variables: {
                        input: {
                            id: lift.id
                        }
                    }
                },
                result: {
                    data: {
                        deleteLift: {
                            success: true,
                            id: lift.id
                        }
                    }
                }
            };

            renderPage(WorkoutPage, WORKOUT_ROUTE + "/5", [oneWorkoutQueryMock, deleteLiftMutationMock]);

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            screen.getByLabelText("delete lift 12").click();

            expect(await screen.findByText("Lift Deleted!")).toBeInTheDocument();
        });
    });
});
