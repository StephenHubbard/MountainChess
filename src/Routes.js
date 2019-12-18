import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

export default function Routes() {
    return (
        <Switch>
            {/* <Route exact path='/login' component={Login} /> */}
            {/* <Route exact path='/register' component={Register} /> */}
        </Switch>
    )
}