import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dasbhoard/Dashboard';
// import Sidebar from './Components/Sidebar/Sidebar'
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
import GameView from "../src/Components/GameView/GameView";
// import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';
// import Demo from "../src/Components/GameView/Chessboard/Demo";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import Profile from "../src/Components/Profile/Profile"

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
        {/* <h1>Mountain Chess</h1> */}
        {/* <Chessboard position="start"/> */}
        {/* <Sidebar /> */}
        <Dashboard />
        {/* <h1>Mountain Chess</h1> */}
        </header> 
        {/* <Chessboard position="start"/> */}
        {/* <GameView /> */}
        <Profile/>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default withRouter(connect(mapStateToProps, {})(App))
