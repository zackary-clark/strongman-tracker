import * as React from "react";
import { Route } from "react-router-dom";
import { ProjectDescription } from "../components/ProjectDescription";

export const RootPage = <Route path="/" element={<ProjectDescription />} />;
