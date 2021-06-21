import * as React from "react";
import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import * as WebClient from "../../src/webClient";
import { MaxComponent } from "../../src/components";
import { defaultAxiosResponse, sampleMax, sampleMaxesArray } from "../test-helpers/data";
import { renderWithSnackbar } from "../test-helpers/testUtils";

describe("maxComponent", () => {
    let getMaxesSpy: jest.SpyInstance;
    let postMaxSpy: jest.SpyInstance;

    beforeEach(() => {
        getMaxesSpy = jest.spyOn(WebClient, "getMaxes").mockResolvedValue({
            ...defaultAxiosResponse,
            data: sampleMaxesArray
        });
        postMaxSpy = jest.spyOn(WebClient, "postMax").mockResolvedValue({
            ...defaultAxiosResponse,
            data: sampleMax
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    describe("GetMaxes", () => {
        it("should call webclient.getMaxes on render", () => {
            render(<MaxComponent />);
            expect(getMaxesSpy).toBeCalled();
        });

        it("should add data to table", async () => {
            const { getByText } = render(<MaxComponent />);
            await waitFor(() => expect(getByText("123456")));
        });

        it("should show snackbar when getMaxes fails", async () => {
            getMaxesSpy = jest.spyOn(WebClient, "getMaxes").mockRejectedValue("error");
            const { getByText } = renderWithSnackbar(<MaxComponent />);

            await waitFor(() => expect(getByText("Network Error!")));
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

        it("should show snackbar when save fails", async () => {
            postMaxSpy = jest.spyOn(WebClient, "postMax").mockRejectedValue("error");
            const {getByTitle, getByText} = renderWithSnackbar(<MaxComponent />);

            getByTitle("Add").click();
            getByTitle("Save").click();

            await waitFor(() => expect(getByText("Save Failed!")));
        });
    });
});
