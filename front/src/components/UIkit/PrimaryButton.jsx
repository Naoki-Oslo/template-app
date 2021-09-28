import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    button: {
        backgroundColor: "#4dd0e1",
        color: "#000",
        fontSize: 14,
        height: 40,
        marginBottom: 16,
        width: 200
    }
});

const PrimaryButton = (props) => {
    const classes = useStyles();

    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()} >
            {props.label}
        </Button>
    );
};

export default PrimaryButton;