import * as React from "react";
import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { defaultSnackbarMessage, SnackbarContext, SnackbarContextProvider } from "../../src/context";
import { Snackbar } from "../../src/components/snackBar";

describe("Snackbar", () => {
    function TestComponent(props: any) {
        const { onOpenSnackbar } = useContext(SnackbarContext);
        return (
            <Box>
                <Snackbar autoHideDuration={props.autoHideDuration || 20000}/>
                <Button
                    title={"Open Snackbar"}
                    onClick={() => onOpenSnackbar(props.customMessage)}
                >
                    Open Snackbar
                </Button>
                <Box>Dummy Box</Box>
            </Box>
        );
    }

    const SUT = (props: any) => (
        <SnackbarContextProvider>
            <TestComponent {...props} />
        </SnackbarContextProvider>
    );

    it("should Open Snackbar on 'Open Snackbar' click with default message", async () => {
        render(<SUT />);
        screen.getByTitle("Open Snackbar").click();
        await waitFor(() => expect(screen.getByText(defaultSnackbarMessage)));
    });

    it("should Close Snackbar automatically after 50ms", async () => {
        render(<SUT autoHideDuration={50}/>);
        screen.getByTitle("Open Snackbar").click();
        await waitFor(() => expect(screen.getByText(defaultSnackbarMessage)));
        await waitForElementToBeRemoved(() => screen.getByText(defaultSnackbarMessage));
    });

    it("should Close Snackbar when 'X' is clicked", async () => {
        render(<SUT />);
        screen.getByTitle("Open Snackbar").click();
        await waitFor(() => expect(screen.getByText(defaultSnackbarMessage)));
        screen.getByTitle("Close").click();
        await waitForElementToBeRemoved(() => screen.getByText(defaultSnackbarMessage));
    });

    it("should display custom error messages", async () => {
        render(<SUT customMessage={"Custom Message"} />);
        screen.getByTitle("Open Snackbar").click();
        await waitFor(() => expect(screen.getByText("Custom Message")));
    });
});
