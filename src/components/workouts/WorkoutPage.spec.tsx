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
    AllWorkoutsQuery,
    DeleteLiftDocument,
    DeleteLiftMutation,
    DeleteWorkoutDocument,
    DeleteWorkoutMutation,
    Lift,
    OneWorkoutDocument,
    OneWorkoutQuery,
    Workout
} from "../../../generated/schema";
import { WORKOUT_ROUTE } from "../../pages/constants";
import { WorkoutPage } from "../../pages/WorkoutPage";
import { userPreferencesKgMock, userPreferencesLbMock } from "../../testUtils/commonApolloMocks";
import { renderPage, renderWithAllProviders, renderWithRouterAndApollo } from "../../testUtils/renderWithProviders";
import { WorkoutList } from "./WorkoutList";

describe("Workout Page", () => {
    const benchNSquat = {
        id: "4f9207fd-d981-4a11-82ca-01515208a0bb",
        date: "2022-04-03",
        lifts: [
            {
                id: "45a5f4ca-c6f9-4e54-a1dc-71fedd116a06",
                name: "bench press",
                reps: 5,
                sets: 5,
                weight: 100000
            },
            {
                id: "973ecff9-e192-4500-ab29-0c334837d7ad",
                name: "squat",
                reps: 10,
                sets: 3,
                weight: 150000
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
                        id: "3792bc41-da64-409d-9877-99f12d2e6930",
                        date: "2022-03-30",
                        lifts: []
                    },
                    {
                        id: "e133224e-deb9-4a3b-8d38-7f948dc1eb83",
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
            renderWithRouterAndApollo(<WorkoutList />, [allWorkoutsQueryMock, userPreferencesKgMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();
            const workout = screen.getAllByTestId("workout-table")[0];

            expect(workout).toHaveTextContent("bench press");
            expect(workout).toHaveTextContent("100");
            expect(workout).toHaveTextContent("5x5");
            expect(workout).toHaveTextContent("squat");
        });
        it("should show workout form on date click", async () => {
            renderPage(WorkoutPage, WORKOUT_ROUTE, [allWorkoutsQueryMock, oneWorkoutQueryMock, userPreferencesLbMock]);

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();

            await userEvent.click(screen.getByText("3 April 2022"));

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            expect(screen.getAllByLabelText("Name")[0]).toHaveDisplayValue("bench press");
            expect(screen.getAllByLabelText("Weight (lbs)")[0]).toHaveDisplayValue("220.5");
            expect(screen.getAllByLabelText("Sets")[0]).toHaveDisplayValue("5");
            expect(screen.getAllByLabelText("Reps")[0]).toHaveDisplayValue("5");
        });
    });

    describe("Add Workout", () => {
        const lift: Lift = {
            id: "05ba2809-3996-40ed-a622-40bd30bbffd2",
            name: "existing lift",
            weight: 225000,
            sets: 4,
            reps: 4
        };

        const workout: Workout = {
            id: "aac47a13-98cf-4485-bd99-5f59c481ecd3",
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
                            weight: 142882,
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
                                id: "00af4e6d-ce2c-44a3-971e-47d70aa463b6",
                                name: "Deadlift",
                                weight: 142882,
                                sets: 3,
                                reps: 3
                            }
                        }
                    }
                }
            };

            renderPage(
                WorkoutPage,
                WORKOUT_ROUTE,
                [
                    allWorkoutsQueryMock,
                    oneWorkoutQueryMock,
                    addWorkoutMutationMock,
                    addLiftMutationMock,
                    userPreferencesLbMock
                ]
            );

            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();

            await userEvent.clear(screen.getByLabelText("Date"));
            await userEvent.type(screen.getByLabelText("Date"), "06132022");
            await userEvent.click(screen.getByTestId("add-workout"));

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            expect(screen.getAllByLabelText("Name")[0]).toHaveDisplayValue("existing lift");
            expect(screen.getAllByLabelText("Weight (lbs)")[0]).toHaveDisplayValue("496");
            expect(screen.getAllByLabelText("Sets")[0]).toHaveDisplayValue("4");
            expect(screen.getAllByLabelText("Reps")[0]).toHaveDisplayValue("4");

            await userEvent.type(screen.getAllByLabelText("Name")[1], "Deadlift");
            await userEvent.type(screen.getAllByLabelText("Weight (lbs)")[1], "315");
            await userEvent.type(screen.getAllByLabelText("Sets")[1], "3");
            await userEvent.type(screen.getAllByLabelText("Reps")[1], "3");
            await userEvent.click(screen.getByLabelText("save"));

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 20)); // need to "wait" for save to go through to make sure it did not fail
            });

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
        });

        it("should delete lift on trash button click", async () => {
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

            renderPage(WorkoutPage, WORKOUT_ROUTE + `/${workout.id}`, [oneWorkoutQueryMock, deleteLiftMutationMock]);

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            await userEvent.click(screen.getByLabelText("delete lift 05ba2809-3996-40ed-a622-40bd30bbffd2"));

            expect(await screen.findByText("Lift Deleted!")).toBeInTheDocument();
        });

        it("should delete workout on Trash icon click", async () => {
            const deleteWorkoutMutationMock: MockedResponse<DeleteWorkoutMutation> = {
                request: {
                    query: DeleteWorkoutDocument,
                    variables: {
                        input: {
                            id: workout.id
                        }
                    }
                },
                result: {
                    data: {
                        deleteWorkout: {
                            success: true,
                            id: workout.id
                        }
                    }
                }
            };

            renderPage(WorkoutPage, WORKOUT_ROUTE + `/${workout.id}`, [oneWorkoutQueryMock, deleteWorkoutMutationMock, allWorkoutsQueryMock]);

            expect(await screen.findByLabelText("save")).toBeInTheDocument();

            await userEvent.click(screen.getByLabelText("delete-workout"));

            expect(await screen.findByText("Workout Deleted!")).toBeInTheDocument();
            expect(await screen.findByText("3 April 2022")).toBeInTheDocument();
        });
    });
});
