import React from "react";
import {render, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import { Demo2 } from "../../src/components";

describe("Demo2", () => {
    jest.setTimeout(10000);

    it("should render Demo 2", () => {
        const {getByLabelText} = render(<Demo2 />);
        expect(getByLabelText("contained-default")).toBeInTheDocument();
    });

    it("should Open Snackbar on 'Open Snackbar' click", async () => {
        const {getByTitle, getByText} = render(<Demo2 />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText("This is an error.")));
    });

    it("should Close Snackbar on clickaway", async () => {
        const {getByTitle, getByText} = render(<Demo2 />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText("This is an error.")));
        getByTitle("Open Snackbar").click();
        await waitForElementToBeRemoved(() => getByText("This is an error."));
    });

    it("should Close Snackbar automatically after 5 seconds", async () => {
        const {getByTitle, getByText} = render(<Demo2 />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText("This is an error.")));
        // TODO: make this take an optional "timeout" prop so this doesn't hang for 5 seconds
        await waitForElementToBeRemoved(() => getByText("This is an error."), {timeout: 5500});
    });

    it("should Close Snackbar when 'X' is clicked", async () => {
        const {getByTitle, getByText} = render(<Demo2 />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText("This is an error.")));
        getByTitle("Close").click();
        await waitForElementToBeRemoved(() => getByText("This is an error."));
    });
});
