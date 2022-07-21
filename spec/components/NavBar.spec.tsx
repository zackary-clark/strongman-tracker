import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { NavBar } from "../../src/components/navBar/NavBar";
import { MAX_ROUTE, WORKOUT_ROUTE } from "../../src/pages/constants";
import { theme } from "../../src/theme";
import { createKeycloakMock, defaultFakeUser } from "../utils/keycloak";
import { createMatchMedia, MatchMedia } from "../utils/matchMedia";
import { renderWithAllProviders } from "../utils/renderWithProviders";

describe("NavBar", () => {
    let matchMedia: MatchMedia;

    beforeAll(() => {
        matchMedia = window.matchMedia;
    });

    afterAll(() => {
        window.matchMedia = matchMedia;
    });

    describe("when on medium+ screen", () => {
        beforeAll(() => {
            window.matchMedia = createMatchMedia("700px");
        });

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

        it("should show login button before logging in, and call login on click", () => {
            const mockKeycloak = createKeycloakMock(() => true, () => true, defaultFakeUser, false);

            renderWithAllProviders(<NavBar />, [], undefined, mockKeycloak);

            screen.getByText("Log In").click();

            expect(mockKeycloak.login).toHaveBeenCalled();
        });

        it("should logout on clicking logout in account menu", () => {
            const mockKeycloak = createKeycloakMock();

            renderWithAllProviders(<NavBar />, [], undefined, mockKeycloak);

            screen.getByLabelText("account icon").click();
            screen.getByText("Log Out").click();

            expect(mockKeycloak.logout).toHaveBeenCalled();
        });
    });

    describe("when on small screen", () => {
        beforeAll(() => {
            window.matchMedia = createMatchMedia("600px");
        });

        it("should open menu on hamburger click, then route correctly on menuitem click", () => {
            const history = createMemoryHistory();
            render(
                <ThemeProvider theme={theme}>
                    <HistoryRouter history={history}>
                        <NavBar />
                    </HistoryRouter>
                </ThemeProvider>
            );
            screen.getByLabelText("navigation menu").click();
            screen.getByText("Maxes").click();
            expect(history.location.pathname).toBe(MAX_ROUTE);
        });
    });
});
