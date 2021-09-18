import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { getPosts } from 'reducks/posts/selectors'
import { push } from 'connected-react-router';
import { SecondaryButton } from 'components/UIkit/index';

const useStyles = makeStyles((theme) => ({
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    },
}))

const PostDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const posts = getPosts(selector);
    const id = window.location.pathname.split('/posts/detail/')[1];      
    const post = posts.find((element) => element.id === Number(id))
    
    const [title, setTitle] = useState(""),
          [subject, setSubject] = useState(""),
          [category, setCategory] = useState(""),
          [contentEnglish, setContentEnglish] = useState(""),
          [contentJapanese, setContentJapanese] = useState(""),
          [tips, setTips] = useState("");

    useEffect(() => {
        setTitle(post.title)
        setSubject(post.subject)
        setCategory(post.category)
        setContentEnglish(post.content_en)
        setContentJapanese(post.content_ja)
        setTips(post.tips)
    },[])

    return (
        <>
            <section className="c-section-wrapin">
                {post && (
                    <div className="p-grid__row">
                        <div className={classes.detail}>
                            <h2 className="u-text__headline">{title}</h2>
                            <p>{subject}</p>
                            <p>{category}</p>
                            <p>{contentEnglish}</p>
                            <p>{contentJapanese}</p>
                            <p>{tips}</p>     
                            <div className="module-spacer--small"/>
                        </div>
                    </div>
                )}
            </section>
            <div className="center">
                <SecondaryButton
                    label={"編集する"}
                    onClick={() => dispatch(push('/posts/edit/' + String(id)))}
                    />
            </div>
        </>
    );
};

export default PostDetail;