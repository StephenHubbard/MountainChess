import React from 'react';
import {Switch, Route} from 'react-router-dom';
import GameView from './Components/GameView/GameView';
import AddFriend from './Components/AddFriend/AddFriend';
import Home from './Components/Home/Home';
import About from './Components/About/About'
import chess from './Components/Chess/Chess';

export default(
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path={'/game/:id'} component={GameView} />
        <Route path={'/users'} component={AddFriend} />
        <Route path={'/about'} component={About} />
        <Route path={'/chess'} component={chess} />
    </Switch>
)