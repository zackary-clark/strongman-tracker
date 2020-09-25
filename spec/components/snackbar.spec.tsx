import * as React from "react";
import { Button } from "@material-ui/core";
import { render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { defaultSnackbarMessage, provideSnackbarContext, withSnackbarContext } from "../../src/context";
import { Snackbar } from "../../src/components/snackBar";

describe("Snackbar", () => {
    const testComponent = (props: any) => (
        <div>
            <Snackbar autoHideDuration={50} />
            <Button
                title={"Open Snackbar"}
                onClick={props.onOpenSnackbar}
            >
                Open Snackbar
            </Button>
        </div>
    );

    const SUT = provideSnackbarContext(withSnackbarContext(testComponent));

    it("should Open Snackbar on 'Open Snackbar' click", async () => {
        const {getByTitle, getByText} = render(<SUT />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText(defaultSnackbarMessage)));
    });

    it("should Close Snackbar on clickaway", async () => {
        const {getByTitle, getByText} = render(<SUT />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText(defaultSnackbarMessage)));
        getByTitle("Open Snackbar").click();
        await waitForElementToBeRemoved(() => getByText(defaultSnackbarMessage));
    });

    it("should Close Snackbar automatically after 50ms (as specified in SUT)", async () => {
        const {getByTitle, getByText} = render(<SUT />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText(defaultSnackbarMessage)));
        await waitForElementToBeRemoved(() => getByText(defaultSnackbarMessage));
    });

    it("should Close Snackbar when 'X' is clicked", async () => {
        const {getByTitle, getByText} = render(<SUT />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText(defaultSnackbarMessage)));
        getByTitle("Close").click();
        await waitForElementToBeRemoved(() => getByText(defaultSnackbarMessage));
    });

    it("should display custom error messages", () => {
        expect(true).toBe(false);
    });
});