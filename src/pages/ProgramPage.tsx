import * as React from "react";
import { Outlet, Route } from "react-router-dom";
import { NewProgram } from "../components/programs/NewProgram";
import { ProgramsComponent } from "../components/programs/ProgramsComponent";
import { SingleProgramComponent } from "../components/programs/SingleProgramComponent";
import { PROGRAM_ID_PARAM, PROGRAM_ROUTE } from "./constants";
import { RequireAuth } from "./RequireAuth";

export const ProgramPage = (
    <Route path={PROGRAM_ROUTE} element={<RequireAuth><Outlet /></RequireAuth>}>
        <Route index element={<ProgramsComponent />} />
        <Route path="new" element={<NewProgram />} />
        <Route path={`:${PROGRAM_ID_PARAM}`} element={<SingleProgramComponent />} />
    </Route>
);
