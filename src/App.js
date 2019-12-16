import React, {Component} from 'react';
import './App.css';
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
// import Demo from "../src/Components/GameView/Chessboard/Demo";
import GameView from "../src/Components/GameView/GameView";



export default class App extends Component {
  
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
        <GameView />
      </div>
    )
  }
}