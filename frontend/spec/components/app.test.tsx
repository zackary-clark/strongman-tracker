import React from "react";
import App from "../../src/components/app";
import { IDecoratedReactWrapper, mountInRouter } from "../test-helpers/enzymeHelpers";
import NavBar from "../../src/components/navBar/navBar";
import { maxRoute, demo2Route } from "../../src/routes";
import MaxContainer from "../../src/components/maxes/maxContainer";
import Demo2 from "../../src/components/demo2/demo2";

describe("App", () => {
    let wrapper: IDecoratedReactWrapper;
    const pseudoRandomString = Math.random().toString(36).substring(7);
    const routeArray = [
        "/",
        maxRoute,
        demo2Route,
        `/${pseudoRandomString}`,
    ];
    
    it("Always renders NavBar", () => {
        for (const route of routeArray) {
            wrapper = mountInRouter(<App/>, route);
            expect(wrapper.find(NavBar).length).toBe(1);
        }
    });

    it("Renders MaxContainer at /maxes", () => {
        wrapper = mountInRouter(<App/>, maxRoute);
        expect(wrapper.find(MaxContainer).length).toBe(1);
    });
    
    it("Renders Demo2 at /demo2", () => {
        wrapper = mountInRouter(<App/>, demo2Route);
        expect(wrapper.find(Demo2).length).toBe(1);
    });
});
