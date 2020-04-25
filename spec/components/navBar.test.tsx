import React from "react";
import NavBar from "../../src/components/navBar/navBar";
import { Link } from "react-router-dom";
import { IDecoratedReactWrapper, mountInRouter } from "../test-helpers/enzymeHelpers";

describe("NavBar", () => {
    let wrapper: IDecoratedReactWrapper;

    beforeEach(() => {
        wrapper = mountInRouter(<NavBar />);
    });

    it("Renders two links for the demos", () => {
        expect(wrapper.find(Link).length).toBe(2);
    });
});
