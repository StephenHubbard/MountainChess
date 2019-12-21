import React from 'react';
import {Switch, Route} from 'react-router-dom';
// import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';
import GameView from './Components/GameView/GameView';
import App from './App'
import Profile from './Components/Profile/Profile';
import AddFriend from './Components/AddFriend/AddFriend';
import Home from './Components/Home/Home';

export default(
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path={'/game/:id'} component={GameView} />
        <Route path={'/profile/:id'} component={Profile} />
        <Route path={'/addfriend'} component={AddFriend} />
    </Switch>
)