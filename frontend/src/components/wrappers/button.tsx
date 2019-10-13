import React from "react";
import {Button as MUIButton} from "@material-ui/core";

interface IButtonProps extends React.HTMLAttributes<HTMLElement> {
    children: string;
    variant?: VariantOptions;
    size?: SizeOptions;
}

type VariantOptions =
    "contained" |
    "outlined" |
    "text";

type SizeOptions =
    "small" |
    "medium" |
    "large";

export default class Button extends React.Component<IButtonProps> {
    public constructor(props: IButtonProps) {
        super(props);
    }

    public render() {
        const {variant, size, children, onClick} = this.props;
        return (
            <MUIButton onClick={onClick} variant={variant} size={size}>{children}</MUIButton>
        );
    }
}
