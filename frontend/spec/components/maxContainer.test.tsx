import * as React from "react";
import { IDecoratedReactWrapper, mountAndDecorate } from "../test-helpers/enzymeHelpers";
import MaxContainer from "../../src/components/maxes/maxContainer";
import * as WebClient from "../../src/webClient";
import { responseWithJson } from "../test-helpers/shared";
import { sampleMaxesArray, sampleMax } from "../test-helpers/data";
import {Button} from "@material-ui/core";

describe("maxContainer", () => {
    let wrapper: IDecoratedReactWrapper;
    let getMaxesSpy: jest.SpyInstance;
    let postMaxSpy: jest.SpyInstance;
    
    beforeEach(() => {
        wrapper = mountAndDecorate(<MaxContainer />);
        getMaxesSpy = jest.spyOn(WebClient, "getMaxes").mockResolvedValue(responseWithJson(sampleMaxesArray));
        postMaxSpy = jest.spyOn(WebClient, "postMax").mockResolvedValue(responseWithJson());
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

    it("Puts webclient.getMaxes response in state", async () => {
        wrapper.find(Button).simulate("click");
        await wrapper.asyncUpdate();
        expect(wrapper.state("maxes")).toBe(sampleMaxesArray);
    });

    describe("Maxes Table", () => {
        beforeEach(() => {
            wrapper.setState({maxes: sampleMaxesArray});
        });

        it("Renders maxes state as table", () => {
            expect(wrapper.containsMatchingElement(<td>{sampleMaxesArray[0].date}</td>)).toBeTruthy();
        });

        describe("Add Entry", () => {
            beforeAll(async () => {
                // Workaround for testing private members directly
                // @ts-ignore
                wrapper.instance()["addEntry"](sampleMax);
                await wrapper.asyncUpdate();
            });

            it("Calls webclient.postMax with new data on row add", () => {
                expect(postMaxSpy).toHaveBeenCalledWith(sampleMax);
            });

            it("Adds new Entry to table", () => {
                expect(wrapper.containsMatchingElement(<td>{sampleMax.squat1RM}</td>)).toBeTruthy();
            });
        });
    });
});
