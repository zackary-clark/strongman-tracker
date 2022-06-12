import { MockedResponse } from "@apollo/client/testing";
import { screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import * as React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { AllWorkoutsDocument, AllWorkoutsQuery } from "../../generated/schema";
import { ADD_WORKOUT_ROUTE } from "../../src/components/routes";
import { WorkoutList } from "../../src/components/workouts/WorkoutList";
import { renderWithAllProviders, renderWithApollo, renderWithRouterAndApollo } from "../test-helpers/testUtils";

describe("workoutComponent", () => {
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

    it("should default to list view, and switch to add view on FAB click", async () => {
        const history = createMemoryHistory();
        renderWithApollo(
            <HistoryRouter history={history}>
                <WorkoutList />
            </HistoryRouter>,
            [allWorkoutsQueryMock]
        );

        expect(await screen.findByText("3 April 2022")).toBeInTheDocument();

        screen.getByTestId("add-workout").click();

        expect(history.location.pathname).toBe(ADD_WORKOUT_ROUTE);
    });

    describe("tables", () => {
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
        it("should do", () => {
            expect(true).toBe(false);
        });
    });
});
