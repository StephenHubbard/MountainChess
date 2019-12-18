import React from 'react';
import {Switch, Route} from 'react-router-dom';
// import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';
import GameView from './Components/GameView/GameView';
import App from './App'
import Profile from './Components/Profile/Profile';

export default(
    <Switch>
        <Route exact path='/' component={App} />
        {/* <Route exact path='/login' component={Login} /> */}
        {/* <Route exact path='/register' component={Register} /> */}
        <Route path={'/game'} component={GameView} />
        <Route path={'/profile'} component={Profile} />
    </Switch>
)