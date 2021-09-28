import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
    createStyles({
        "button": {
            backgroundColor: theme.palette.secondary.main,
            color: '#000',
            fontSize: 14,
            height: 40,
            marginBottom: 16,
            width: 200,
            "&:hover": {
                backgroundColor: theme.palette.secondary.light,
            }
        }
    })
)

const SecondaryButton = (props) => {
    const classes = useStyles()

    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
            {props.label}
        </Button>
    );
};

export default SecondaryButton;