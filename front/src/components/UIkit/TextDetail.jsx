import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton      from '@material-ui/core/IconButton';
import Tooltip         from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const useStyles = makeStyles({
    row: {
        display: 'flex',
        flexFlow: 'row wrap',
        marginBottom: 16,
    },
    label: {
        fontWeight: 500,
        marginLeft: 0,
        marginRight: 'auto',
    },
    value: {
        marginLeft: 'auto',
        marginRight: 0,
    },
})

const TextDetail = (props) => {
    const classes = useStyles();

    const [openTip, setOpenTip] = useState(false);

    const handleCloseTip = () => {
        setOpenTip(false);
    };
    
    const handleClickButton = () => {
        setOpenTip(true);
    };

    return (
            <div className={classes.row}>
                <div className={classes.label}>{props.label}</div>
                <div className={classes.value}>{props.value}</div>
                {props.label === "English" && (
                    <Tooltip
                        arrow
                        open={openTip}
                        onClose={handleCloseTip}
                        disableHoverListener
                        placement='top'
                        title='コピーしました!'
                    >
                    <CopyToClipboard text={props.contentEnglish}>
                        <IconButton
                            onClick={handleClickButton}
                        >
                        <AssignmentIcon />
                        </IconButton>
                    </CopyToClipboard>
                    </Tooltip>
                )
                }                
            </div>
    );
};

export default TextDetail;