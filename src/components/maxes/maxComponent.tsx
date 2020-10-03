import * as React from "react";
import MaterialTable from "material-table";
import { Button, createStyles, Theme, withStyles, WithStyles, StyleRules } from "@material-ui/core";
import { IMax } from "../../data/max";
import { getMaxes, postMax } from "../../webClient";
import { withSnackbarContext } from "../../context";

const MaxComponentStyles = (theme: Theme): StyleRules => createStyles({
    button: {
        margin: theme.spacing(1),
    },
});

interface IMaxComponentProps extends WithStyles<typeof MaxComponentStyles> {
    onOpenSnackbar: (message?: string) => void,
}

interface IMaxComponentState {
    maxes: IMax[],
}

class MaxComponentSansTheme extends React.Component<IMaxComponentProps, IMaxComponentState> {
    public constructor(props: IMaxComponentProps) {
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
                    title={"Get Maxes"}
                >
                    Get Maxes
                </Button>
                {this.generateTable()}
            </div>
        );
    }

    protected generateTable = (): React.ReactElement => (
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
    );

    protected addEntry = (newData: IMax): Promise<void | IMax> => {
        return postMax(newData)
            .then(() => {
                const maxes: IMax[] = this.state.maxes;
                maxes.push(newData);
                return this.setState({maxes});
            })
            .catch(e => {
                console.error("Save Failed!");
                this.props.onOpenSnackbar("Save Failed!");
            });
    };

    protected getMaxesOnClick = (): void => {
        getMaxes()
            .then((res) => res.data)
            .then((maxes) => this.setState({maxes}))
            .catch(e => {
                console.error("Get Failed");
                this.props.onOpenSnackbar();
            });
    };
}

export const MaxComponent = withSnackbarContext(withStyles(MaxComponentStyles, {withTheme: true})(MaxComponentSansTheme));
