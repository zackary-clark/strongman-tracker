import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import { HashRouter } from "react-router-dom";
import "reset-css";

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById("root"));
