import React from 'react';
import { Route, Switch } from 'react-router';
import { SignIn, SignUp, UserMyPage, UserEdit, UserList, PostNew, PostList, PostDetail, PostEdit } from "./templates/index";
import Auth from 'Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path={'/signup'} component={SignUp} />
            <Route exact path={'/signin'} component={SignIn} />

            <Auth>
                <Route exact path="(/)?" component={PostList} />
                <Route exact path={'/users/:id'} component={UserMyPage} />
                <Route exact path={'/users/edit/:id'} component={UserEdit} />
                <Route exact path={'/users/list'} component={UserList} />
                <Route exact path={'/posts/detail/:id'} component={PostDetail} />
                <Route exact path={'/posts/new'} component={PostNew} />
                <Route path={'/posts/edit(/:id)?'} component={PostEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;