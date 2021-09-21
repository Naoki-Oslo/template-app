import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { getPosts } from 'reducks/posts/selectors'
import { fetchPosts } from 'reducks/posts/operations';
import { push } from 'connected-react-router';
import { SmallButton } from 'components/UIkit/index';
import { TextDetail } from 'components/UIkit/index';
import { Divider } from '@material-ui/core';
import { PrimaryButton } from 'components/UIkit/index';
import { createComment } from 'reducks/posts/operations';
import { TextInput } from 'components/UIkit/index';
import axios from 'axios';
import { CommentDetail } from 'components/Posts/index';
import { getUserId } from 'reducks/currentUser/selectors';
import { fetchUsers } from 'reducks/users/operations';

const useStyles = makeStyles((theme) => ({
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 'flex',
            width: 'flex',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'flex',
            width: 'flex',
        },
        textField: {
            width: 500,
        }
    },
}))

const PostDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const posts = getPosts(selector);
    const uid = getUserId(selector);
    const id = window.location.pathname.split('/posts/detail/')[1];      
    const post = posts.find((element) => element.id === Number(id))
    
    const [title, setTitle] = useState(""),
          [subject, setSubject] = useState(""),
          [category, setCategory] = useState(""),
          [contentEnglish, setContentEnglish] = useState(""),
          [contentJapanese, setContentJapanese] = useState(""),
          [tips, setTips] = useState(""),
          [comment, setComment] = useState(""),
          [comments, setComments] = useState([]);


    const fetchComments = (id) => {
        return async () => {
        const apiUrl = process.env.REACT_APP_API_V1_URL + '/comments'
        const data = {
            post_id: id
        }

        await axios
            .get(apiUrl, data, {
            headers: {
                'access-token': localStorage.getItem('access_token'),
                client: localStorage.getItem('client'),
                uid: localStorage.getItem('uid'),
            },
            })
            .then((response) => {
            const commentData = response.data.data
            setComments(commentData)
            })
            .catch((error) => {
            console.log('error', error)
            })
        }
    };

    useEffect(() => {
        dispatch(fetchPosts()),
        dispatch(fetchUsers()),
        dispatch(fetchComments(id))
    },[]);

    useEffect(() => {
        setTitle(post.title)
        setSubject(post.subject)
        setCategory(post.category)
        setContentEnglish(post.content_en)
        setContentJapanese(post.content_ja)
        setTips(post.tips)
    },[]);

    const inputComment = useCallback((event) => {
        setComment(event.target.value)
    }, [setComment])

    return (
        <>
            <section className="c-section-wrapin">
                {post && (
                    <div className="p-grid__column">
                        <div className={classes.detail}>
                            <TextDetail label={"title"} value={title}/>
                            <TextDetail label={"category"} value={category}/>
                            <TextDetail label={"subject"} value={subject}/>
                            <TextDetail label={"English"} value={contentEnglish}/>
                            <TextDetail label={"Japanese"} value={contentJapanese}/>
                            <TextDetail label={"tips"} value={tips}/>
                        </div>
                    </div>
                )}
                <div className="left">
                    <SmallButton
                        label={"編集"}
                        onClick={() => dispatch(push('/posts/edit/' + id))}
                    />
                </div>
            </section>
            <Divider />
            <div className="center">
                <p>投稿者</p>
                <p>Name</p>
                <p>職種：</p>
            </div>
            <Divider />
            <div className="center">
                <p>コメント欄</p>
                {comments.length > 0 && (
                    comments.map(comment => (
                        <CommentDetail
                            id={comment.id} key={comment.id} comment={comment.comment} uid={comment.user_id}
                        />
                    ))
                )}
                <div className="c-section-container">
                    <TextInput
                        fullWidth={true} label={"コメント"} multiline={true} required={false}
                        onChange={inputComment} rows={5} value={comment} type={"text"}
                        placeholder="200字以内でコメントできます" className={classes.textField}
                    />
                </div>
                <br></br>
                <PrimaryButton
                    label={"コメントする"}
                    onClick={() => dispatch(createComment(uid, id, comment))}
                />
            </div>
        </>
    );
};

export default PostDetail;