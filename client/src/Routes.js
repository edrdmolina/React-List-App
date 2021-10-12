// Libraries
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Components
import Home from './pages/Home';
import Lists from './pages/Lists';
import List from './pages/List';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import ForgotPw from './pages/ForgotPw';
import ResetPw from './pages/ResetPw';

export class Routes extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <Switch>
                {/* FRONTEND ROUTES */}
                { isLoggedIn ? (
                    <Route exact path='/'
                        render={ routeProps => <Lists { ...routeProps } /> }
                    />
                ) : (
                    <Route exact path='/'
                        render={ routeProps => <Home { ...routeProps } /> }
                    />
                )}
                <Route exact path='/login'
                    render={ routeProps => <Login { ...routeProps } /> }
                />
                <Route exact path='/register'
                    render={ routeProps => <Register { ...routeProps } /> }
                />
                <Route exact path='/forgot-pw'
                    render={ routeProps => <ForgotPw { ...routeProps } /> }
                />
                <Route exact path='/reset-pw'
                    render={ routeProps => <ResetPw { ...routeProps } /> }
                />
                <Route exact path='/User'
                    render={ routeProps => <User { ...routeProps } /> }
                />
                <Route exact path='/:listId'
                    render={ routeProps => <List { ...routeProps } enteredList={ this.props.enteredList } exitedList={ this.props.exitedList } /> }
                />
                
                {/* 404 NOT FOUND */}
                <Redirect to='/'/>
            </Switch>
        )
    }
}

export default Routes
