import { ReactNode } from "react";
import * as React from "react";
import NavBar from "../navBar/navBar";
import { Route } from "react-router-dom";
import { MaxComponent } from "../maxes";
import Demo2 from "../demo2/demo2";
import { maxRoute, demo2Route } from "./routes";

class Root extends React.Component {
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

export default Root;
