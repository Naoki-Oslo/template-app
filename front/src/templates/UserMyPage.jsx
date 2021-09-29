import React from 'react';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core';
import { SmallButton } from "components/UIkit";
import { getUser } from "reducks/currentUser/selectors";
import { NavTabs } from 'components/Users/index';
import no_profile from 'assets/img/src/no_profile.png';

const useStyles = makeStyles({
    icon: {
            height: 80,
            width: 80
    }
});

const UserMyPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const user = getUser(selector);

    return (
        <div>
            <section className="c-section-container">
                <h2 className="u-text__headline u-text-center">マイページ</h2>
                <div className="module-spacer--extra-small" />
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
            </section>
            <div className="center">
                <SmallButton
                    label={"編集"}
                    onClick={() => dispatch(push('/users/edit/' + String(user.uid)))}
                />
            </div>
            <div className="module-spacer--medium" />
            <div className="my-5 bg-white rounded-md text-xs hover:shadow-2xl transition duration-500 ease-in-out">
                <NavTabs />
            </div>
        </div>
    );
};

export default UserMyPage;