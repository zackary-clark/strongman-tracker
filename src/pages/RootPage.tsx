import * as React from "react";
import { Route } from "react-router-dom";
import { ProjectDescription } from "../components/ProjectDescription";
import { ROOT_ROUTE } from "./constants";

export const RootPage = <Route path={ROOT_ROUTE} element={<ProjectDescription />} />;
