import React from 'react';
import { push } from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('md')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16 8',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
}));

const PostCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

  return (
    <Card className={classes.root}>
        <CardContent className={classes.content}>
            <Typography className={classes.content} color="textSecondary" component="p">
                title:{props.title}
            </Typography>
            <Typography className={classes.content} color="textSecondary" component="p">
                category:{props.category}
            </Typography>
            <Typography className={classes.content} color="textSecondary" component="p">
                subject:{props.subject}
            </Typography>
            <Typography className={classes.content} color="textSecondary" component="p">
                contentEnglish:{props.contentEnglish}
            </Typography>
            <Typography className={classes.content} color="textSecondary" component="p">
                contentJapanese:{props.contentJapanese}
            </Typography>
            <Typography className={classes.content} color="textSecondary" component="p">
                tips:{props.tips}
            </Typography>
        </CardContent>
        <Button size="small" onClick={() => {
            dispatch(push('/posts/detail/' + props.id))}}>
            全文へ
        </Button>
    </Card>
  );
}

export default PostCard;