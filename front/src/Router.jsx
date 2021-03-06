import React from 'react';
import { Route, Switch } from 'react-router';
import { SignIn, SignUp, UserMyPage, UserEdit, UserList, PostNew, PostList, PostDetail, PostEdit, TopPage, MemoEdit } from "./templates/index";
import Auth from 'Auth';

const NotFound = () => {
    return(
      <h2>ページが見つかりません</h2>
    )
};

  const Router = () => {
    return (
        <Switch>
            <Route exact path={'/signup'} component={SignUp} />
            <Route exact path={'/signin'} component={SignIn} />
            <Route exact path={'/'} component={TopPage} />
            <Route exact path={'/posts/detail/:id'} component={PostDetail} />
            <Route exact path={'/posts/list(/?)'} component={PostList} />

            <Auth>
                <Route exact path={'/users/:id'} component={UserMyPage} />
                <Route exact path={'/users/edit/:id'} component={UserEdit} />
                <Route exact path={'/users/list'} component={UserList} />
                <Route exact path={'/posts/new'} component={PostNew} />
                <Route path={'/posts/edit(/:id)?'} component={PostEdit} />
                <Route path={'/memos/edit(/:id)?'} component={MemoEdit} />
            </Auth>

            <Route component={NotFound}/>
        </Switch>
    );
};

export default Router;