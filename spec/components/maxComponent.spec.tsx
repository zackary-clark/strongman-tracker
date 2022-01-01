import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { MaxComponent } from "../../src/components";
import { IMax } from "../../src/data/max";
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

    it("should display data in table", async () => {
        render(<MaxComponent />);

        expect(await screen.findByText("2019-01-18")).toBeInTheDocument();
        expect(screen.getByTestId("squat1RM")).toHaveTextContent("225");
        expect(screen.getByTestId("bench1RM")).toHaveTextContent("185");
        expect(screen.getByTestId("deadlift1RM")).toHaveTextContent("315");
        expect(screen.getByTestId("press1RM")).toHaveTextContent("135");
    });

    it("should show snackbar when getMaxes fails", async () => {
        jest.spyOn(WebClient, "getMaxes").mockRejectedValue("error");
        renderWithSnackbar(<MaxComponent />);

        expect(await screen.findByText("Network Error!")).toBeInTheDocument();
    });

    describe("Add Max", () => {
        it("should open Add Modal on Add Icon click and close again on escape key", async () => {
            render(<MaxComponent />);
            expect(await screen.findByText("225")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();

            screen.getByTestId("add-max").click();

            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            fireEvent.keyDown(screen.getByText("Add New Max"), {key: "Escape"});

            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });

        it("should open Add Modal on Add Icon click and close again on cancel click", async () => {
            render(<MaxComponent />);
            expect(await screen.findByText("225")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();

            screen.getByTestId("add-max").click();

            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            screen.getByText("Cancel").click();

            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });

        it("should add new max to table", async () => {
            const postSpy = jest.spyOn(WebClient, "postMax").mockResolvedValue({
                ...defaultAxiosResponse,
                data: sampleMax
            });
            const expectedArgs: IMax = {
                date: sampleMax.date,
                squat1RM: sampleMax.squat1RM,
                bench1RM: sampleMax.bench1RM,
                deadlift1RM: sampleMax.deadlift1RM,
                press1RM: sampleMax.press1RM
            };

            render(<MaxComponent />);
            expect(await screen.findByText("225")).toBeInTheDocument();

            screen.getByTestId("add-max").click();
            expect(await screen.findByText("Add New Max")).toBeInTheDocument();

            userEvent.type(screen.getByLabelText("Date"), "01051993");
            userEvent.type(screen.getByLabelText("Squat"), "123456");
            userEvent.type(screen.getByLabelText("Bench"), "185");
            userEvent.type(screen.getByLabelText("Deadlift"), "315");
            userEvent.type(screen.getByLabelText("Press"), "135");
            screen.getByText("Save").click();

            expect(postSpy).toHaveBeenCalledWith(expectedArgs);
            expect(await screen.findByText("123456")).toBeInTheDocument();
        });

        it("should show snackbar and close modal when save fails", async () => {
            jest.spyOn(WebClient, "postMax").mockRejectedValue("error");
            renderWithSnackbar(<MaxComponent />);
            expect(await screen.findByText("225")).toBeInTheDocument();

            screen.getByTestId("add-max").click();
            userEvent.type(screen.getByLabelText("Date"), "01051993");
            screen.getByText("Save").click();

            expect(await screen.findByText("Save Failed!")).toBeInTheDocument();
            expect(screen.queryByText("Add New Max")).not.toBeInTheDocument();
        });
    });
});
