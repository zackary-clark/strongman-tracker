import React from "react";
import MaterialTable from "material-table";

interface ITableProps extends React.HTMLAttributes<HTMLElement> {
    columns: IColumn[];
    data: any[];
    title?: string;
    editable?: IEditable;
}

interface IColumn {
    title: string;
    field: string;
    type?: ColTypeOptions;
    lookup?: object;
    editComponent?(props: any): any;
}

interface IEditable {
    onRowAdd(newData: object): Promise<void>;
    onRowUpdate(newData: object, oldData: object): Promise<void>;
    onRowDelete(newData: object): Promise<void>;
}

type ColTypeOptions =
    "boolean" |
    "numeric" |
    "date" |
    "datetime" |
    "time" |
    "currency";

export default class Table extends React.Component<ITableProps> {
    public constructor(props: ITableProps) {
        super(props);
    }

    public render() {
        return (
            // TODO: Figure out why this ignore is necessary
            // @ts-ignore
            <MaterialTable
                // Icons coming from HTML currently, but can be sent in as prop if it becomes necessary
                title={this.props.title}
                columns={this.fixDatePicker()}
                data={this.props.data}
                editable={this.props.editable}
            />
        );
    }

    private fixDatePicker = (): IColumn[] => {
        const cols = this.props.columns;
        for (const column of cols) {
            if (column.type === "date") {
                column.editComponent = props => (
                    <input
                        type="date"
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                    />
                );
            }
        }
        return cols;
    }
}
