import * as React from "react";
import { IDecoratedReactWrapper, mountAndDecorate } from "../test-helpers/enzymeHelpers";
import { MaxComponent } from "../../src/components/maxes";
import * as WebClient from "../../src/webClient";
import { responseWithJson } from "../test-helpers/shared";
import { sampleMaxesArray } from "../test-helpers/data";
import { Button } from "@material-ui/core";

describe("maxComponent", () => {
    let wrapper: IDecoratedReactWrapper;
    let getMaxesSpy: jest.SpyInstance;

    beforeEach(() => {
        wrapper = mountAndDecorate(<MaxComponent />);
        getMaxesSpy = jest.spyOn(WebClient, "getMaxes").mockResolvedValue(responseWithJson(sampleMaxesArray));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Renders GetMaxes button", () => {
        expect(wrapper.find(Button).text()).toBe("GetMaxes");
    });

    it("Calls webclient.getMaxes on 'GetMaxes' click", () => {
        wrapper.find(Button).simulate("click");
        expect(getMaxesSpy).toBeCalled();
    });
});
