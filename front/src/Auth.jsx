import queryString from 'query-string'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listenAuthState } from 'reducks/users/operations'
import { getSignedIn } from 'reducks/users/selectors'

require('dotenv').config();

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {

    let tokens = queryString.parse(window.location.search)

    if (tokens['auth_token']) {
      localStorage.setItem('auth_token', tokens.auth_token)
      localStorage.setItem('client_id', tokens.client_id)
      localStorage.setItem('uid', tokens.uid)

      window.location.href = process.env.REACT_APP_BASE_URL + '/'
      // window.location.href = "http://localhost:8000"
    } else if (!isSignedIn) {
        dispatch(listenAuthState())
    }
  }, [dispatch, isSignedIn]);

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
};

export default Auth;
