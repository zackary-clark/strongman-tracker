import * as React from "react";
import { useContext } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { SnackbarContext } from "../../context";

export function Demo(): React.ReactElement {
    const {onOpenSnackbar} = useContext(SnackbarContext);

    return (
        <div className={"demo"}>
            <h1>Styling Demo</h1>
            <Button
                title="Open Snackbar"
                variant="contained"
                color="secondary"
                onClick={() => onOpenSnackbar()}
            >
                Open Snackbar
            </Button><br/>
            <Button variant="contained" aria-label={"contained-default"}>default</Button><br/>
            <Button variant="contained" color={"primary"}>primary</Button><br/>
            <Button variant="contained" color={"secondary"}>secondary</Button><br/>
            <Button variant="contained" disabled>disabled</Button><br/>
            <Button>default</Button><br/>
            <Button color={"primary"}>primary</Button><br/>
            <Button color={"secondary"}>secondary</Button><br/>
            <Button disabled>disabled</Button><br/>
            <Button variant="outlined">default</Button><br/>
            <Button variant="outlined" color={"primary"}>primary</Button><br/>
            <Button variant="outlined" color={"secondary"}>secondary</Button><br/>
            <Button variant="outlined" disabled>disabled</Button><br/>
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    value={""}
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
