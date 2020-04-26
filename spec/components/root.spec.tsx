import React from "react";
import Root from "../../src/components/root/root";
import { IDecoratedReactWrapper, mountInRouter } from "../test-helpers/enzymeHelpers";
import NavBar from "../../src/components/navBar/navBar";
import { maxRoute, demo2Route } from "../../src/components/root/routes";
import Demo2 from "../../src/components/demo2/demo2";

describe("Root", () => {
    let wrapper: IDecoratedReactWrapper;
    const pseudoRandomString: string = Math.random().toString(36).substring(7);
    const routeArray: string[] = [
        "/",
        maxRoute,
        demo2Route,
        `/${pseudoRandomString}`,
    ];

    it("Always renders NavBar", () => {
        for (const route of routeArray) {
            wrapper = mountInRouter(<Root/>, route);
            expect(wrapper.find(NavBar).length).toBe(1);
        }
    });

    it("Renders MaxContainer at /maxes", () => {
        wrapper = mountInRouter(<Root/>, maxRoute);
        expect(wrapper.find(".max-container").length).toBe(1);
    });

    it("Renders Demo2 at /demo2", () => {
        wrapper = mountInRouter(<Root/>, demo2Route);
        expect(wrapper.find(Demo2).length).toBe(1);
    });
});
