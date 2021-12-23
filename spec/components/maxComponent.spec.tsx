import * as React from "react";
import { render, screen } from "@testing-library/react";
import * as WebClient from "../../src/webClient";
import { MaxComponent } from "../../src/components";
import { defaultAxiosResponse, sampleMax, sampleMaxesArray } from "../test-helpers/data";
import { renderWithSnackbar } from "../test-helpers/testUtils";

describe("maxComponent", () => {
    beforeEach(() => {
        const responseCopyBecauseMaterialTableMutatesEverythingItsPassedBecauseItsBad = {
            ...defaultAxiosResponse,
            data: [...sampleMaxesArray]
        };
        jest.spyOn(WebClient, "getMaxes").mockResolvedValue({...responseCopyBecauseMaterialTableMutatesEverythingItsPassedBecauseItsBad});
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
    
    describe.skip("Add Max", () => {
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

        it("should show snackbar when save fails", async () => {
            jest.spyOn(WebClient, "postMax").mockRejectedValue("error");
            renderWithSnackbar(<MaxComponent />);
            expect(await screen.findByText("123456")).toBeInTheDocument();

            screen.getByTitle("Add").click();
            screen.getByTitle("Save").click();

            expect(await screen.findByText("Save Failed!")).toBeInTheDocument();
        });
    });
});
