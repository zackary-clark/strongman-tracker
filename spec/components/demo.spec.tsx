import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { Demo } from "../../src/components";
import { defaultSnackbarMessage } from "../../src/context";
import { renderWithSnackbar } from "../test-helpers/testUtils";
import { theme } from "../../src/theme";

describe("Demo", () => {
    it("should Open Snackbar on 'Open Snackbar' click", async () => {
        renderWithSnackbar(<ThemeProvider theme={theme}><Demo /></ThemeProvider>);
        screen.getByTitle("Open Snackbar").click();
        await waitFor(() => expect(screen.getByText(defaultSnackbarMessage)));
    });
});
