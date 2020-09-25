import * as React from "react";
import { ReactNode } from "react";
import { Route } from "react-router-dom";
import { NavBar } from "../navBar";
import { Demo2 } from "../demo2";
import { MaxComponent } from "../maxes";
import { demo2Route, maxRoute } from "../routes";
import { Snackbar } from "../snackBar";

export class Root extends React.Component {
    render(): ReactNode {
        return (
            <React.Fragment>
                <Snackbar />
                <NavBar/>
                <Route exact path={maxRoute} component={MaxComponent}/>
                <Route exact path={demo2Route} component={Demo2}/>
            </React.Fragment>
        );
    }
}
