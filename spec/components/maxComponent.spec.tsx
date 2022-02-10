import { MockedResponse } from "@apollo/client/testing";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { AddMaxDocument, AddMaxMutation, AllMaxesDocument } from "../../generated/schema";
import { MaxComponent } from "../../src/components";
import { renderWithApollo, renderWithSnackbarAndApollo } from "../test-helpers/testUtils";

const allMaxesQueryMock: MockedResponse = {
    request: {
        query: AllMaxesDocument
    },
    result: {
        data: {
            maxes: [
                {
                    bench1RM: null,
                    date: "2021-12-23T05:00:00.000Z",
                    deadlift1RM: null,
                    id: 1,
                    press1RM: null,
                    squat1RM: 563
                }
            ]
        }
    }
};

describe("maxComponent", () => {
    it("should display data in table", async () => {
        renderWithApollo(<MaxComponent />, [allMaxesQueryMock]);

        expect(await screen.findByText("2021-12-23T05:00:00.000Z")).toBeInTheDocument();
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
                            date: "Tue Jan 05 1993",
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
                                id: 100,
                                date: "1993-01-05T00:00:00.000Z",
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

            expect(await screen.findByText("1993-01-05T00:00:00.000Z")).toBeInTheDocument();
        });

        it("should show snackbar and close modal when save fails", async () => {
            const addMaxMutationErrorMock: MockedResponse = {
                request: {
                    query: AddMaxDocument,
                    variables: {
                        input: {
                            date: "Tue Jan 05 1993",
                            squat1RM: null,
                            bench1RM: null,
                            deadlift1RM: null,
                            press1RM: null
                        }
                    }
                },
                error: new Error("An error occurred")
            };
            renderWithSnackbarAndApollo(<MaxComponent />, [allMaxesQueryMock, addMaxMutationErrorMock]);
            expect(await screen.findByText("563")).toBeInTheDocument();

            screen.getByTestId("add-max").click();
            userEvent.type(screen.getByLabelText("Date"), "01051993");
            screen.getByText("Save").click();

            expect(await screen.findByText("Save Failed!")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });
    });
});
