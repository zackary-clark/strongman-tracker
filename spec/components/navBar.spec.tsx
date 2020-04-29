import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NavBar from "../../src/components/navBar/navBar";
import { maxRoute } from "../../src/components/root/routes";
import { renderInRouter } from "../test-helpers/testUtils";

describe("NavBar", () => {
    it("should render two links to the pages", () => {
        const { getAllByRole } = renderInRouter(<NavBar />);
        expect(getAllByRole("button")).toHaveLength(2);
    });

    it("should route to /maxes when Maxes button is clicked", () => {
        const history = createMemoryHistory();
        const { getByRole } = renderInRouter(
            <Router history={history}>
                <NavBar />
            </Router>
        );
        getByRole("button", { name: "go-to-maxes" }).click();
        expect(history.location.pathname).toBe(maxRoute);
    });
});
