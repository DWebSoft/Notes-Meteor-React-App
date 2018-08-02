import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import { Meteor } from "meteor/meteor";

import Signup from "./../ui/Signup";
import Login from "./../ui/Login";
import Dashboard from "./../ui/Dashboard";
import NotFound from "./../ui/NotFound";

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
export const history = createBrowserHistory();

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;

    let isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    let isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.replace('/dashboard');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }
};

const onEnterPublicPage = (Component) => {
    if (Meteor.userId()) {
        return <Redirect to="/dashboard"/>
    } else {
        return <Component/>
    }
};

const onEnterPrivatePage = (Component) => {
    if (!Meteor.userId()) {
        return <Redirect to="/" />
    } else {
        return <Component />
    }
}

export const AppRouter = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => onEnterPublicPage(Login)}/>
            <Route exact path="/signup" render={() => onEnterPublicPage(Signup)}/>
            <Route exact path="/dashboard" render={() => onEnterPrivatePage(Dashboard)}/>
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);