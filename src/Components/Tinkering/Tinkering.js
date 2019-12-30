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
                        "wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"], 

            twoClicks: [],
                    }
        this.handleClick = this.handleClick.bind(this);
        }
    
    handleClick(id) {
        

        if (this.state.twoClicks.length === 0) {
            for (let i = 0; i < 64; i++) {
                document.getElementById(this.state.chessGrid[i])
                .classList.remove("yellow");
                document.getElementById(this.state.chessGrid[i])
                .className = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : 'black');
            }
            document.getElementById(id).className = "yellow"
        }
        if (this.state.twoClicks.length === 1) {
            for (let i = 0; i < 64; i++) {
                document.getElementById(this.state.chessGrid[i])
                .classList.remove("yellow2");
                if (document.getElementById(this.state.chessGrid[i]).className !== "yellow") {
                    document.getElementById(this.state.chessGrid[i])
                    .className = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : 'black');
                }
            }
            document.getElementById(id).className = "yellow2"
        }
        if (this.state.twoClicks.length === 2) {
            for (let i = 0; i < 64; i++) {
                document.getElementById(this.state.chessGrid[i])
                .classList.remove("yellow");
                document.getElementById(this.state.chessGrid[i])
                .classList.remove("yellow2");
                document.getElementById(this.state.chessGrid[i])
                .className = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : 'black');
            }
            document.getElementById(id).className = "yellow"
            this.state.twoClicks.splice(0, 2)
        }
        let clickedSquare = document.getElementById(id)
        if (clickedSquare.children[0]) {
            this.state.twoClicks.push(clickedSquare.children[0].id + id)
            // console.log(this.state.twoClicks)
        } else {
            if (this.state.twoClicks[0]) {
                this.state.twoClicks.push(this.state.twoClicks[0].substring(0, 2) + id)
            }
            // console.log(this.state.twoClicks)
        }
        this.movePiece(id)
    }

    async movePiece(id) {
        // let thisIndex = this.state.chessGrid.indexOf(id)
        // let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 8])
        // let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 16])
        // console.log(legalMove1)
        // console.log(legalMove2)
        console.log(this.state.twoClicks)
        if (this.state.twoClicks[1]) {
            let piece = this.state.twoClicks[0].substring(0, 2)
            let square1 = this.state.twoClicks[0].substring(2, 4)
            let square2 = this.state.twoClicks[1].substring(2, 4)
            console.log(square2)
            for (let i = 0; i < 64; i++){
                if (this.state.chessGrid[i] === square1) {
                    // console.log(this.state.chessGrid[i])
                    this.state.placement.splice(i, 1, "")
                }
                if (this.state.chessGrid[i] === square2) {
                    this.state.placement.splice(i, 1, piece)
                    console.log(this.state.placement)
                }
            }
        await this.updateBoard(square2)
        }
    }

    updateBoard(square2) {
        const chessGrid = this.state.chessGrid
        const placement = this.state.placement
        for ( var i = 0; i < 64; i ++) {
            // console.log(placement[i])
            if (placement[i] === "") {
                let piece = document.getElementById(chessGrid[i])
                if (piece.childNodes[0]) {
                    piece.removeChild(piece.childNodes[0])
                }
                // console.log(piece.childNodes)
            }
            if (chessGrid[i] === square2) {
                let piece = document.getElementById(chessGrid[i])
                if (piece.childNodes[0]) {
                    piece.removeChild(piece.childNodes[0])
                }
                if (placement[i] === "bP") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/pawn-b.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "bP"
                }
                if (placement[i] === "bR") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/rook-b.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "bR"
                }
                if (placement[i] === "bN") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/knight-b.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "bN"
                }
                if (placement[i] === "bB") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/bishop-b.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "bB"
                }
                if (placement[i] === "bQ") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/queen-b.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "bQ"
                }
                if (placement[i] === "bK") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/king-b.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "bK"
                }
                if (placement[i] === "wP") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/pawn-w.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "wP"
                }
                if (placement[i] === "wR") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/rook-w.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "wR"
                }
                if (placement[i] === "wN") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/knight-w.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "wN"
                }
                if (placement[i] === "wB") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/bishop-w.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "wB"
                }
                if (placement[i] === "wK") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/king-w.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "wK"
                }
                if (placement[i] === "wQ") {
                    let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                    startingPiece.src = "/assets/Pieces/queen-w.png"
                    startingPiece.className = "piece"
                    startingPiece.id = "wQ"
                }
                
            } 
        }
        // console.log(square2)
        // console.log(this.state.placement)
    }

    handleHover(id) {
        let piece = document.getElementById(id)
        if (piece.childNodes[0]) {
            if (piece.childNodes[0].id === "wP") {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                        if (legalMove1) {
                            legalMove1.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove2) {
                            legalMove2.appendChild(document.createElement("div")).className = "y-dot"
                        }
                    }
                }
            }
        }
    }

    handleHoverOut(id) {
        let piece = document.getElementById(id)
        if (piece.childNodes[0]) {
        if (piece.childNodes[0].id === "wP") {
            for (let i = 0; i < 64; i++) {
                if (this.state.chessGrid[i] === id) {
                    let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        if (legalMove1 && this.state.twoClicks.length !== 1) {
                            let yellowCircle = document.getElementsByClassName("y-dot")
                            while(yellowCircle.length > 0) {
                                yellowCircle[0].parentNode.removeChild(yellowCircle[0])
                            }
                    }
                }
            }
        }
    }

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
            newCell.addEventListener('mouseover', () => this.handleHover(newCell.id))
            newCell.addEventListener('mouseout', () => this.handleHoverOut(newCell.id))

        }
        // Puts correct starting pieces in place
        for ( var i = 0; i < 64; i ++) {
            if (startingPlacement[i] === "bP") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/pawn-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "bP"
            }
            if (startingPlacement[i] === "bR") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/rook-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "bR"
            }
            if (startingPlacement[i] === "bN") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/knight-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "bN"
            }
            if (startingPlacement[i] === "bB") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/bishop-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "bB"
            }
            if (startingPlacement[i] === "bQ") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/queen-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "bQ"
            }
            if (startingPlacement[i] === "bK") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/king-b.png"
                startingPiece.className = "piece"
                startingPiece.id = "bK"
            }
            if (startingPlacement[i] === "wP") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/pawn-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "wP"
            }
            if (startingPlacement[i] === "wR") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/rook-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "wR"
            }
            if (startingPlacement[i] === "wN") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/knight-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "wN"
            }
            if (startingPlacement[i] === "wB") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/bishop-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "wB"
            }
            if (startingPlacement[i] === "wK") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/king-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "wK"
            }
            if (startingPlacement[i] === "wQ") {
                let startingPiece = document.getElementById(chessGrid[i]).appendChild(document.createElement("img"))
                startingPiece.src = "/assets/Pieces/queen-w.png"
                startingPiece.className = "piece"
                startingPiece.id = "wQ"
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


