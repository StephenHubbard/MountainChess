import React, { Component } from "react";
import "./Tinkering.css";



export default class tinkering extends Component {

    componentDidMount() {
        const chessGrid = [ "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", 
                            "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
                            "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
                            "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
                            "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
                            "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
                            "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
                            "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]
        const startingPlacement = [ "bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR",
                                    "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp",
                                    "", "", "", "", "", "", "", "",
                                    "", "", "", "", "", "", "", "",
                                    "", "", "", "", "", "", "", "",
                                    "", "", "", "", "", "", "", "",
                                    "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp",
                                    "wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR",]
        // Draws Chessboard
        for (var i = 0; i < 64; i++){
            let newCell = document.getElementById("mainChessBoard").appendChild(document.createElement("div"))
            newCell.style.backgroundColor = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : '#ababab')
            newCell.className = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : 'black')
            newCell.id = `${chessGrid[i]}`
        }
        // Puts correct starting pieces in place
        for ( var i = 0; i < 64; i ++) {
            if (startingPlacement[i] === "bp") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/pawn-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "b"
            }
            if (startingPlacement[i] === "wp") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/pawn-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "w"
            }
        }
        console.log(startingPlacement)
    }

    
    render() {
        return (
        <div className="tinkering">
            <div id="mainChessBoard">
            </div>

            <div className="border-letters">
                <div className="bottom-letters">
                    <h1>A</h1>
                    <h1>B</h1>
                    <h1>C</h1>
                    <h1>D</h1>
                    <h1>E</h1>
                    <h1>F</h1>
                    <h1>G</h1>
                    <h1>H</h1>
                </div>
                <div className="left-numbers">
                    <h1>8</h1>
                    <h1>7</h1>
                    <h1>6</h1>
                    <h1>5</h1>
                    <h1>4</h1>
                    <h1>3</h1>
                    <h1>2</h1>
                    <h1>1</h1>
                </div>
            </div>
        </div>
        );
    }
}


