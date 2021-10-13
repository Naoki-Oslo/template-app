import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton      from '@material-ui/core/IconButton';
import Tooltip         from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
                <div>
                    <div className={classes.label}>{props.label}</div>
                </div>
                <div>
                    <div className={classes.value}>{props.value}</div>
                </div>
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
                        <ContentCopyIcon />
                        </IconButton>
                    </CopyToClipboard>
                    </Tooltip>
                )}
                <div className="module-spacer--small" />
            </div>
    );
};

export default TextDetail;