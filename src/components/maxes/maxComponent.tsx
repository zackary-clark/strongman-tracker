import * as React from "react";
import { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Box } from "@mui/material";
import { IMax } from "../../data/max";
import { getMaxes, postMax } from "../../webClient";
import { SnackbarContext } from "../../context";

export function MaxComponent(): React.ReactElement {
    const { onOpenSnackbar } = useContext(SnackbarContext);
    const [ maxes, setMaxes ] = useState<IMax[]>([]);

    useEffect(() => {
        getMaxes()
            .then((res) => res.data)
            .then((resData) => {
                setMaxes(resData);
            })
            .catch(e => {
                console.error("Get Failed");
                onOpenSnackbar("Network Error!");
            });
    }, []);

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

    return (
        <Box className={"max-container"}>
            <MaterialTable
                title={"One Rep Max Tracker"}
                columns={[
                    {title: "Date", field: "date", type: "date", initialEditValue: new Date()},
                    {title: "Squat", field: "squat1RM", type: "numeric"},
                    {title: "Bench", field: "bench1RM", type: "numeric"},
                    {title: "Deadlift", field: "deadlift1RM", type: "numeric"},
                    {title: "OHP", field: "press1RM", type: "numeric"},
                ]}
                data={maxes}
                editable={{
                    onRowAdd: addEntry,
                    onRowDelete: () => {
                        return new Promise<void>((resolve, reject) => {
                            setTimeout(() => {
                                resolve();
                            }, 10);
                        });
                    },
                    onRowUpdate: () => {
                        return new Promise<void>((resolve, reject) => {
                            setTimeout(() => {
                                resolve();
                            }, 10);
                        });
                    },
                }}
            />
        </Box>
    );
}
