import React, {Component} from 'react';
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
import Demo from "../GameView/Chessboard/Demo";



export default class GameView extends Component {
    constructor() {
        super() 

        this.state = ({
            newNum: 0,
            newNumBackend: 0,
        })
    }


        render() {
            return (
            <div className="game-view">
                <header className="App-header">
                    <h1>Game View Page</h1>
                </header>

                {/* <Chessboard position="start"/> */}
                <Demo />
            </div>
            )
        }
    }