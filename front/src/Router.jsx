import React from 'react';
import { Route, Switch } from 'react-router';
import { Home, SignIn, SignUp } from "./templates/index";
import Auth from 'Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/" component={Home} />

            <Auth>
            </Auth>
        </Switch>
    );
};

export default Router;