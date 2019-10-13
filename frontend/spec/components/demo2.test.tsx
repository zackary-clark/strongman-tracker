import React from "react";
import Demo2 from "../../src/components/demo2/demo2";
import { IDecoratedReactWrapper, mountAndDecorate } from "../test-helpers/enzymeHelpers";

describe("App2", () => {
    let wrapper: IDecoratedReactWrapper;

    beforeEach(() => {
        wrapper = mountAndDecorate(<Demo2 />);
    });
    
    it("Renders Demo 2", () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});
