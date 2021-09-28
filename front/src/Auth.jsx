import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listenAuthState } from 'reducks/currentUser/operations';
import { getSignedIn } from 'reducks/currentUser/selectors';

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, []);

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
};


export default Auth;
