import React from "react";
import { render } from "@testing-library/react";
import Demo2 from "../../src/components/demo2/demo2";

describe("App2", () => {
    it("Renders Demo 2", () => {
        const { getByRole } = render(<Demo2 />);
        expect(getByRole("button", {name: "contained-default"})).toBeInTheDocument();
    });
});
