import * as React from "react";
import {IMax} from "../../data/max";
import {Button, WithStyles} from "@material-ui/core";
import {ReactElement} from "react";
import MaterialTable from "material-table";
import {getMaxes, postMax} from "../../webClient";
import {MaxComponentStyles} from "./maxContainer";

interface IMaxComponentState {
    maxes: IMax[];
}

export class MaxComponent extends React.Component<WithStyles<typeof MaxComponentStyles>, IMaxComponentState> {
    public constructor(props: WithStyles<typeof MaxComponentStyles>) {
        super(props);
        this.state = {maxes: []};
    }

    public render() {
        const {classes} = this.props;
        return (
            <div className={"max-container"}>
                <Button
                    className={`get-maxes ${classes.button}`}
                    onClick={this.getMaxesOnClick}
                    variant={"contained"}
                    color={"secondary"}
                >
                    GetMaxes
                </Button>
                {this.generateTable()}
            </div>
        );
    }

    private generateTable = (): ReactElement => (
        // TODO: This table looks bad on mobile
        <MaterialTable
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
