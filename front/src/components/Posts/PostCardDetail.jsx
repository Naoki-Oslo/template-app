import React from 'react';
import { TextDetail } from 'components/UIkit/index';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 'flex',
            width: '75%',
            maxWidth: '575px'
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'flex',
            width: '75%',
            maxWidth: '575px',
        },
    }
}))


const PostCardDetail = (props) => {
    const classes = useStyles();

    return (
            <div className="p-grid__column">
                <div className={classes.detail}>
                    <TextDetail label={"title"} value={props.title}/>
                    <TextDetail label={"category"} value={props.category}/>
                    <TextDetail label={"subject"} value={props.subject}/>
                    <TextDetail label={"English"} value={props.contentEnglish}/>
                    <TextDetail label={"Japanese"} value={props.contentJapanese}/>
                    <TextDetail label={"tips"} value={props.tips}/>
                </div>
            </div>
        )
};

export default PostCardDetail;