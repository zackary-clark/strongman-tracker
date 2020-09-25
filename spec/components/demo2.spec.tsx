import React from "react";
import {render, waitFor} from "@testing-library/react";
import { Demo2 } from "../../src/components";
import { defaultSnackbarMessage, provideSnackbarContext } from "../../src/context";
import { Snackbar } from "../../src/components/snackBar";

describe("Demo2", () => {

    it("should render Demo 2", () => {
        const SUT = provideSnackbarContext(Demo2);
        const {getByLabelText} = render(<SUT />);
        expect(getByLabelText("contained-default")).toBeInTheDocument();
    });

    it("should Open Snackbar on 'Open Snackbar' click", async () => {
        const demo2AndSnackbar = (props: any) => (
            <React.Fragment>
                <Demo2 />
                <Snackbar />
            </React.Fragment>
        );
        const SUT = provideSnackbarContext(demo2AndSnackbar);

        const {getByTitle, getByText} = render(<SUT />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText(defaultSnackbarMessage)));
    });
});
