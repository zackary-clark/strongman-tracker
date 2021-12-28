import { fireEvent, queryByText, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import * as React from "react";
import { MaxComponent } from "../../src/components";
import * as WebClient from "../../src/webClient";
import { defaultAxiosResponse, sampleMax, sampleMaxesArray } from "../test-helpers/data";
import { renderWithSnackbar } from "../test-helpers/testUtils";

describe("maxComponent", () => {
    beforeEach(() => {
        jest.spyOn(WebClient, "getMaxes").mockResolvedValue({
            ...defaultAxiosResponse,
            data: [...sampleMaxesArray]
        });
    });

    describe("Get Maxes", () => {
        it("should add data to table", async () => {
            render(<MaxComponent />);
            expect(await screen.findByText("123456")).toBeInTheDocument();
        });

        it("should show snackbar when getMaxes fails", async () => {
            jest.spyOn(WebClient, "getMaxes").mockRejectedValue("error");
            renderWithSnackbar(<MaxComponent />);

            expect(await screen.findByText("Network Error!")).toBeInTheDocument();
        });
    });

    describe("Add Max", () => {
        it("should open Add Modal on Add Icon click and close again on escape key", async () => {
            render(<MaxComponent />);
            expect(screen.queryByText("Add New One Rep Max")).not.toBeInTheDocument();
            expect(await screen.findByText("123456")).toBeInTheDocument();

            screen.getByTestId("add-max").click();

            expect(await screen.findByText("Add New One Rep Max")).toBeInTheDocument();

            fireEvent.keyDown(screen.getByText("Add New One Rep Max"), {key: "Escape"});

            expect(screen.queryByText("Add New One Rep Max")).not.toBeInTheDocument();
        });

        it("should add new max to table", async () => {
            jest.spyOn(WebClient, "postMax").mockResolvedValue({
                ...defaultAxiosResponse,
                data: sampleMax
            });
            render(<MaxComponent />);
            expect(await screen.findByText("123456")).toBeInTheDocument();

            screen.getByTitle("Add").click();
            screen.getByTitle("Save").click();

            expect(await screen.findByText("225")).toBeInTheDocument();
        });

        it("should show snackbar and close modal when save fails", async () => {
            jest.spyOn(WebClient, "postMax").mockRejectedValue("error");
            renderWithSnackbar(<MaxComponent />);
            expect(await screen.findByText("123456")).toBeInTheDocument();

            screen.getByTitle("Add").click();
            screen.getByTitle("Save").click();

            expect(await screen.findByText("Save Failed!")).toBeInTheDocument();
            expect(screen.queryByPlaceholderText("Squat 1RM")).not.toBeInTheDocument();
        });
    });
});
