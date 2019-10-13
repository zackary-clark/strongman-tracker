import * as React from "react";
import NavBar from "./navBar/navBar";
import { Route } from "react-router-dom";
import MaxContainer from "./maxes/maxContainer";
import Demo2 from "./demo2/demo2";
import { maxRoute, demo2Route } from "../routes";

import "./app.scss";

class App extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <NavBar />
                <Route exact path={maxRoute} component={MaxContainer} />
                <Route exact path={demo2Route} component={Demo2} />
            </React.Fragment>
        );
    }
}

export default App;
