import { userEvent } from "@testing-library/user-event";
import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { defaultSnackbarMessage, SnackbarContext, SnackbarContextProvider } from "../../context/snackbarContext";
import { Snackbar } from "./Snackbar";

describe("Snackbar", () => {
    function TestComponent(props: any) {
        const { openSnackbar } = useContext(SnackbarContext);
        return (
            <Box>
                <Snackbar autoHideDuration={props.autoHideDuration || 20000}/>
                <Button
                    title={"Open Snackbar"}
                    onClick={() => openSnackbar("error", props.customMessage)}
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
        await userEvent.click(screen.getByTitle("Open Snackbar"));
        await waitFor(() => expect(screen.getByText(defaultSnackbarMessage)));
    });

    it("should Close Snackbar automatically after 50ms", async () => {
        render(<SUT autoHideDuration={50}/>);
        await userEvent.click(screen.getByTitle("Open Snackbar"));
        await waitFor(() => expect(screen.getByText(defaultSnackbarMessage)));
        await waitForElementToBeRemoved(() => screen.queryByText(defaultSnackbarMessage));
    });

    it("should Close Snackbar when 'X' is clicked", async () => {
        render(<SUT />);
        await userEvent.click(screen.getByTitle("Open Snackbar"));
        await waitFor(() => expect(screen.getByText(defaultSnackbarMessage)));
        await userEvent.click(screen.getByTitle("Close"));
        await waitForElementToBeRemoved(() => screen.queryByText(defaultSnackbarMessage));
    });

    it("should display custom error messages", async () => {
        render(<SUT customMessage={"Custom Message"} />);
        await userEvent.click(screen.getByTitle("Open Snackbar"));
        await waitFor(() => expect(screen.getByText("Custom Message")));
    });
});
