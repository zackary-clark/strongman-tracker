import React from "react";
import {createStyles, Theme} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {compose} from "recompose";
import {MaxComponent} from "./maxComponent";

export const MaxComponentStyles = (theme: Theme) => createStyles({
    button: {
        margin: theme.spacing(1),
    },
});

export const MaxContainer = compose<any, any>(withStyles(MaxComponentStyles, {withTheme: true}))(MaxComponent);
