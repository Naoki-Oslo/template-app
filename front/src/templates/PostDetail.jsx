import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import { PrimaryButton } from 'components/UIkit/index';
import { createComment, deletePost } from 'reducks/posts/operations';
import { fetchLikes } from 'reducks/likes/operations';
import { fetchPosts } from 'reducks/posts/operations';
import { TextInput } from 'components/UIkit/index';
import { CommentDetail } from 'components/Posts/index';
import { PostCardDetail } from 'components/Posts/index';
import { SmallButton } from 'components/UIkit/index';
import axios from 'axios';
import no_profile from 'assets/img/src/no_profile.png';
import { getUser } from 'reducks/currentUser/selectors';
import { push } from 'connected-react-router';
import { Like } from 'components/Posts/index';
import { getPosts } from 'reducks/posts/selectors';

const useStyles = makeStyles({
    textField: {
            width: 500,
    },
    icon: {
            height: 48,
            width: 48
    }
});

const PostDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const user = getUser(selector);
    const id = selector.router.location.pathname.split('/posts/detail/')[1];
    const posts = getPosts(selector);
    const post = posts.find((element) => element.id === Number(id))

    const [comment, setComment] = useState(""),
          [comments, setComments] = useState([]);

    const fetchComments = () => {
        return async () => {
        const apiUrl = process.env.REACT_APP_API_V1_URL + '/comments'

        await axios
            .get(apiUrl, {
            headers: {
                'access-token': localStorage.getItem('access_token'),
                client: localStorage.getItem('client'),
                uid: localStorage.getItem('uid'),
            },
            })
            .then((response) => {
            const commentData = response.data.data
            const data = commentData.filter((element) => element.post_id === Number(id))
            setComments(data)
            })
            .catch((error) => {
            console.log('error', error)
            })
        }
    };

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchLikes())
        dispatch(fetchComments())
    },[]);

    const inputComment = useCallback((event) => {
        setComment(event.target.value)
    }, [setComment])

    return (
        <>
        <section className="c-section-wrapin">
            <PostCardDetail 
                id={post.id} key={post.id} title={post.title} category={post.category} subject={post.subject} 
                contentEnglish={post.content_en} contentJapanese={post.content_ja}
                tips={post.tips}
            />
        <div className="left">
            <SmallButton
                label={"編集"}
                onClick={() => dispatch(push('/posts/edit/' + id))}
            />
            {(post.user_id === user.uid) && (
                <SmallButton
                    label={"削除"}
                    onClick={() => dispatch(deletePost(id))}
                />
            )}
            <Like user_id={user.uid} post_id={post.id}/>
        </div>
        <div className="module-spacer--extra-small"/>
        </section>
            <Divider />
            <div className="center">
                <p>投稿者</p>
                <div className="module-spacer--extra-extra-small"/>
                {user.image === "" ? <img alt="user_picture" src={user.image} className={classes.icon} onClick={() => dispatch(push('/'))} role="button" />
                : <img alt="no_image_picture" src={no_profile} className={classes.icon} onClick={() => dispatch(push('/users/' + String(user.uid)))} role="button" /> }
                <div className="module-spacer--extra-extra-small"/>
                <p>{user.name}</p>
                <div className="module-spacer--extra-extra-small"/>
                <p>職種：{user.occupation}</p>
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
                    onClick={() => dispatch(createComment(user.uid, id, comment))}
                />
            </div>
        </>
    );
};

export default PostDetail;