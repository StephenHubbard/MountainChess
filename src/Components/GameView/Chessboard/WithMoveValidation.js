import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import axios from 'axios';
import io from 'socket.io-client'




class HumanVsHuman extends Component {
    static propTypes = { children: PropTypes.func };
    constructor(props) {
        super(props)
        
        this.state = {
            fen: "start",
            // square styles for active drop square
            dropSquareStyle: {},
            // custom square styles
            squareStyles: {},
            // square with the currently clicked piece
            pieceSquare: "",
            // currently clicked square
            square: "",
            // array of past game moves
            history: [],
        };
        this.socket = io.connect(':4030')
        this.socket.on('game response', data => this.updateGame(data))
    }
        
    async componentDidMount() {
        this.game = new Chess();
        this.socket.emit('new game', {g_id: 1})

        // await this.setState({
        //     fen: "rnbqkbnr/ppp1pppp/8/3p4/6P1/4P3/PPPP1P1P/RNBQKBNR b KQkq g3 0 2",
        //     history: [
        //         {
        //         color: "w",
        //         from: "c2",
        //         to: "c3",
        //         flags: "n",
        //         piece: "p",
        //         san: "c3",
        //         }, 
        //         {
        //         color: "b",
        //         from: "c7",
        //         to: "c5",
        //         flags: "b",
        //         piece: "p",
        //         san: "c5",
        //         }
        //     ]
        // })
        // await console.log(this.state)
        
    }

    updateGame(data) { 
        console.log(data)
        this.setState({
            fen: data.state.fen,
            history: data.state.history,
            dropSquareStyle: data.state.dropSquareStyle,
            squareStyles: data.state.squareStyles,
            pieceSquare: data.state.pieceSquare,
            square: data.state.square,
        })
        // console.log("test")
        // this.game = "test"
        // console.log(this.game)
        // chess.move({ from: 'e7', to: 'e6' });
        // console.log(this.game.moves({ verbose: true }))
        // console.log(this.game.move({ from: 'g2', to: 'g3' }))
        // this.game = "test"
        // this.game = data.socketGame
        this.game.move({
            from: data.state.history[data.state.history.length - 1].from,
            to: data.state.history[data.state.history.length - 1].to,
            promotion: 'q'
        });
        // this.game.put({ type: data.state.history[data.state.history.length - 1].piece, color: data.state.history[data.state.history.length - 1].color }, data.state.history[data.state.history.length - 1].to)
        // this.game.remove(data.state.history[data.state.history.length - 1].from)

        // console.log(data.state.history[data.state.history.length - 1])
        console.log(this.game.history ({ verbose: true }))
        

    }

    // keep clicked square style and remove hint squares
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
        squareStyles: squareStyling({ pieceSquare, history })
        }));
    };

    // show possible moves
    highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
        (a, c) => {
            return {
            ...a,
            ...{
                [c]: {
                background:
                    "radial-gradient(circle, #99d9f7 36%, transparent 40%)",
                borderRadius: "50%"
                }
            },
            ...squareStyling({
                history: this.state.history,
                pieceSquare: this.state.pieceSquare
            })
            };
        },
        {}
        );

        this.setState(({ squareStyles }) => ({
        squareStyles: { ...squareStyles, ...highlightStyles }
        }));
    };

    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = this.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // always promote to a queen for example simplicity
        });
        // console.log(move)
        
        // illegal move
        if (move === null) return;
        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            // * commenting this out, but was originally part of code.
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));
        // * function added to both drag and drop and click
        this.newMoveFn();
        this.updateFen();
        
    };

    onMouseOverSquare = square => {
        // get list of possible moves for this square
        let moves = this.game.moves({
        square: square,
        verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
        squaresToHighlight.push(moves[i].to);
        }

        this.highlightSquare(square, squaresToHighlight);
    };

    onMouseOutSquare = square => this.removeHighlightSquare(square);

    // central squares get diff dropSquareStyles
    onDragOverSquare = square => {
        this.setState({
        dropSquareStyle:
            square === "e4" || square === "d4" || square === "e5" || square === "d5"
            ? { backgroundColor: "cornFlowerBlue" }
            : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
        });
    };

    onSquareClick = async square => {
        this.setState(({ history }) => ({
        squareStyles: squareStyling({ pieceSquare: square, history }),
        pieceSquare: square
        }));

        let move = this.game.move({
        from: this.state.pieceSquare,
        to: square,
        promotion: "q" // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            // * commenting this out, but was originally part of code.

            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));
        // * changed to an async function so state was updating correctly
        await this.setState({
        fen: this.game.fen(),
            // * commenting this out, but was originally part of code.

        history: this.game.history({ verbose: true }),
        pieceSquare: ""
        });
        await this.newMoveFn()
        await this.updateFen()
        // console.log(this.game.history)
        
    };

    // * function is adding moves to the db
    newMoveFn() {
        // var chess = new Chess();
        let history = this.state.history
        this.socket.emit(
            'new move', {g_id: 1, state: this.state }
        )
        axios
        .post('/game/newMove', {history})
        .then(res => {
            // console.log("move inserted to db.moves")
        })
        .catch(err => console.log(err))

    }
    
    
    // * updating state of the board for both players
    updateFen() {
        let fen = this.state.fen
        axios
        .post('/game/updateFen', {fen})
        .then(res => {
            // console.log(res.data)
            this.setState({
                fen: res.data,
            })
            // console.log(this.state)
        })
        .catch(err => console.log(err))
    }

    onSquareRightClick = square =>
        this.setState({
        squareStyles: { [square]: { backgroundColor: "deepPink" } }
        });

    render() {


        const { fen, dropSquareStyle, squareStyles } = this.state;

        return this.props.children({
        squareStyles,
        position: fen,
        onMouseOverSquare: this.onMouseOverSquare,
        onMouseOutSquare: this.onMouseOutSquare,
        onDrop: this.onDrop,
        dropSquareStyle,
        onDragOverSquare: this.onDragOverSquare,
        onSquareClick: this.onSquareClick,
        onSquareRightClick: this.onSquareRightClick
        });
    }
    }

    export default function WithMoveValidation() {
    return (
        <div>
        <HumanVsHuman>
            {({
            position,
            onDrop,
            onMouseOverSquare,
            onMouseOutSquare,
            squareStyles,
            dropSquareStyle,
            onDragOverSquare,
            onSquareClick,
            onSquareRightClick
            }) => (
            <Chessboard
                id="humanVsHuman"
                width={600}
                position={position}
                onDrop={onDrop}
                onMouseOverSquare={onMouseOverSquare}
                onMouseOutSquare={onMouseOutSquare}
                boardStyle={{
                borderRadius: "5px",
                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                }}
                squareStyles={squareStyles}
                dropSquareStyle={dropSquareStyle}
                onDragOverSquare={onDragOverSquare}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
            />
            )}
        </HumanVsHuman>
        </div>
    );
    }

    const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        ...(history.length && {
        [sourceSquare]: {
            backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
        }),
        ...(history.length && {
        [targetSquare]: {
            backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
        })
    };
    };
