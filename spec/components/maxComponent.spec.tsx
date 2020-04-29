import * as React from "react";
import { render } from "@testing-library/react";
import * as WebClient from "../../src/webClient";
import { MaxComponent } from "../../src/components/maxes";
import { responseWithJson } from "../test-helpers/shared";
import { sampleMaxesArray } from "../test-helpers/data";

describe("maxComponent", () => {
    let getMaxesSpy: jest.SpyInstance;

    beforeEach(() => {
        getMaxesSpy = jest.spyOn(WebClient, "getMaxes").mockResolvedValue(responseWithJson(sampleMaxesArray));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Renders GetMaxes button", () => {
        const { getByRole } = render(<MaxComponent />);
        expect(getByRole("button", { name: "get-maxes" })).toHaveTextContent("GetMaxes");
    });

    it("Calls webclient.getMaxes on 'GetMaxes' click", () => {
        const { getByRole } = render(<MaxComponent />);
        getByRole("button", { name: "get-maxes" }).click();
        expect(getMaxesSpy).toBeCalled();
    });
});
