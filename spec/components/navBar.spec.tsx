import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { NavBar } from "../../src/components";
import { maxRoute, workoutsRoute } from "../../src/components/routes";
import { renderWithRouter } from "../test-helpers/testUtils";
import { theme } from "../../src/theme";

describe("NavBar", () => {
    it("should route to /workouts when Workouts button is clicked", () => {
        const history = createMemoryHistory();
        renderWithRouter(
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <NavBar />
                </Router>
            </ThemeProvider>
        );
        screen.getByText("Workouts").click();
        expect(history.location.pathname).toBe(workoutsRoute);
    });

    it("should route to /maxes when Maxes button is clicked", () => {
        const history = createMemoryHistory();
        renderWithRouter(
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <NavBar />
                </Router>
            </ThemeProvider>
        );
        screen.getByText("Maxes").click();
        expect(history.location.pathname).toBe(maxRoute);
    });
});
