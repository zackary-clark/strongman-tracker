import * as React from "react";
import { render } from "@testing-library/react";
import { waitFor, fireEvent } from "@testing-library/dom";
import * as WebClient from "../../src/webClient";
import { MaxComponent } from "../../src/components";
import { sampleMaxesArray, defaultAxiosResponse } from "../test-helpers/data";
import { defaultSnackbarMessage } from "../../src/context";
import { renderWithSnackbar } from "../test-helpers/testUtils";

describe("maxComponent", () => {
    let getMaxesSpy: jest.SpyInstance;
    let postMaxSpy: jest.SpyInstance;

    beforeAll(() => {
        getMaxesSpy = jest.spyOn(WebClient, "getMaxes").mockResolvedValue({
            ...defaultAxiosResponse,
            data: sampleMaxesArray
        });
        postMaxSpy = jest.spyOn(WebClient, "postMax").mockResolvedValue(defaultAxiosResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    describe("GetMaxes button", () => {
        it("should render GetMaxes button", () => {
            const { getByTitle } = render(<MaxComponent />);
            expect(getByTitle("Get Maxes")).toHaveTextContent("Get Maxes");
        });

        it("should call webclient.getMaxes on 'GetMaxes' click", () => {
            const { getByTitle } = render(<MaxComponent />);
            getByTitle("Get Maxes").click();
            expect(getMaxesSpy).toBeCalled();
        });

        it("should add data to table on 'GetMaxes' click", async () => {
            const { getByTitle, getByText } = render(<MaxComponent />);
            getByTitle("Get Maxes").click();
            await waitFor(() => expect(getByText("123456")));
        });

        it("should show snackbar when getMaxes fails", async () => {
            getMaxesSpy = jest.spyOn(WebClient, "getMaxes").mockRejectedValue("error");
            const { getByTitle, getByText } = renderWithSnackbar(<MaxComponent />);

            getByTitle("Get Maxes").click();

            await waitFor(() => expect(getByText(defaultSnackbarMessage)));
        });
    });
    
    describe("Max Table", () => {
        it("should render maxes table with title", () => {
            const { getByRole } = render(<MaxComponent />);
            expect(getByRole("heading", { name: "One Rep Max Tracker" })).toBeInTheDocument();
        });

        it("should call webClient.postMax on 'Add'", () => {
            const { getByTitle } = render(<MaxComponent />);

            getByTitle("Add").click();
            getByTitle("Save").click();

            expect(postMaxSpy).toHaveBeenCalled();
        });

        it("should place new entry in table on 'Add'", async () => {
            const { getByTitle, getByPlaceholderText, getByText } = render(<MaxComponent />);

            getByTitle("Add").click();
            fireEvent.change(getByPlaceholderText("Squat"), { target: { value: "123123" }});
            getByTitle("Save").click();

            await waitFor(() => expect(getByText("123123")));
        });

        it("should show snackbar when save fails", async () => {
            postMaxSpy = jest.spyOn(WebClient, "postMax").mockRejectedValue("error");
            const {getByTitle, getByText} = renderWithSnackbar(<MaxComponent />);

            getByTitle("Add").click();
            getByTitle("Save").click();

            await waitFor(() => expect(getByText("Save Failed!")));
        });
    });
});
