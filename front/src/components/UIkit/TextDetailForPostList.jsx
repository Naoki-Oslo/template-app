import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    row: {
        display: 'flex',
        marginBottom: 16,
    },
    label: {
        fontWeight: 500,
        width: 90,
        textDecoration:"underline",
        textAlign:'left',
    },
    value: {
        marginLeft: 0,
        textAlign:'left',
    },
})

const TextDetailForPostList = (props) => {
    const classes = useStyles();

    return (
            <div className={classes.row}>
                <div>
                    <div className={classes.label}>{props.label}</div>
                </div>
                <div>
                    <div className={classes.value}>{props.value}</div>
                </div>
            </div>
    );
};

export default TextDetailForPostList;