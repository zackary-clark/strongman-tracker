import * as React from "react";
import { useContext, useState } from "react";
import MaterialTable from "material-table";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { IMax } from "../../data/max";
import { getMaxes, postMax } from "../../webClient";
import { SnackbarContext } from "../../context";

const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        margin: theme.spacing(1),
    },
}));

export function MaxComponent(): React.ReactElement {
    const classes = useStyles();
    const { onOpenSnackbar } = useContext(SnackbarContext);
    const [ maxes, setMaxes ] = useState<IMax[]>([]);

    const generateTable = (): React.ReactElement => (
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
            data={maxes}
            editable={{
                onRowAdd: addEntry,
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

    const addEntry = (newData: IMax): Promise<void | IMax> => {
        return postMax(newData)
            .then(res => {
                const newMaxes: IMax[] = maxes.splice(0);
                newMaxes.push(res.data);
                setMaxes(newMaxes);
            })
            .catch(e => {
                console.error("Save Failed");
                onOpenSnackbar("Save Failed!");
            });
    };

    const getMaxesOnClick = (): void => {
        getMaxes()
            .then((res) => res.data)
            .then((resData) => setMaxes(resData))
            .catch(e => {
                console.error("Get Failed");
                onOpenSnackbar("Network Error!");
            });
    };
    
    return (
        <div className={"max-container"}>
            <Button
                className={`get-maxes ${classes.button}`}
                onClick={getMaxesOnClick}
                variant={"contained"}
                title={"Get Maxes"}
            >
                Get Maxes
            </Button>
            {generateTable()}
        </div>
    );
}
