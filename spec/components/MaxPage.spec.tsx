import { MockedResponse } from "@apollo/client/testing";
import { fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";
import * as React from "react";
import {
    AddMaxDocument,
    AddMaxMutation,
    AllMaxesDocument,
    AllMaxesQuery, DeleteMaxDocument,
    DeleteMaxMutation
} from "../../generated/schema";
import { MaxComponent } from "../../src/components/maxes/MaxComponent";
import { renderWithApollo, renderWithSnackbarAndApollo } from "../utils/renderWithProviders";

const allMaxesQueryMock: MockedResponse<AllMaxesQuery> = {
    request: {
        query: AllMaxesDocument
    },
    result: {
        data: {
            maxes: [
                {
                    bench1RM: null,
                    date: "2021-12-23",
                    deadlift1RM: null,
                    id: "64afa3bf-719c-4303-8a3a-47f4b7d134d5",
                    press1RM: null,
                    squat1RM: 563
                }
            ]
        }
    }
};

describe("Max Page", () => {
    it("should display data in table", async () => {
        renderWithApollo(<MaxComponent />, [allMaxesQueryMock]);

        expect(await screen.findByText("12/23/2021")).toBeInTheDocument();
        expect(screen.getByTestId("squat1RM")).toHaveTextContent("563");
        expect(screen.getByTestId("bench1RM")).toBeEmptyDOMElement();
        expect(screen.getByTestId("deadlift1RM")).toBeEmptyDOMElement();
        expect(screen.getByTestId("press1RM")).toBeEmptyDOMElement();
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
            renderWithApollo(<MaxComponent />, [allMaxesQueryMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();

            screen.getByTestId("add-max").click();

            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            fireEvent.keyDown(screen.getByText("Add New Max"), {key: "Escape"});

            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });

        it("should open Add Modal on Add Icon click and close again on cancel click", async () => {
            renderWithApollo(<MaxComponent />, [allMaxesQueryMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();

            screen.getByTestId("add-max").click();

            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            screen.getByText("Cancel").click();

            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });

        it("should add new max to table", async () => {
            const addMaxMutationMock: MockedResponse<AddMaxMutation> = {
                request: {
                    query: AddMaxDocument,
                    variables: {
                        input: {
                            date: "1993-01-05",
                            squat1RM: 123456,
                            bench1RM: 185,
                            deadlift1RM: 315,
                            press1RM: 135
                        }
                    }
                },
                result: {
                    data: {
                        addMax: {
                            max: {
                                id: "07058915-0a5f-40f9-84f6-53fb1b5540a7",
                                date: "1993-01-05",
                                squat1RM: 123456,
                                deadlift1RM: 315,
                                press1RM: 135,
                                bench1RM: 185
                            }
                        }
                    }
                }
            };

            renderWithApollo(<MaxComponent />, [allMaxesQueryMock, addMaxMutationMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            screen.getByTestId("add-max").click();
            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            userEvent.type(screen.getByLabelText("Date"), "01051993");
            userEvent.type(screen.getByLabelText("Squat"), "123456");
            userEvent.type(screen.getByLabelText("Bench"), "185");
            userEvent.type(screen.getByLabelText("Deadlift"), "315");
            userEvent.type(screen.getByLabelText("Press"), "135");
            screen.getByText("Save").click();

            expect(await screen.findByText("01/05/1993")).toBeInTheDocument();
        });

        it("should show snackbar and close modal when save fails due to network error", async () => {
            const addMaxMutationErrorMock: MockedResponse = {
                request: {
                    query: AddMaxDocument,
                    variables: {
                        input: {
                            date: "1993-01-05",
                            squat1RM: 123456,
                            bench1RM: 185,
                            deadlift1RM: 315,
                            press1RM: 135
                        }
                    }
                },
                error: new Error("Network Error")
            };
            renderWithSnackbarAndApollo(<MaxComponent />, [allMaxesQueryMock, addMaxMutationErrorMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            screen.getByTestId("add-max").click();
            userEvent.type(screen.getByLabelText("Date"), "01051993");
            userEvent.type(screen.getByLabelText("Squat"), "123456");
            userEvent.type(screen.getByLabelText("Bench"), "185");
            userEvent.type(screen.getByLabelText("Deadlift"), "315");
            userEvent.type(screen.getByLabelText("Press"), "135");
            screen.getByText("Save").click();

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
                            squat1RM: 123456,
                            bench1RM: 185,
                            deadlift1RM: 315,
                            press1RM: 135
                        }
                    }
                },
                result: {
                    errors: [new GraphQLError("Error")],
                }
            };
            renderWithSnackbarAndApollo(<MaxComponent />, [allMaxesQueryMock, addMaxMutationErrorMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            screen.getByTestId("add-max").click();
            userEvent.type(screen.getByLabelText("Date"), "01051993");
            userEvent.type(screen.getByLabelText("Squat"), "123456");
            userEvent.type(screen.getByLabelText("Bench"), "185");
            userEvent.type(screen.getByLabelText("Deadlift"), "315");
            userEvent.type(screen.getByLabelText("Press"), "135");
            screen.getByText("Save").click();

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

            renderWithApollo(<MaxComponent />, [allMaxesQueryMock, deleteMaxQueryMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            screen.getByLabelText("Delete").click();

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
            renderWithSnackbarAndApollo(<MaxComponent />, [allMaxesQueryMock, deleteMaxQueryErrorMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            screen.getByLabelText("Delete").click();

            expect(await screen.findByText("Network Error!")).toBeInTheDocument();
            expect(screen.getByText("563")).toBeInTheDocument();
        });
    });
});
