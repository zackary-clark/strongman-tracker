import React, { FunctionComponent, ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export const renderInRouter = (ui: ReactElement<any>, path?: string) => {
    // @ts-ignore
    const RoutingWrapper: FunctionComponent = ({children}) => {
        return (
            <MemoryRouter initialEntries={[path ? path : "/"]}>
                {children}
            </MemoryRouter>
        );
    };
    return render(ui, {wrapper: RoutingWrapper});
};
