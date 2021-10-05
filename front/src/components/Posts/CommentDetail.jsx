import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from 'reducks/users/selectors';
import { makeStyles } from '@material-ui/core/styles';
import noProfile from 'assets/img/src/no_profile.png';
import { push } from 'connected-react-router';
import { fetchUsers } from 'reducks/users/operations';

const useStyles = makeStyles({
    comment: {
        height: 300,
        width: 500,
    },
    icon: {
        height: 48,
        width: 48
    }
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
                {user.image === "" ? <img alt="user_picture" src={user.image} className={classes.icon} onClick={() => dispatch(push('/'))} role="button" />
                 : <img alt="no_image_picture" src={noProfile} className={classes.icon} onClick={() => dispatch(push('/users/' + String(props.uid)))} role="button" /> }
                {user.name}
            </section>
            <section className={classes.comment}>
                {props.comment}
            </section>
        </div>
    );
};

export default CommentDetail;