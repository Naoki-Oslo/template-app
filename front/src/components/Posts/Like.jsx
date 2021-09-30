import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { createLikes, deleteLikes } from 'reducks/likes/operations';
import { getLikes } from 'reducks/likes/selectors';
import { fetchLikes } from 'reducks/likes/operations';

const Like = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state)
    const [likeState, setLikeState] = useState(true)
    const likesAll = getLikes(selector);
    const likes = likesAll.filter((element) => element.post_id === Number(props.post_id));
    const check = likes.find((element) => element.user_id === Number(props.user_id));

    const handleLike = () => {
        if (check) {
            dispatch(deleteLikes(check))
            setLikeState(false)
        } else {
            dispatch(createLikes(props.post_id, props.user_id))
            setLikeState(true)
        }
    }

    useEffect(() => {
        dispatch(fetchLikes())
    },[likeState])

  return (
        <div>
            <span>いいね！</span>
            <IconButton onClick={handleLike} aria-label="like">
            {likeState ? <FavoriteIcon style={{color: 'red'}}/> : <FavoriteBorderOutlinedIcon/>}
            </IconButton>
            {likes.length}
        </div>
    )
};

export default Like;

