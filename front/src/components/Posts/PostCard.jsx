import React from 'react';
import { push } from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { SmallButton } from 'components/UIkit/index';
import { useDispatch } from "react-redux";
import { TextDetail } from 'components/UIkit/index';
import { subString } from 'function/common';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 0 15px 0',
            width: '100%',
            height: 350,
        },
        [theme.breakpoints.up('md')]: {
            margin: 8,
            width: 'calc(50% - 16px)',
            height: 450,
        }
    },
    button: {
        textAlign: 'right',
    },
}));

const PostCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

  return (
    <>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <TextDetail label={"title"} value={props.title}/>
                <TextDetail label={"category"} value={props.category}/>
                <TextDetail label={"subject"} value={props.subject}/>
                <TextDetail label={"English"} value={subString(props.contentEnglish, 100)}/>
                <TextDetail label={"Japanese"} value={subString(props.contentJapanese, 100)}/>
                <TextDetail label={"tips"} value={subString(props.tips, 100)}/>
            </CardContent>
            <CardContent className={classes.button}>
                <SmallButton
                    label={"全文へ"}
                    onClick={() => {dispatch(push('/posts/detail/' + props.id))}}
                />
            </CardContent>
        </Card>
        <div className="module-spacer--medium" />
    </>
 );
}

export default PostCard;