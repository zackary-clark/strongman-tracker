import { Button, FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import * as React from "react";

export default class Demo2 extends React.Component {
    public render(): React.ReactNode {
        return (
            <div className={"demo2"}>
                <Button variant="contained" >default</Button><br/>
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
                <FormControl variant="outlined" >
                    <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                    <Select
                        native
                        label="Age"
                        inputProps={{
                            name: "age",
                            id: "outlined-age-native-simple",
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>
            </div>
        );
    }
}
