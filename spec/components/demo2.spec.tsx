import React from "react";
import { render } from "@testing-library/react";
import Demo2 from "../../src/components/demo2/demo2";

describe("App2", () => {
    it("should render Demo 2", () => {
        const { getByLabelText } = render(<Demo2 />);
        expect(getByLabelText("contained-default")).toBeInTheDocument();
    });
});
