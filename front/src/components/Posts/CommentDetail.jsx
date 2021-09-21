import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from 'reducks/users/selectors';
import { makeStyles } from '@material-ui/core/Styles';
import noProfile from 'assets/img/src/no_profile.png';
import { push } from 'connected-react-router';
import { fetchUsers } from 'reducks/users/operations';

const useStyles = makeStyles({
    comment: {
        height: 300,
        width: 500,
    },
});

const CommentDetail = (props) => {   
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const users = getUsers(selector);
    const user = users.find((element) => element.id === props.uid)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <div className="p-grid__row">
            <section className="p-grid__row">
                {user.image === "" ? <img alt="user_picture" src={user.image} width={10} height={10} onClick={() => dispatch(push('/'))} role="button" /> : <img alt="no_image_picture" src={noProfile} width={250} height={100} onClick={() => dispatch(push('/'))} role="button" /> }
                {user.name}
            </section>
            <section className={classes.comment}>
                {props.comment}
            </section>
        </div>
    );
};

export default CommentDetail;