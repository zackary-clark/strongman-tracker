import * as React from "react";
import { useContext } from "react";
import { Button } from "@material-ui/core";
import { render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { defaultSnackbarMessage, SnackbarContextProvider, SnackbarContext } from "../../src/context";
import { Snackbar } from "../../src/components/snackBar";

describe("Snackbar", () => {
    function TestComponent(props: any) {
        const { onOpenSnackbar } = useContext(SnackbarContext);
        return (
            <div>
                <Snackbar autoHideDuration={50}/>
                <Button
                    title={"Open Snackbar"}
                    onClick={() => onOpenSnackbar(props.customMessage)}
                >
                    Open Snackbar
                </Button>
            </div>
        );
    }

    const SUT = (props: any) => (
        <SnackbarContextProvider>
            <TestComponent {...props} />
        </SnackbarContextProvider>
    );

    it("should Open Snackbar on 'Open Snackbar' click with default message", async () => {
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

    it("should display custom error messages", async () => {
        const {getByTitle, getByText} = render(<SUT customMessage={"Custom Message"} />);
        getByTitle("Open Snackbar").click();
        await waitFor(() => expect(getByText("Custom Message")));
    });
});
