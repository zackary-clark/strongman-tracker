import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { IMax } from "../../data/max";
import { Button, createStyles, Theme, WithStyles, StyleRules } from "@material-ui/core";
import { ReactElement } from "react";
import MaterialTable from "material-table";
import { getMaxes, postMax } from "../../webClient";

const MaxComponentStyles = (theme: Theme): StyleRules => createStyles({
    button: {
        margin: theme.spacing(1),
    },
});

interface IMaxComponentState {
    maxes: IMax[];
}

class MaxComponentSansTheme extends React.Component<WithStyles<typeof MaxComponentStyles>, IMaxComponentState> {
    public constructor(props: WithStyles<typeof MaxComponentStyles>) {
        super(props);
        this.state = {maxes: []};
    }

    public render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div className={"max-container"}>
                <Button
                    className={`get-maxes ${classes.button}`}
                    onClick={this.getMaxesOnClick}
                    variant={"contained"}
                    color={"primary"}
                >
                    GetMaxes
                </Button>
                {this.generateTable()}
            </div>
        );
    }

    protected generateTable = (): ReactElement => (
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
                    return new Promise((resolve: Function, reject: Function) => {
                        setTimeout(() => {
                            resolve();
                        }, 10);
                    });
                },
                onRowUpdate: () => {
                    return new Promise((resolve: Function, reject: Function) => {
                        setTimeout(() => {
                            resolve();
                        }, 10);
                    });
                },
            }}
        />
    );

    protected addEntry = (newData: IMax): Promise<void | IMax> => {
        return postMax(newData)
            .then(() => {
                const maxes: IMax[] = this.state.maxes;
                maxes.push(newData);
                return this.setState({maxes});
            });
    };

    protected getMaxesOnClick = (): void => {
        getMaxes()
            .then((res: Response) => res.json())
            .then((maxes: IMax[]) => this.setState({maxes}));
    };
}

export const MaxComponent = withStyles(MaxComponentStyles, {withTheme: true})(MaxComponentSansTheme);
