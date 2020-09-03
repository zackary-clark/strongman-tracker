import * as React from "react";
import { Button, FormControl, MenuItem, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

export class Demo2 extends React.Component {
    public render(): React.ReactNode {
        return (
            <div className={"demo2"}>
                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    open={true}
                >
                    <Alert severity={"error"} variant={"filled"}>
                        This is an error.
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "center"}}
                    open={true}
                >
                    <Alert severity={"info"} variant={"filled"}>
                        This is an info.
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "left"}}
                    open={true}
                >
                    <Alert severity={"success"} variant={"filled"}>
                        This is a success.
                    </Alert>
                </Snackbar>
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
}
