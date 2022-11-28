import { MockedResponse } from "@apollo/client/testing";
import { fireEvent, getByRole, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";
import * as React from "react";
import {
    AddMaxDocument,
    AddMaxMutation,
    AllMaxesDocument,
    AllMaxesQuery,
    DeleteMaxDocument,
    DeleteMaxMutation,
    MaxType
} from "../../../generated/schema";
import { userPreferencesKgMock, userPreferencesLbMock } from "../../testUtils/commonApolloMocks";
import { renderWithApollo, renderWithSnackbarAndApollo } from "../../testUtils/renderWithProviders";
import { MaxComponent } from "./MaxComponent";

const allMaxesQueryMock: MockedResponse<AllMaxesQuery> = {
    request: {
        query: AllMaxesDocument
    },
    result: {
        data: {
            benchMaxes: [],
            pressMaxes: [],
            deadliftMaxes: [],
            squatMaxes: [
                {
                    id: "64afa3bf-719c-4303-8a3a-47f4b7d134d5",
                    date: "2021-12-23",
                    weight: 563000,
                    type: MaxType.Squat
                }
            ],
        }
    }
};

describe("Max Page", () => {
    it("should display data in table", async () => {
        renderWithApollo(<MaxComponent />, [allMaxesQueryMock, userPreferencesKgMock]);

        expect(await screen.findByText("23 Dec 2021")).toBeInTheDocument();
        expect(screen.getByText("563")).toBeInTheDocument();
    });

    it("should show snackbar when AllMaxesQuery fails due to network error", async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: AllMaxesDocument
                },
                error: new Error("An error occurred")
            }
        ];
        renderWithSnackbarAndApollo(<MaxComponent />, mocks);

        expect(await screen.findByText("Network Error!")).toBeInTheDocument();
    });

    describe("Add Max", () => {
        it("should open Add Modal on Add Icon click and close again on escape key", async () => {
            renderWithApollo(<MaxComponent />, [allMaxesQueryMock, userPreferencesKgMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();

            await userEvent.click(screen.getByTestId("add-max"));

            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            fireEvent.keyDown(screen.getByText("Add New Max"), {key: "Escape"});

            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });

        it("should open Add Modal on Add Icon click and close again on cancel click", async () => {
            renderWithApollo(<MaxComponent />, [allMaxesQueryMock, userPreferencesKgMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();

            await userEvent.click(screen.getByTestId("add-max"));

            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            await userEvent.click(screen.getByText("Cancel"));

            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });

        it("should add new max to table", async () => {
            const addMaxMutationMock: MockedResponse<AddMaxMutation> = {
                request: {
                    query: AddMaxDocument,
                    variables: {
                        input: {
                            date: "1993-01-05",
                            type: MaxType.Deadlift,
                            weight: 224528
                        }
                    }
                },
                result: {
                    data: {
                        addMax: {
                            max: {
                                id: "07058915-0a5f-40f9-84f6-53fb1b5540a7",
                                date: "1993-01-05",
                                type: MaxType.Deadlift,
                                weight: 224528
                            }
                        }
                    }
                }
            };

            renderWithApollo(<MaxComponent />, [allMaxesQueryMock, addMaxMutationMock, userPreferencesLbMock]);
            expect(await screen.findByText("1241")).toBeInTheDocument();

            await userEvent.click(screen.getByTestId("add-max"));
            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            await userEvent.clear(await screen.findByLabelText("Date"));
            await userEvent.type((await screen.findByLabelText("Date")), "01051993");
            await userEvent.type(screen.getByLabelText("Weight (lbs)"), "495");
            // eslint-disable-next-line testing-library/prefer-screen-queries
            await userEvent.click(getByRole(screen.getByTestId("max-lift-type"), "button"));
            await userEvent.click(await screen.findByText("deadlift"));
            await userEvent.click(screen.getByText("Save"));

            expect(await screen.findByText("5 Jan 1993")).toBeInTheDocument();
        });

        it("should show snackbar and close modal when save fails due to network error", async () => {
            const addMaxMutationErrorMock: MockedResponse = {
                request: {
                    query: AddMaxDocument,
                    variables: {
                        input: {
                            date: "1993-01-05",
                            type: MaxType.Press,
                            weight: 315000
                        }
                    }
                },
                error: new Error("Network Error")
            };
            renderWithSnackbarAndApollo(<MaxComponent />, [allMaxesQueryMock, addMaxMutationErrorMock, userPreferencesKgMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            await userEvent.click(screen.getByTestId("add-max"));

            await userEvent.clear(await screen.findByLabelText("Date"));
            await userEvent.type((await screen.findByLabelText("Date")), "01051993");
            await userEvent.type(screen.getByLabelText("Weight (kgs)"), "315");
            // eslint-disable-next-line testing-library/prefer-screen-queries
            await userEvent.click(getByRole(screen.getByTestId("max-lift-type"), "button"));
            await userEvent.click(await screen.findByText("press"));
            await userEvent.click(screen.getByText("Save"));

            expect(await screen.findByText("Network Error!")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });

        it("should show snackbar and close modal when save fails due to GraphQL error", async () => {
            const addMaxMutationErrorMock: MockedResponse = {
                request: {
                    query: AddMaxDocument,
                    variables: {
                        input: {
                            date: "1993-01-05",
                            type: MaxType.Deadlift,
                            weight: 142882
                        }
                    }
                },
                result: {
                    errors: [new GraphQLError("Error")],
                }
            };
            renderWithSnackbarAndApollo(<MaxComponent />, [allMaxesQueryMock, addMaxMutationErrorMock, userPreferencesLbMock]);
            expect(await screen.findByText("1241")).toBeInTheDocument();

            await userEvent.click(screen.getByTestId("add-max"));

            await userEvent.type((await screen.findByLabelText("Date")), "01051993");
            await userEvent.type(screen.getByLabelText("Weight (lbs)"), "315");
            // eslint-disable-next-line testing-library/prefer-screen-queries
            await userEvent.click(getByRole(screen.getByTestId("max-lift-type"), "button"));
            await userEvent.click(await screen.findByText("deadlift"));
            await userEvent.click(screen.getByText("Save"));

            expect(await screen.findByText("Network Error!")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });
    });

    describe("Delete Max", () => {
        it("should delete max from table", async () => {
            const deleteMaxQueryMock: MockedResponse<DeleteMaxMutation> = {
                request: {
                    query: DeleteMaxDocument,
                    variables: {
                        input: {
                            id: "64afa3bf-719c-4303-8a3a-47f4b7d134d5"
                        }
                    }
                },
                result: {
                    data: {
                        deleteMax: {
                            success: true,
                            id: "64afa3bf-719c-4303-8a3a-47f4b7d134d5"
                        }
                    }
                }
            };

            renderWithApollo(<MaxComponent />, [allMaxesQueryMock, deleteMaxQueryMock, userPreferencesKgMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            await userEvent.click(screen.getByLabelText("Delete"));

            await waitForElementToBeRemoved(() => screen.queryByText("563"));
        });

        it("should show snackbar and not remove from table when delete fails", async () => {
            const deleteMaxQueryErrorMock: MockedResponse<DeleteMaxMutation> = {
                request: {
                    query: DeleteMaxDocument,
                    variables: {
                        input: {
                            id: "64afa3bf-719c-4303-8a3a-47f4b7d134d5"
                        }
                    }
                },
                result: {
                    errors: [new GraphQLError("Error")],
                }
            };
            renderWithSnackbarAndApollo(<MaxComponent />, [allMaxesQueryMock, deleteMaxQueryErrorMock, userPreferencesKgMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            await userEvent.click(screen.getByLabelText("Delete"));

            expect(await screen.findByText("Network Error!")).toBeInTheDocument();
            expect(screen.getByText("563")).toBeInTheDocument();
        });
    });
});
