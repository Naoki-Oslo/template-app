import React from 'react';
import { getUserId, getUsername } from 'reducks/currentUser/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'reducks/currentUser/operations';

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const username = getUsername;

    return (
        <div>
            <h2>Home</h2>
            <p>ユーザーID : {uid}</p>
            <p>ユーザー名 : {username}</p>
            <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
        </div>
    );
};

export default Home;