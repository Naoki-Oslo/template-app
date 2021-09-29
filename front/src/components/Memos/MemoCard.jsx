import React from 'react';
import { push } from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { SmallButton } from 'components/UIkit/index';
import { useDispatch } from "react-redux";
import { TextDetailForPostList } from 'components/UIkit/index';
import { subString } from 'function/common';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 0 15px 0',
            width: '100%',
            height: 'flex',
        },
        [theme.breakpoints.up('md')]: {
            margin: 8,
            width: 'calc(50% - 16px)',
            height: 'flex',
        }
    },
    button: {
        textAlign: 'right',
    },
}));

const MemoCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

  return (
    <>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <TextDetailForPostList label={"title"} value={props.title}/>
                <TextDetailForPostList label={"category"} value={props.category}/>
                <TextDetailForPostList label={"subject"} value={props.subject}/>
                <TextDetailForPostList label={"English"} value={subString(props.contentEnglish, 100)}/>
                <TextDetailForPostList label={"Japanese"} value={subString(props.contentJapanese, 100)}/>
                <TextDetailForPostList label={"tips"} value={subString(props.tips, 100)}/>
            </CardContent>
            <CardContent className={classes.button}>
                <SmallButton
                    label={"編集"}
                    onClick={() => {dispatch(push('/memos/edit/' + props.id))}}
                />
            </CardContent>
        </Card>
        <div className="module-spacer--medium" />
    </>
 );
}

export default MemoCard;