module.exports = {
    updateBoard: (square2, chessGrid, placement) => {
        // const chessGrid = this.state.chessGrid
        // const placement = this.state.placement
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
    }, 

}