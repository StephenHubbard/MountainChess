import React, {Component} from 'react';
import './App.css';
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Demo from "../src/Components/GameView/Chessboard/Demo";
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom'



class App extends Component {
  
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
        <Login />
        <Register />
        <Demo />
        <Demo />
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default withRouter(connect(mapStateToProps, {})(App))