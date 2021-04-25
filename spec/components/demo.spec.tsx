import React from "react";
import { waitFor} from "@testing-library/react";
import { Demo } from "../../src/components";
import { defaultSnackbarMessage } from "../../src/context";
import { renderWithSnackbar } from "../test-helpers/testUtils";

describe("Demo", () => {
    it("should Open Snackbar on 'Open Snackbar' click", async () => {
        const {getByTitle, getByText} = renderWithSnackbar(<Demo />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText(defaultSnackbarMessage)));
    });
});
