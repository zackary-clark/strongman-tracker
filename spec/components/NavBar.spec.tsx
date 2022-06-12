import React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { NavBar } from "../../src/components/navBar/NavBar";
import { MAX_ROUTE, WORKOUT_ROUTE } from "../../src/pages/constants";
import { theme } from "../../src/theme";

describe("NavBar", () => {
    it("should route to /workouts when Workouts button is clicked", () => {
        const history = createMemoryHistory();
        render(
            <ThemeProvider theme={theme}>
                <HistoryRouter history={history}>
                    <NavBar />
                </HistoryRouter>
            </ThemeProvider>
        );
        screen.getByText("Workouts").click();
        expect(history.location.pathname).toBe(WORKOUT_ROUTE);
    });

    it("should route to /maxes when Maxes button is clicked", () => {
        const history = createMemoryHistory();
        render(
            <ThemeProvider theme={theme}>
                <HistoryRouter history={history}>
                    <NavBar />
                </HistoryRouter>
            </ThemeProvider>
        );
        screen.getByText("Maxes").click();
        expect(history.location.pathname).toBe(MAX_ROUTE);
    });
});
