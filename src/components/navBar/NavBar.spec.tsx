import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { userPreferencesKgMock } from "../../testUtils/commonApolloMocks";
import { createMatchMedia, MatchMedia } from "../../testUtils/matchMedia";
import { renderWithAllProviders } from "../../testUtils/renderWithProviders";
import { NavBar } from "./NavBar";

let mockIsAuthenticated = true;
const mockLogout = jest.fn();
const mockLoginWithRedirect = jest.fn();
jest.mock("@auth0/auth0-react", () => ({
    useAuth0: () => ({
        isAuthenticated: mockIsAuthenticated,
        logout: mockLogout,
        loginWithRedirect: mockLoginWithRedirect,
    })
}));

describe("NavBar", () => {
    let matchMedia: MatchMedia;

    beforeEach(() => {
        mockIsAuthenticated = true;
        mockLogout.mockReset();
        mockLoginWithRedirect.mockReset();
    });

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
            mockIsAuthenticated = false;

            renderWithAllProviders(<NavBar />);

            expect(screen.getByText("Log In")).toBeInTheDocument();
            expect(screen.queryByText("Workouts")).not.toBeInTheDocument();
            expect(screen.queryByText("Maxes")).not.toBeInTheDocument();
        });

        it("should show nav buttons when authenticated", () => {
            renderWithAllProviders(<NavBar />);

            expect(screen.getByText("Workouts")).toBeInTheDocument();
            expect(screen.getByText("Maxes")).toBeInTheDocument();
            expect(screen.queryByText("Log In")).not.toBeInTheDocument();
        });
    });

    describe("when on small screen", () => {
        beforeAll(() => {
            window.matchMedia = createMatchMedia("600px");
        });

        it("should open menu on hamburger click", async () => {
            renderWithAllProviders(<NavBar />);

            await userEvent.click(screen.getByLabelText("navigation menu"));
            expect(await screen.findByText("Maxes")).toBeInTheDocument();
        });

        it("should not show menu items when not authenticated", async () => {
            mockIsAuthenticated = false;
            
            renderWithAllProviders(<NavBar />);

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
            mockIsAuthenticated = false;

            renderWithAllProviders(<NavBar />);

            await userEvent.click(screen.getByText("Log In"));

            expect(mockLoginWithRedirect).toHaveBeenCalled();
        });

        it("should logout on clicking logout in account menu", async () => {
            renderWithAllProviders(<NavBar />);

            await userEvent.click(screen.getByLabelText("account icon"));
            await userEvent.click(await screen.findByText("Log Out"));

            expect(mockLogout).toHaveBeenCalled();
        });

        it("should open Preferences drawer on settings click", async () => {
            renderWithAllProviders(<NavBar />, [userPreferencesKgMock]);

            await userEvent.click(screen.getByLabelText("account icon"));
            expect(await screen.findByText("My Exercises")).toBeInTheDocument();
            await userEvent.click(await screen.findByText("Preferences"));

            expect(await screen.findByTestId("preferences drawer")).toBeInTheDocument();
        });
    });
});
