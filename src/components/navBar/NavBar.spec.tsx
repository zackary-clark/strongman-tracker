import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import Keycloak from "keycloak-js";
import React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { KeycloakContext } from "../../context/keycloakContext";
import { MAX_ROUTE, MY_EXERCISE_ROUTE, PROGRAM_ROUTE, WORKOUT_ROUTE } from "../../pages/constants";
import { userPreferencesKgMock } from "../../testUtils/commonApolloMocks";
import { createKeycloakMock, createUnauthenticatedKeycloakMock } from "../../testUtils/keycloak";
import { createMatchMedia, MatchMedia } from "../../testUtils/matchMedia";
import { renderWithAllProviders } from "../../testUtils/renderWithProviders";
import { theme } from "../../theme";
import { NavBar } from "./NavBar";

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

        it("should not show nav buttons when not authenticated", () => {
            const mockKeycloak = createUnauthenticatedKeycloakMock();

            renderWithAllProviders(<NavBar />, [], undefined, mockKeycloak);

            expect(screen.getByText("Log In")).toBeInTheDocument();
            expect(screen.queryByText("Workouts")).not.toBeInTheDocument();
            expect(screen.queryByText("Maxes")).not.toBeInTheDocument();
        });

        it("should route to /workouts when Workouts button is clicked", async () => {
            const history = createMemoryHistory();
            const mockKeycloak = createKeycloakMock();
            renderWithHistory(history, mockKeycloak);
            await userEvent.click(screen.getByText("Workouts"));
            expect(history.location.pathname).toBe(WORKOUT_ROUTE);
        });

        it("should route to /maxes when Maxes button is clicked", async () => {
            const history = createMemoryHistory();
            const mockKeycloak = createKeycloakMock();
            renderWithHistory(history, mockKeycloak);
            await userEvent.click(screen.getByText("Maxes"));
            expect(history.location.pathname).toBe(MAX_ROUTE);
        });

        it("should route to /programs when Programs button is clicked", async () => {
            const history = createMemoryHistory();
            const mockKeycloak = createKeycloakMock();
            renderWithHistory(history, mockKeycloak);
            await userEvent.click(screen.getByText("Programs"));
            expect(history.location.pathname).toBe(PROGRAM_ROUTE);
        });
    });

    describe("when on small screen", () => {
        beforeAll(() => {
            window.matchMedia = createMatchMedia("600px");
        });

        it("should open menu on hamburger click, then route correctly on menuitem click", async () => {
            const history = createMemoryHistory();
            const mockKeycloak = createKeycloakMock();
            renderWithHistory(history, mockKeycloak);
            await userEvent.click(screen.getByLabelText("navigation menu"));
            await userEvent.click(await screen.findByText("Maxes"));
            expect(history.location.pathname).toBe(MAX_ROUTE);
        });

        it("should not show menu items when not authenticated", async () => {
            const mockKeycloak = createUnauthenticatedKeycloakMock();

            renderWithAllProviders(<NavBar />, [], undefined, mockKeycloak);

            expect(screen.getByText("Log In")).toBeInTheDocument();

            await userEvent.click(screen.getByLabelText("navigation menu"));

            expect(await screen.findByText("Log In to see more!")).toBeInTheDocument();
            expect(screen.queryByText("Workouts")).not.toBeInTheDocument();
            expect(screen.queryByText("Maxes")).not.toBeInTheDocument();
        });
    });

    describe("Account Menu", () => {
        beforeAll(() => {
            window.matchMedia = createMatchMedia("700px");
        });

        it("should show login button before logging in, and call login on click", async () => {
            const mockKeycloak = createUnauthenticatedKeycloakMock();

            renderWithAllProviders(<NavBar />, [], undefined, mockKeycloak);

            await userEvent.click(screen.getByText("Log In"));

            expect(mockKeycloak.login).toHaveBeenCalled();
        });

        it("should logout on clicking logout in account menu", async () => {
            const mockKeycloak = createKeycloakMock();

            renderWithAllProviders(<NavBar />, [], undefined, mockKeycloak);

            await userEvent.click(screen.getByLabelText("account icon"));
            await userEvent.click(await screen.findByText("Log Out"));

            expect(mockKeycloak.logout).toHaveBeenCalled();
        });

        it("should open Preferences drawer on settings click", async () => {
            const mockKeycloak = createKeycloakMock();

            renderWithAllProviders(<NavBar />, [userPreferencesKgMock], undefined, mockKeycloak);

            await userEvent.click(screen.getByLabelText("account icon"));
            await userEvent.click(await screen.findByText("Preferences"));

            expect(await screen.findByTestId("preferences drawer")).toBeInTheDocument();
        });

        it("should route to My Exercises on account menu item click", async () => {
            const history = createMemoryHistory();
            const mockKeycloak = createKeycloakMock();

            renderWithHistory(history, mockKeycloak);

            await userEvent.click(screen.getByLabelText("account icon"));
            await userEvent.click(await screen.findByText("My Exercises"));

            expect(history.location.pathname).toBe(MY_EXERCISE_ROUTE);
        });
    });
});

const renderWithHistory = (history: MemoryHistory, mockKeycloak: Keycloak) => {
    render(
        <ThemeProvider theme={theme}>
            <HistoryRouter history={history}>
                <KeycloakContext.Provider value={mockKeycloak}>
                    <NavBar />
                </KeycloakContext.Provider>
            </HistoryRouter>
        </ThemeProvider>
    );
};
