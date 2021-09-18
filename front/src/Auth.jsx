import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from 'reducks/currentUser/operations';
import { getSignedIn } from 'reducks/currentUser/selectors';
//import { initialFetchPosts } from 'reducks/posts/operations';
//import { initialFetchCategories } from 'reducks/categories/operations';
//import { initialFetchUsers } from 'reducks/users/operations';

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(getCurrentUser())
    }
  }, []);

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
};

export default Auth;
