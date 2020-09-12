import * as React from "react";
import { ReactNode } from "react";
import { Route } from "react-router-dom";
import { NavBar } from "../navBar";
import { Demo2 } from "../demo2";
import { MaxComponent } from "../maxes";
import { maxRoute, demo2Route } from "../routes";

export class Root extends React.Component {
    public render(): ReactNode {
        return (
            <React.Fragment>
                <NavBar />
                <Route exact path={maxRoute} component={MaxComponent} />
                <Route exact path={demo2Route} component={Demo2} />
            </React.Fragment>
        );
    }
}
