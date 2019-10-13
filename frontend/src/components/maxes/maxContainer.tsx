import React, { ReactElement } from "react";
import {getMaxes, postMax} from "../../webClient";
import Button from "../wrappers/button";
import Table from "../wrappers/table";
import { IMax } from "../../data/max";

interface IMaxContainerState {
    maxes: IMax[];
}
export default class MaxContainer extends React.Component<React.HTMLAttributes<HTMLElement>, IMaxContainerState> {
    public constructor(props: React.HTMLAttributes<HTMLElement>) {
        super(props);
        this.state = {maxes: []};
    }

    public render() {
        return (
            <div className={"max-container"}>
                <Button className={"get-maxes"} onClick={this.getMaxesOnClick} variant={"contained"} >GetMaxes</Button>
                {this.generateTable()}
            </div>
        );
    }

    private generateTable = (): ReactElement => (
        // TODO: This table looks bad on mobile
        <Table
            className={"maxes-table"}
            title={"One Rep Max Tracker"}
            columns={[
                {
                    title: "Date",
                    field: "date",
                    type: "date",
                },
                {title: "Squat", field: "squat1RM", type: "numeric"},
                {title: "Bench", field: "bench1RM", type: "numeric"},
                {title: "Deadlift", field: "deadlift1RM", type: "numeric"},
                {title: "OHP", field: "press1RM", type: "numeric"},
            ]}
            data={this.state.maxes}
            editable={{
                onRowAdd: this.addEntry,
                onRowDelete: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 10);
                    });
                },
                onRowUpdate: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 10);
                    });
                },
            }}
        />
    )

    private addEntry = (newData: IMax) => {
        return postMax(newData)
            .then(() => {
                const maxes = this.state.maxes;
                maxes.push(newData);
                return this.setState({maxes});
            });
    }

    private getMaxesOnClick = (): void => {
        getMaxes()
            .then(res => res.json())
            .then(maxes => this.setState({maxes}));
    }
}
