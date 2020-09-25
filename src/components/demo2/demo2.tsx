import * as React from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { MUIClickHandler, withSnackbarContext } from "../../context";

interface IDemo2Props {
    onOpenSnackbar: MUIClickHandler,
}

class Demo2SansContext extends React.Component<IDemo2Props> {
    render(): React.ReactNode {
        return (
            <div className={"demo2"}>
                <Button
                    title="Open Snackbar"
                    variant="contained"
                    color="secondary"
                    onClick={this.props.onOpenSnackbar}
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

export const Demo2 = withSnackbarContext(Demo2SansContext);
