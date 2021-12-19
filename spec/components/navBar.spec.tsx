import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen } from "@testing-library/react";
import { NavBar } from "../../src/components";
import { maxRoute, workoutsRoute } from "../../src/components/routes";
import { renderInRouter } from "../test-helpers/testUtils";

describe("NavBar", () => {
    it("should route to /workouts when Workouts button is clicked", () => {
        const history = createMemoryHistory();
        renderInRouter(
            <Router history={history}>
                <NavBar />
            </Router>
        );
        screen.getByRole("button", { name: "go-to-workouts" }).click();
        expect(history.location.pathname).toBe(workoutsRoute);
    });

    it("should route to /maxes when Maxes button is clicked", () => {
        const history = createMemoryHistory();
        renderInRouter(
            <Router history={history}>
                <NavBar />
            </Router>
        );
        screen.getByRole("button", { name: "go-to-maxes" }).click();
        expect(history.location.pathname).toBe(maxRoute);
    });
});
