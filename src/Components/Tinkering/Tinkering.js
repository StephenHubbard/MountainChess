import React, { Component } from "react";
import "./Tinkering.css";



export default class tinkering extends Component {
    constructor() {
        super()
        this.state = {
            chessGrid:[ "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", 
                        "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
                        "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
                        "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
                        "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
                        "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
                        "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
                        "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
                        
            placement:[ "bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR",
                        "bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP",
                        "", "", "", "", "", "", "", "",
                        "", "", "", "", "", "", "", "",
                        "", "", "", "", "", "", "", "",
                        "", "", "", "", "", "", "", "",
                        "wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP",
                        "wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
                    }
        this.handleClick = this.handleClick.bind(this);
        }
    
    handleClick(id) {
        console.log(id)
        for (let i = 0; i < 64; i++) {
            document.getElementById(this.state.chessGrid[i])
            .classList.remove("yellow");
            document.getElementById(this.state.chessGrid[i])
            .className = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : 'black');
        }
        document.getElementById(id).className = "yellow"
    }

    componentDidMount() {
        const chessGrid = this.state.chessGrid
        const startingPlacement = this.state.placement
        // Draws Chessboard
        for (var j = 0; j < 64; j++){
            let newCell = document.getElementById("mainChessBoard").appendChild(document.createElement("div"))
            newCell.className = (parseInt((j / 8) + j) % 2 === 0 ? 'white' : 'black')
            newCell.id = `${chessGrid[j]}`
            newCell.addEventListener('click', () => this.handleClick(newCell.id))
        }
        // Puts correct starting pieces in place
        for ( var i = 0; i < 64; i ++) {
            if (startingPlacement[i] === "bP") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/pawn-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "b"
            }
            if (startingPlacement[i] === "bR") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/rook-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "b"
            }
            if (startingPlacement[i] === "bN") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/knight-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "b"
            }
            if (startingPlacement[i] === "bB") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/bishop-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "b"
            }
            if (startingPlacement[i] === "bQ") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/queen-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "b"
            }
            if (startingPlacement[i] === "bK") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/king-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "b"
            }
            if (startingPlacement[i] === "wP") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/pawn-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "w"
            }
            if (startingPlacement[i] === "wR") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/rook-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "w"
            }
            if (startingPlacement[i] === "wN") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/knight-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "w"
            }
            if (startingPlacement[i] === "wB") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/bishop-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "w"
            }
            if (startingPlacement[i] === "wK") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/king-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "w"
            }
            if (startingPlacement[i] === "wQ") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/queen-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "w"
            }
        }
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


