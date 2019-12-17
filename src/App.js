import React, {Component} from 'react';
import './App.css';
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
<<<<<<< HEAD
// import Demo from "../src/Components/GameView/Chessboard/Demo";
import GameView from "../src/Components/GameView/GameView";
=======
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Demo from "../src/Components/GameView/Chessboard/Demo";
import { connect } from 'react-redux';
>>>>>>> master

import {withRouter} from 'react-router-dom'


<<<<<<< HEAD
export default class App extends Component {
=======

class App extends Component {
>>>>>>> master
  
  render() {
    // random chess game
    // var chess = new Chess();

    //   while (!chess.game_over()) {
    //     var moves = chess.moves();
    //     var move = moves[Math.floor(Math.random() * moves.length)];
    //     chess.move(move);
    //   }
    //   console.log(chess.pgn());
    // end random chess game
    return (
      <div className="App">
        <header className="App-header">
        <h1>Mountain Chess</h1>
        </header> 

        {/* <Chessboard position="start"/> */}
<<<<<<< HEAD
        <GameView />
=======
        <Login />
        <Register />
        <Demo />
        <Demo />
>>>>>>> master
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default withRouter(connect(mapStateToProps, {})(App))