import React from "react";
import {render, waitFor} from "@testing-library/react";
import { Demo2 } from "../../src/components";
import { defaultSnackbarMessage } from "../../src/context";
import { renderWithSnackbar } from "../test-helpers/testUtils";

describe("Demo2", () => {

    it("should render Demo 2", () => {
        const {getByLabelText} = render(<Demo2 />);
        expect(getByLabelText("contained-default")).toBeInTheDocument();
    });

    it("should Open Snackbar on 'Open Snackbar' click", async () => {
        const {getByTitle, getByText} = renderWithSnackbar(<Demo2 />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText(defaultSnackbarMessage)));
    });
});
