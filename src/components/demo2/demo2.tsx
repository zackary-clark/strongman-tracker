import * as React from "react";
import { Button, FormControl, MenuItem, Snackbar, InputLabel, Select } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface IDemo2State {
    open: boolean,
}

export class Demo2 extends React.Component<any, IDemo2State> {
    public constructor(props: any) {
        super(props);
        this.state = {open: false};
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <div className={"demo2"}>
                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    autoHideDuration={5000}
                    open={this.state.open}
                    onClose={this.closeSnackbar}
                >
                    <Alert severity={"error"} variant={"filled"} onClose={this.closeSnackbar}>
                        This is an error.
                    </Alert>
                </Snackbar>
                <Button
                    title="Open Snackbar"
                    variant="contained"
                    color="secondary"
                    onClick={() => {this.setState({open: true});}}
                >
                    Open Snackbar
                </Button><br/>
                <Button variant="contained" aria-label={"contained-default"}>default</Button><br/>
                <Button variant="contained" color={"primary"}>primary</Button><br/>
                <Button variant="contained" color={"secondary"}>secondary</Button><br/>
                <Button variant="contained" disabled>disabled</Button><br/>
                <Button >default</Button><br/>
                <Button color={"primary"}>primary</Button><br/>
                <Button color={"secondary"}>secondary</Button><br/>
                <Button disabled>disabled</Button><br/>
                <Button variant="outlined" >default</Button><br/>
                <Button variant="outlined" color={"primary"}>primary</Button><br/>
                <Button variant="outlined" color={"secondary"}>secondary</Button><br/>
                <Button variant="outlined" disabled>disabled</Button><br/>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

    protected closeSnackbar(event?: React.SyntheticEvent, reason?: string): void {
        this.setState({open: false});
    }
}
