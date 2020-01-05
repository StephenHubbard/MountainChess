import React, { Component } from "react";
import "./Chess.css";
import axios from 'axios'
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import io from 'socket.io-client'
import {withRouter} from 'react-router-dom'


const chessCtrl = require('./ChessController')



export class Chess extends Component {
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
            newGame: true,
            twoClicks: [],
            legalMoves: [],
            isWhiteTurn: true,
            userWhite: '',
            userBlack: '',
            thisUser: '',
            destroyedPiecesWhite: [],
            destroyedPiecesBlack: [],
            g_id: '',
                    }
        this.handleClick = this.handleClick.bind(this);
        this.socket = io.connect(':7777')
        this.socket.on('game response', data => this.updateGame(data))
        this.socket.on('update user incoming', data => this.updateUserLogic(data))
        }
    
    handleClick(id, className) {
        // eslint-disable-next-line
        let startColor = document.getElementsByClassName(className)[0].className
        if (document.getElementById(id).childNodes[0]) {
            let piece = document.getElementById(id).childNodes[0].id
            let piece2 = document.getElementById(id)
            // * WHITE PAWN * //
            if (this.state.legalMoves.length === 0 && piece === "wP" && this.state.isWhiteTurn === true) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                    let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                    let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                    let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                    if (legalMove1) {
                        this.state.legalMoves.push(legalMove1.id)
                    }
                    if (legalMove2 && piece2.id.substring(1, 2) === "2") {
                        this.state.legalMoves.push(legalMove2.id)
                    }
                    
                    if (legalMove3.childNodes[0]) {
                        let subStr = legalMove3.childNodes[0].id.substring(0, 1)
                        if (legalMove3 && subStr === "b") {
                            this.state.legalMoves.push(legalMove3.id)
                        }
                    }
                    if (legalMove4.childNodes[0]) {
                        let subStr = legalMove4.childNodes[0].id.substring(0, 1)
                        if (legalMove4 && subStr === "b") {
                            this.state.legalMoves.push(legalMove4.id)                        }
                    }
            }
            // * BLACK PAWN * //
            if (this.state.legalMoves.length === 0 && piece === "bP" && this.state.isWhiteTurn === false) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                if (legalMove1) {
                    this.state.legalMoves.push(legalMove1.id)
                }
                if (legalMove2 && piece2.id.substring(1, 2) === "7") {
                    this.state.legalMoves.push(legalMove2.id)
                }
                
                if (legalMove3.childNodes[0]) {
                    let subStr = legalMove3.childNodes[0].id.substring(0, 1)
                    if (legalMove3 && subStr === "w") {
                        this.state.legalMoves.push(legalMove3.id)
                    }
                }
                if (legalMove4.childNodes[0]) {
                    let subStr = legalMove4.childNodes[0].id.substring(0, 1)
                    if (legalMove4 && subStr === "w") {
                        this.state.legalMoves.push(legalMove4.id)                        }
                }
            }
            // *KING* //
            if (this.state.legalMoves.length === 0 && (piece === "wK" && this.state.isWhiteTurn === true)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 9])

                if (legalMove1) {
                    this.state.legalMoves.push(legalMove1.id)
                }
                if (legalMove2) {
                    this.state.legalMoves.push(legalMove2.id)
                }
                if (legalMove3) {
                    this.state.legalMoves.push(legalMove3.id)
                }
                if (legalMove4) {
                    this.state.legalMoves.push(legalMove4.id)
                }
                if (legalMove5) {
                    this.state.legalMoves.push(legalMove5.id)
                }
                if (legalMove6) {
                    this.state.legalMoves.push(legalMove6.id)
                }
                if (legalMove7) {
                    this.state.legalMoves.push(legalMove7.id)
                }
                if (legalMove8) {
                    this.state.legalMoves.push(legalMove8.id)
                }
            }
            if (this.state.legalMoves.length === 0 && (piece === "bK" && this.state.isWhiteTurn === false)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 9])

                if (legalMove1) {
                    this.state.legalMoves.push(legalMove1.id)
                }
                if (legalMove2) {
                    this.state.legalMoves.push(legalMove2.id)
                }
                if (legalMove3) {
                    this.state.legalMoves.push(legalMove3.id)
                }
                if (legalMove4) {
                    this.state.legalMoves.push(legalMove4.id)
                }
                if (legalMove5) {
                    this.state.legalMoves.push(legalMove5.id)
                }
                if (legalMove6) {
                    this.state.legalMoves.push(legalMove6.id)
                }
                if (legalMove7) {
                    this.state.legalMoves.push(legalMove7.id)
                }
                if (legalMove8) {
                    this.state.legalMoves.push(legalMove8.id)
                }
            }
            // *ROOK* //
            if (this.state.legalMoves.length === 0 && (piece === "wR" && this.state.isWhiteTurn === true)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])

                if (legalMove1) {
                    this.state.legalMoves.push(legalMove1.id)
                }
                if (legalMove2) {
                    this.state.legalMoves.push(legalMove2.id)
                }
                if (legalMove3) {
                    this.state.legalMoves.push(legalMove3.id)
                }
                if (legalMove4) {
                    this.state.legalMoves.push(legalMove4.id)
                }
                if (legalMove5) {
                    this.state.legalMoves.push(legalMove5.id)
                }
                if (legalMove6) {
                    this.state.legalMoves.push(legalMove6.id)
                }
                if (legalMove7) {
                    this.state.legalMoves.push(legalMove7.id)
                }
                if (legalMove8) {
                    this.state.legalMoves.push(legalMove8.id)
                }
                if (legalMove9) {
                    this.state.legalMoves.push(legalMove9.id)
                }
                if (legalMove10) {
                    this.state.legalMoves.push(legalMove10.id)
                }
                if (legalMove11) {
                    this.state.legalMoves.push(legalMove11.id)
                }
                if (legalMove12) {
                    this.state.legalMoves.push(legalMove12.id)
                }
                if (legalMove13) {
                    this.state.legalMoves.push(legalMove13.id)
                }
                if (legalMove14) {
                    this.state.legalMoves.push(legalMove14.id)
                }
                if (legalMove15) {
                    this.state.legalMoves.push(legalMove15.id)
                }
                if (legalMove16) {
                    this.state.legalMoves.push(legalMove16.id)
                }
                if (legalMove17) {
                    this.state.legalMoves.push(legalMove17.id)
                }
                if (legalMove18) {
                    this.state.legalMoves.push(legalMove18.id)
                }
                if (legalMove19) {
                    this.state.legalMoves.push(legalMove19.id)
                }
                if (legalMove20) {
                    this.state.legalMoves.push(legalMove20.id)
                }
                if (legalMove21) {
                    this.state.legalMoves.push(legalMove21.id)
                }
                if (legalMove22) {
                    this.state.legalMoves.push(legalMove22.id)
                }
                if (legalMove23) {
                    this.state.legalMoves.push(legalMove23.id)
                }
                if (legalMove24) {
                    this.state.legalMoves.push(legalMove24.id)
                }
                if (legalMove25) {
                    this.state.legalMoves.push(legalMove25.id)
                }
                if (legalMove26) {
                    this.state.legalMoves.push(legalMove26.id)
                }
                if (legalMove27) {
                    this.state.legalMoves.push(legalMove27.id)
                }
                if (legalMove28) {
                    this.state.legalMoves.push(legalMove28.id)
                }
            }
            if (this.state.legalMoves.length === 0 && (piece === "bR" && this.state.isWhiteTurn === false)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])

                if (legalMove1) {
                    this.state.legalMoves.push(legalMove1.id)
                }
                if (legalMove2) {
                    this.state.legalMoves.push(legalMove2.id)
                }
                if (legalMove3) {
                    this.state.legalMoves.push(legalMove3.id)
                }
                if (legalMove4) {
                    this.state.legalMoves.push(legalMove4.id)
                }
                if (legalMove5) {
                    this.state.legalMoves.push(legalMove5.id)
                }
                if (legalMove6) {
                    this.state.legalMoves.push(legalMove6.id)
                }
                if (legalMove7) {
                    this.state.legalMoves.push(legalMove7.id)
                }
                if (legalMove8) {
                    this.state.legalMoves.push(legalMove8.id)
                }
                if (legalMove9) {
                    this.state.legalMoves.push(legalMove9.id)
                }
                if (legalMove10) {
                    this.state.legalMoves.push(legalMove10.id)
                }
                if (legalMove11) {
                    this.state.legalMoves.push(legalMove11.id)
                }
                if (legalMove12) {
                    this.state.legalMoves.push(legalMove12.id)
                }
                if (legalMove13) {
                    this.state.legalMoves.push(legalMove13.id)
                }
                if (legalMove14) {
                    this.state.legalMoves.push(legalMove14.id)
                }
                if (legalMove15) {
                    this.state.legalMoves.push(legalMove15.id)
                }
                if (legalMove16) {
                    this.state.legalMoves.push(legalMove16.id)
                }
                if (legalMove17) {
                    this.state.legalMoves.push(legalMove17.id)
                }
                if (legalMove18) {
                    this.state.legalMoves.push(legalMove18.id)
                }
                if (legalMove19) {
                    this.state.legalMoves.push(legalMove19.id)
                }
                if (legalMove20) {
                    this.state.legalMoves.push(legalMove20.id)
                }
                if (legalMove21) {
                    this.state.legalMoves.push(legalMove21.id)
                }
                if (legalMove22) {
                    this.state.legalMoves.push(legalMove22.id)
                }
                if (legalMove23) {
                    this.state.legalMoves.push(legalMove23.id)
                }
                if (legalMove24) {
                    this.state.legalMoves.push(legalMove24.id)
                }
                if (legalMove25) {
                    this.state.legalMoves.push(legalMove25.id)
                }
                if (legalMove26) {
                    this.state.legalMoves.push(legalMove26.id)
                }
                if (legalMove27) {
                    this.state.legalMoves.push(legalMove27.id)
                }
                if (legalMove28) {
                    this.state.legalMoves.push(legalMove28.id)
                }
            }
            // ** BISHOP** //
            if (this.state.legalMoves.length === 0 && (piece === "wB" && this.state.isWhiteTurn === true)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                            // eslint-disable-next-line
                            let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                            // eslint-disable-next-line
                            let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                            // eslint-disable-next-line
                            let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                            // eslint-disable-next-line
                            let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                            // eslint-disable-next-line
                            let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                            // eslint-disable-next-line
                            let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                            // eslint-disable-next-line
                            let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                            // eslint-disable-next-line
                            let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                            // eslint-disable-next-line
                            let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                            // eslint-disable-next-line
                            let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                            // eslint-disable-next-line
                            let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                            // eslint-disable-next-line
                            let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                            // eslint-disable-next-line
                            let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                            // eslint-disable-next-line
                            let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                            // eslint-disable-next-line
                            let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                            // eslint-disable-next-line
                            let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                            // eslint-disable-next-line
                            let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                            // eslint-disable-next-line
                            let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                            // eslint-disable-next-line
                            let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                            // eslint-disable-next-line
                            let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                            // eslint-disable-next-line
                            let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                            // eslint-disable-next-line
                            let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                            // eslint-disable-next-line
                            let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                            // eslint-disable-next-line
                            let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                            // eslint-disable-next-line
                            let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                            // eslint-disable-next-line
                            let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                            // eslint-disable-next-line
                            let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                            // eslint-disable-next-line
                            let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 42])

                if (legalMove1) {
                    this.state.legalMoves.push(legalMove1.id)
                }
                if (legalMove2) {
                    this.state.legalMoves.push(legalMove2.id)
                }
                if (legalMove3) {
                    this.state.legalMoves.push(legalMove3.id)
                }
                if (legalMove4) {
                    this.state.legalMoves.push(legalMove4.id)
                }
                if (legalMove5) {
                    this.state.legalMoves.push(legalMove5.id)
                }
                if (legalMove6) {
                    this.state.legalMoves.push(legalMove6.id)
                }
                if (legalMove7) {
                    this.state.legalMoves.push(legalMove7.id)
                }
                if (legalMove8) {
                    this.state.legalMoves.push(legalMove8.id)
                }
                if (legalMove9) {
                    this.state.legalMoves.push(legalMove9.id)
                }
                if (legalMove10) {
                    this.state.legalMoves.push(legalMove10.id)
                }
                if (legalMove11) {
                    this.state.legalMoves.push(legalMove11.id)
                }
                if (legalMove12) {
                    this.state.legalMoves.push(legalMove12.id)
                }
                if (legalMove13) {
                    this.state.legalMoves.push(legalMove13.id)
                }
                if (legalMove14) {
                    this.state.legalMoves.push(legalMove14.id)
                }
                if (legalMove15) {
                    this.state.legalMoves.push(legalMove15.id)
                }
                if (legalMove16) {
                    this.state.legalMoves.push(legalMove16.id)
                }
                if (legalMove17) {
                    this.state.legalMoves.push(legalMove17.id)
                }
                if (legalMove18) {
                    this.state.legalMoves.push(legalMove18.id)
                }
                if (legalMove19) {
                    this.state.legalMoves.push(legalMove19.id)
                }
                if (legalMove20) {
                    this.state.legalMoves.push(legalMove20.id)
                }
                if (legalMove21) {
                    this.state.legalMoves.push(legalMove21.id)
                }
                if (legalMove22) {
                    this.state.legalMoves.push(legalMove22.id)
                }
                if (legalMove23) {
                    this.state.legalMoves.push(legalMove23.id)
                }
                if (legalMove24) {
                    this.state.legalMoves.push(legalMove24.id)
                }
                if (legalMove25) {
                    this.state.legalMoves.push(legalMove25.id)
                }
                if (legalMove26) {
                    this.state.legalMoves.push(legalMove26.id)
                }
                if (legalMove27) {
                    this.state.legalMoves.push(legalMove27.id)
                }
                if (legalMove28) {
                    this.state.legalMoves.push(legalMove28.id)
                }
            }
            if (this.state.legalMoves.length === 0 && (piece === "bB" && this.state.isWhiteTurn === false)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                            // eslint-disable-next-line
                            let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                            // eslint-disable-next-line
                            let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                            // eslint-disable-next-line
                            let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                            // eslint-disable-next-line
                            let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                            // eslint-disable-next-line
                            let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                            // eslint-disable-next-line
                            let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                            // eslint-disable-next-line
                            let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                            // eslint-disable-next-line
                            let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                            // eslint-disable-next-line
                            let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                            // eslint-disable-next-line
                            let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                            // eslint-disable-next-line
                            let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                            // eslint-disable-next-line
                            let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                            // eslint-disable-next-line
                            let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                            // eslint-disable-next-line
                            let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                            // eslint-disable-next-line
                            let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                            // eslint-disable-next-line
                            let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                            // eslint-disable-next-line
                            let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                            // eslint-disable-next-line
                            let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                            // eslint-disable-next-line
                            let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                            // eslint-disable-next-line
                            let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                            // eslint-disable-next-line
                            let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                            // eslint-disable-next-line
                            let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                            // eslint-disable-next-line
                            let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                            // eslint-disable-next-line
                            let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                            // eslint-disable-next-line
                            let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                            // eslint-disable-next-line
                            let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                            // eslint-disable-next-line
                            let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                            // eslint-disable-next-line
                            let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 42])

                if (legalMove1) {
                    this.state.legalMoves.push(legalMove1.id)
                }
                if (legalMove2) {
                    this.state.legalMoves.push(legalMove2.id)
                }
                if (legalMove3) {
                    this.state.legalMoves.push(legalMove3.id)
                }
                if (legalMove4) {
                    this.state.legalMoves.push(legalMove4.id)
                }
                if (legalMove5) {
                    this.state.legalMoves.push(legalMove5.id)
                }
                if (legalMove6) {
                    this.state.legalMoves.push(legalMove6.id)
                }
                if (legalMove7) {
                    this.state.legalMoves.push(legalMove7.id)
                }
                if (legalMove8) {
                    this.state.legalMoves.push(legalMove8.id)
                }
                if (legalMove9) {
                    this.state.legalMoves.push(legalMove9.id)
                }
                if (legalMove10) {
                    this.state.legalMoves.push(legalMove10.id)
                }
                if (legalMove11) {
                    this.state.legalMoves.push(legalMove11.id)
                }
                if (legalMove12) {
                    this.state.legalMoves.push(legalMove12.id)
                }
                if (legalMove13) {
                    this.state.legalMoves.push(legalMove13.id)
                }
                if (legalMove14) {
                    this.state.legalMoves.push(legalMove14.id)
                }
                if (legalMove15) {
                    this.state.legalMoves.push(legalMove15.id)
                }
                if (legalMove16) {
                    this.state.legalMoves.push(legalMove16.id)
                }
                if (legalMove17) {
                    this.state.legalMoves.push(legalMove17.id)
                }
                if (legalMove18) {
                    this.state.legalMoves.push(legalMove18.id)
                }
                if (legalMove19) {
                    this.state.legalMoves.push(legalMove19.id)
                }
                if (legalMove20) {
                    this.state.legalMoves.push(legalMove20.id)
                }
                if (legalMove21) {
                    this.state.legalMoves.push(legalMove21.id)
                }
                if (legalMove22) {
                    this.state.legalMoves.push(legalMove22.id)
                }
                if (legalMove23) {
                    this.state.legalMoves.push(legalMove23.id)
                }
                if (legalMove24) {
                    this.state.legalMoves.push(legalMove24.id)
                }
                if (legalMove25) {
                    this.state.legalMoves.push(legalMove25.id)
                }
                if (legalMove26) {
                    this.state.legalMoves.push(legalMove26.id)
                }
                if (legalMove27) {
                    this.state.legalMoves.push(legalMove27.id)
                }
                if (legalMove28) {
                    this.state.legalMoves.push(legalMove28.id)
                }
            }
            // *KNIGHT* //
            if (this.state.legalMoves.length === 0 && (piece === "wN" && this.state.isWhiteTurn === true)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                // eslint-disable-next-line
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 10])
                // eslint-disable-next-line
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                // eslint-disable-next-line
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 17])
                // eslint-disable-next-line
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 15])
                // eslint-disable-next-line
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 10])
                // eslint-disable-next-line
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                // eslint-disable-next-line
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 15])
                // eslint-disable-next-line
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 17])

                for (let i = 1; i < 9; i++) {
                    // eslint-disable-next-line
                    let test = eval(`legalMove${i}`)
                    if (test) {
                        // let subStr1 = test.id.substr(1, 2)
                        // let subStr2 = piece.id.substr(1, 2)
                        // let subStr3 = test.id.substr(0, 1) 
                        // let subStr4 = piece.id.substr(0, 1)
                        // if (test && (subStr1 === subStr2 || subStr3 === subStr4)) {
                            this.state.legalMoves.push(test.id)
                        }
                    }
            }
            if (this.state.legalMoves.length === 0 && (piece === "bN" && this.state.isWhiteTurn === false)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                // eslint-disable-next-line
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 10])
                // eslint-disable-next-line
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                // eslint-disable-next-line
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 17])
                // eslint-disable-next-line
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 15])
                // eslint-disable-next-line
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 10])
                // eslint-disable-next-line
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                // eslint-disable-next-line
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 15])
                // eslint-disable-next-line
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 17])

                for (let i = 1; i < 9; i++) {
                    // eslint-disable-next-line
                    let test = eval(`legalMove${i}`)
                    if (test) {
                        // let subStr1 = test.id.substr(1, 2)
                        // let subStr2 = piece.id.substr(1, 2)
                        // let subStr3 = test.id.substr(0, 1) 
                        // let subStr4 = piece.id.substr(0, 1)
                        // if (test && (subStr1 === subStr2 || subStr3 === subStr4)) {
                            this.state.legalMoves.push(test.id)
                        }
                    }
            }
            // *QUEEN* //
            if (this.state.legalMoves.length === 0 && (piece === "wQ" && this.state.isWhiteTurn === true)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                // eslint-disable-next-line
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                // eslint-disable-next-line
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                // eslint-disable-next-line
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                // eslint-disable-next-line
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                // eslint-disable-next-line
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                // eslint-disable-next-line
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                // eslint-disable-next-line
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                // eslint-disable-next-line
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                // eslint-disable-next-line
                let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                // eslint-disable-next-line
                let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                // eslint-disable-next-line
                let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                // eslint-disable-next-line
                let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                // eslint-disable-next-line
                let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                // eslint-disable-next-line
                let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                // eslint-disable-next-line
                let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                // eslint-disable-next-line
                let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                // eslint-disable-next-line
                let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                // eslint-disable-next-line
                let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                // eslint-disable-next-line
                let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                // eslint-disable-next-line
                let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                // eslint-disable-next-line
                let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                // eslint-disable-next-line
                let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                // eslint-disable-next-line
                let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                // eslint-disable-next-line
                let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                // eslint-disable-next-line
                let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                // eslint-disable-next-line
                let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                // eslint-disable-next-line
                let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                // eslint-disable-next-line
                let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])
                // eslint-disable-next-line
                let legalMove29 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                // eslint-disable-next-line
                let legalMove30 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                // eslint-disable-next-line
                let legalMove31 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                // eslint-disable-next-line
                let legalMove32 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                // eslint-disable-next-line
                let legalMove33 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                // eslint-disable-next-line
                let legalMove34 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                // eslint-disable-next-line
                let legalMove35 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                // eslint-disable-next-line
                let legalMove36 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                // eslint-disable-next-line
                let legalMove37 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                // eslint-disable-next-line
                let legalMove38 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                // eslint-disable-next-line
                let legalMove39 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                // eslint-disable-next-line
                let legalMove40 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                // eslint-disable-next-line
                let legalMove41 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                // eslint-disable-next-line
                let legalMove42 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                // eslint-disable-next-line
                let legalMove43 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                // eslint-disable-next-line
                let legalMove44 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                // eslint-disable-next-line
                let legalMove45 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                // eslint-disable-next-line
                let legalMove46 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                // eslint-disable-next-line
                let legalMove47 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                // eslint-disable-next-line
                let legalMove48 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                // eslint-disable-next-line
                let legalMove49 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                // eslint-disable-next-line
                let legalMove50 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                // eslint-disable-next-line
                let legalMove51 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                // eslint-disable-next-line
                let legalMove52 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                // eslint-disable-next-line
                let legalMove53 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                // eslint-disable-next-line
                let legalMove54 = document.getElementById(this.state.chessGrid[thisIndex - 42])


                for (let i = 1; i < 55; i++) {
                    // eslint-disable-next-line
                    let test = eval(`legalMove${i}`)
                    if (test) {
                        this.state.legalMoves.push(test.id)
                    }
                }
            }
            if (this.state.legalMoves.length === 0 && (piece === "bQ" && this.state.isWhiteTurn === false)) {
                let thisIndex = this.state.chessGrid.indexOf(id)
                // eslint-disable-next-line
                let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                // eslint-disable-next-line
                let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                // eslint-disable-next-line
                let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                // eslint-disable-next-line
                let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                // eslint-disable-next-line
                let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                // eslint-disable-next-line
                let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                // eslint-disable-next-line
                let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                // eslint-disable-next-line
                let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                // eslint-disable-next-line
                let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                // eslint-disable-next-line
                let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                // eslint-disable-next-line
                let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                // eslint-disable-next-line
                let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                // eslint-disable-next-line
                let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                // eslint-disable-next-line
                let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                // eslint-disable-next-line
                let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                // eslint-disable-next-line
                let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                // eslint-disable-next-line
                let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                // eslint-disable-next-line
                let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                // eslint-disable-next-line
                let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                // eslint-disable-next-line
                let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                // eslint-disable-next-line
                let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                // eslint-disable-next-line
                let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                // eslint-disable-next-line
                let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                // eslint-disable-next-line
                let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                // eslint-disable-next-line
                let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                // eslint-disable-next-line
                let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                // eslint-disable-next-line
                let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                // eslint-disable-next-line
                let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])
                // eslint-disable-next-line
                let legalMove29 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                // eslint-disable-next-line
                let legalMove30 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                // eslint-disable-next-line
                let legalMove31 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                // eslint-disable-next-line
                let legalMove32 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                // eslint-disable-next-line
                let legalMove33 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                // eslint-disable-next-line
                let legalMove34 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                // eslint-disable-next-line
                let legalMove35 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                // eslint-disable-next-line
                let legalMove36 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                // eslint-disable-next-line
                let legalMove37 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                // eslint-disable-next-line
                let legalMove38 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                // eslint-disable-next-line
                let legalMove39 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                // eslint-disable-next-line
                let legalMove40 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                // eslint-disable-next-line
                let legalMove41 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                // eslint-disable-next-line
                let legalMove42 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                // eslint-disable-next-line
                let legalMove43 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                // eslint-disable-next-line
                let legalMove44 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                // eslint-disable-next-line
                let legalMove45 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                // eslint-disable-next-line
                let legalMove46 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                // eslint-disable-next-line
                let legalMove47 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                // eslint-disable-next-line
                let legalMove48 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                // eslint-disable-next-line
                let legalMove49 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                // eslint-disable-next-line
                let legalMove50 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                // eslint-disable-next-line
                let legalMove51 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                // eslint-disable-next-line
                let legalMove52 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                // eslint-disable-next-line
                let legalMove53 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                // eslint-disable-next-line
                let legalMove54 = document.getElementById(this.state.chessGrid[thisIndex - 42])


                for (let i = 1; i < 55; i++) {
                    // eslint-disable-next-line
                    let test = eval(`legalMove${i}`)
                    if (test) {
                        this.state.legalMoves.push(test.id)
                    }
                }
            }
        }
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
            if (clickedSquare.children[0] && clickedSquare.children[0].className !== "y-dot" && this.state.twoClicks.length === 0) {
                this.state.twoClicks.push(clickedSquare.children[0].id + id)
                // console.log("hit1")
            } else if ((this.state.twoClicks[0] && this.state.legalMoves.indexOf(clickedSquare.id) > -1) && (clickedSquare.children[0].className === "y-dot" || clickedSquare.children[1].className === "y-dot")) {
                    this.state.twoClicks.push(this.state.twoClicks[0].substring(0, 2) + id)
                    this.state.legalMoves.splice(0)
                    this.movePiece(id)
                    // console.log("hit2")
                    this.handlePostMove()
                    this.updateMovePostgres()
                    this.updateArrayPostgres()
                    this.socket.emit(
                        'new move', {g_id: this.state.g_id, state: this.state }
                    )
                } else {
                    this.state.twoClicks.splice(0, 2)
                    this.state.legalMoves.splice(0)  
                // console.log("hit3")

                }
        } else {
            this.state.twoClicks.splice(0, 2)
            this.state.legalMoves.splice(0) 
            // console.log("hit4")
        }
    }

    async updateGame(data) { 
        await this.setState({
            placement: data.state.placement,
            twoClicks: data.state.twoClicks,
            isWhiteTurn: data.state.isWhiteTurn,
        })
        let chessGrid = this.state.chessGrid
        let placement = this.state.placement
        if (this.state.twoClicks[1]) {
            let square2 = this.state.twoClicks[1].substring(2, 4)
            await chessCtrl.updateBoard(square2, chessGrid, placement)
        }
    }

    updateMovePostgres() {
        let move1 = this.state.twoClicks[0]
        let move2 = this.state.twoClicks[1]
        let user_id = this.props.user_id
        axios
        .post('/game/newMove', {move1, move2, user_id})
        .then(res => {
            // console.log(res)
        })
        .catch(err => console.log(err))
    }

    updateArrayPostgres() {
        let placement = this.state.placement
        let g_id = this.state.g_id
        let isWhiteTurn = this.state.isWhiteTurn
        axios
        .post('/game/updateGameArray', {placement: placement, g_id: g_id, isWhiteTurn: isWhiteTurn})
        .then(res => {
            // console.log(res)
        })
        .catch(err => console.log(err))
    }

    async movePiece(id) {
        if (this.state.twoClicks[1]) {
            let piece = this.state.twoClicks[0].substring(0, 2)
            let square1 = this.state.twoClicks[0].substring(2, 4)
            let square2 = this.state.twoClicks[1].substring(2, 4)
            // console.log(this.state.twoClicks)
            for (let i = 0; i < 64; i++){
                if (this.state.chessGrid[i] === square1) {
                    // console.log(this.state.chessGrid[i])
                    this.state.placement.splice(i, 1, "")
                    // console.log(this.state.chessGrid[i])
                    // console.log(square2)
                }
                if (this.state.chessGrid[i] === square2) {
                    this.state.placement.splice(i, 1, piece)
                }
            }
            // await console.log(this.state.placement)
        await this.updateBoard(square2)
        }
    }

    handlePostMove() {
        let yellowCircle = document.getElementsByClassName("y-dot")
        while(yellowCircle.length > 0) {
            yellowCircle[0].parentNode.removeChild(yellowCircle[0])
        }
        this.setState({
            isWhiteTurn: !this.state.isWhiteTurn
        })
    }

    updateBoard(square2) {
        const chessGrid = this.state.chessGrid
        const placement = this.state.placement
        chessCtrl.updateBoard(square2, chessGrid, placement)
    }

    handleHover(id, className) {
        let piece = document.getElementById(id)
        let startColor = document.getElementsByClassName(className)[0].className
        let startColumn = document.getElementById(id).id.substr(0,1)
        let startRow = document.getElementById(id).id.substr(1,1)
        if (piece.childNodes[0]) {
            if (piece.childNodes[0].id === "wP" && this.state.isWhiteTurn === true && this.state.userWhite === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                        if (legalMove1) {
                            legalMove1.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove2 && piece.id.substring(1, 2) === "2") {
                            legalMove2.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove3) {
                            if (legalMove3.childNodes[0]) {
                                let subStr = legalMove3.childNodes[0].id.substring(0, 1)
                                if (legalMove3 && subStr === "b") {
                                    legalMove3.appendChild(document.createElement("div")).className = "y-dot"
                                }
                            }
                        }
                        if (legalMove4) {
                            if (legalMove4.childNodes[0]) {
                                let subStr = legalMove4.childNodes[0].id.substring(0, 1)
                                if (legalMove4 && subStr === "b") {
                                    legalMove4.appendChild(document.createElement("div")).className = "y-dot"
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "bP" && this.state.isWhiteTurn === false && this.state.userBlack === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                        if (legalMove1) {
                            legalMove1.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove2 && piece.id.substring(1, 2) === "7") {
                            legalMove2.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove3) {
                            if (legalMove3.childNodes[0]) {
                                let subStr = legalMove3.childNodes[0].id.substring(0, 1)
                                if (legalMove3 && subStr === "w") {
                                    legalMove3.appendChild(document.createElement("div")).className = "y-dot"
                                }
                            }
                        }
                        if (legalMove4) {
                            if (legalMove4.childNodes[0]) {
                                let subStr = legalMove4.childNodes[0].id.substring(0, 1)
                                if (legalMove4 && subStr === "w") {
                                    legalMove4.appendChild(document.createElement("div")).className = "y-dot"
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "wK" && this.state.isWhiteTurn === true && this.state.userWhite === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                        if (legalMove1) {
                            legalMove1.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove2) {
                            legalMove2.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove3) {
                            legalMove3.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove4) {
                            legalMove4.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove5) {
                            legalMove5.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove6) {
                            legalMove6.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove7) {
                            legalMove7.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove8) {
                            legalMove8.appendChild(document.createElement("div")).className = "y-dot"
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "bK" && this.state.isWhiteTurn === false && this.state.userBlack === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                        if (legalMove1) {
                            legalMove1.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove2) {
                            legalMove2.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove3) {
                            legalMove3.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove4) {
                            legalMove4.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove5) {
                            legalMove5.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove6) {
                            legalMove6.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove7) {
                            legalMove7.appendChild(document.createElement("div")).className = "y-dot"
                        }
                        if (legalMove8) {
                            legalMove8.appendChild(document.createElement("div")).className = "y-dot"
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "wR" && this.state.isWhiteTurn === true && this.state.userWhite === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        // eslint-disable-next-line
                        let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                        // eslint-disable-next-line
                        let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                        // eslint-disable-next-line
                        let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                        // eslint-disable-next-line
                        let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                        // eslint-disable-next-line
                        let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                        // eslint-disable-next-line
                        let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                        // eslint-disable-next-line
                        let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                        // eslint-disable-next-line
                        let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                        // eslint-disable-next-line
                        let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                        // eslint-disable-next-line
                        let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                        // eslint-disable-next-line
                        let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                        // eslint-disable-next-line
                        let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                        // eslint-disable-next-line
                        let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        // eslint-disable-next-line
                        let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        // eslint-disable-next-line
                        let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                        // eslint-disable-next-line
                        let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                        // eslint-disable-next-line
                        let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                        // eslint-disable-next-line
                        let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                        // eslint-disable-next-line
                        let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                        // eslint-disable-next-line
                        let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])

                        for (let i = 1; i < 29; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                let subStr1 = test.id.substr(1, 2)
                                let subStr2 = piece.id.substr(1, 2)
                                let subStr3 = test.id.substr(0, 1) 
                                let subStr4 = piece.id.substr(0, 1)
                                if (test && (subStr1 === subStr2 || subStr3 === subStr4)) {
                                    (test.appendChild(document.createElement("div")).className = "y-dot")
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "bR" && this.state.isWhiteTurn === false && this.state.userBlack === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        // eslint-disable-next-line
                        let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                        // eslint-disable-next-line
                        let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                        // eslint-disable-next-line
                        let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                        // eslint-disable-next-line
                        let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                        // eslint-disable-next-line
                        let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                        // eslint-disable-next-line
                        let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                        // eslint-disable-next-line
                        let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                        // eslint-disable-next-line
                        let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                        // eslint-disable-next-line
                        let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                        // eslint-disable-next-line
                        let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                        // eslint-disable-next-line
                        let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                        // eslint-disable-next-line
                        let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                        // eslint-disable-next-line
                        let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        // eslint-disable-next-line
                        let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        // eslint-disable-next-line
                        let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                        // eslint-disable-next-line
                        let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                        // eslint-disable-next-line
                        let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                        // eslint-disable-next-line
                        let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                        // eslint-disable-next-line
                        let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                        // eslint-disable-next-line
                        let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])

                        for (let i = 1; i < 29; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                let subStr1 = test.id.substr(1, 2)
                                let subStr2 = piece.id.substr(1, 2)
                                let subStr3 = test.id.substr(0, 1) 
                                let subStr4 = piece.id.substr(0, 1)
                                if (test && (subStr1 === subStr2 || subStr3 === subStr4)) {
                                    (test.appendChild(document.createElement("div")).className = "y-dot")
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "wQ" && this.state.isWhiteTurn === true && this.state.userWhite === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        // eslint-disable-next-line
                        let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                        // eslint-disable-next-line
                        let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                        // eslint-disable-next-line
                        let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                        // eslint-disable-next-line
                        let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                        // eslint-disable-next-line
                        let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                        // eslint-disable-next-line
                        let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                        // eslint-disable-next-line
                        let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                        // eslint-disable-next-line
                        let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                        // eslint-disable-next-line
                        let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                        // eslint-disable-next-line
                        let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                        // eslint-disable-next-line
                        let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                        // eslint-disable-next-line
                        let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                        // eslint-disable-next-line
                        let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        // eslint-disable-next-line
                        let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        // eslint-disable-next-line
                        let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                        // eslint-disable-next-line
                        let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                        // eslint-disable-next-line
                        let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                        // eslint-disable-next-line
                        let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                        // eslint-disable-next-line
                        let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                        // eslint-disable-next-line
                        let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])
                        // eslint-disable-next-line
                        let legalMove29 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                        // eslint-disable-next-line
                        let legalMove30 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                        // eslint-disable-next-line
                        let legalMove31 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                        // eslint-disable-next-line
                        let legalMove32 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                        // eslint-disable-next-line
                        let legalMove33 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                        // eslint-disable-next-line
                        let legalMove34 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                        // eslint-disable-next-line
                        let legalMove35 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                        // eslint-disable-next-line
                        let legalMove36 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                        // eslint-disable-next-line
                        let legalMove37 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                        // eslint-disable-next-line
                        let legalMove38 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                        // eslint-disable-next-line
                        let legalMove39 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                        // eslint-disable-next-line
                        let legalMove40 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                        // eslint-disable-next-line
                        let legalMove41 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                        // eslint-disable-next-line
                        let legalMove42 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                        // eslint-disable-next-line
                        let legalMove43 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                        // eslint-disable-next-line
                        let legalMove44 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                        // eslint-disable-next-line
                        let legalMove45 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                        // eslint-disable-next-line
                        let legalMove46 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                        // eslint-disable-next-line
                        let legalMove47 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                        // eslint-disable-next-line
                        let legalMove48 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                        // eslint-disable-next-line
                        let legalMove49 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                        // eslint-disable-next-line
                        let legalMove50 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                        // eslint-disable-next-line
                        let legalMove51 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                        // eslint-disable-next-line
                        let legalMove52 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                        // eslint-disable-next-line
                        let legalMove53 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                        // eslint-disable-next-line
                        let legalMove54 = document.getElementById(this.state.chessGrid[thisIndex - 42])

                        for (let i = 1; i < 55; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                let subStr1 = test.id.substr(1, 2)
                                let subStr2 = piece.id.substr(1, 2)
                                let subStr3 = test.id.substr(0, 1) 
                                let subStr4 = piece.id.substr(0, 1)
                                let color = test.className
                                // eslint-disable-next-line
                                if ((test && (subStr1 === subStr2 || subStr3 === subStr4)) || (color === startColor || color === "yellow" || color === "yellow2") && i !== 5 && i !== 19) {
                                    (test.appendChild(document.createElement("div")).className = "y-dot")
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "bQ" && this.state.isWhiteTurn === false && this.state.userBlack === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 2])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 3])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 4])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 5])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        // eslint-disable-next-line
                        let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 16])
                        // eslint-disable-next-line
                        let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 24])
                        // eslint-disable-next-line
                        let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 32])
                        // eslint-disable-next-line
                        let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 40])
                        // eslint-disable-next-line
                        let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 48])
                        // eslint-disable-next-line
                        let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 56])
                        // eslint-disable-next-line
                        let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 1])
                        // eslint-disable-next-line
                        let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 2])
                        // eslint-disable-next-line
                        let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 3])
                        // eslint-disable-next-line
                        let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 4])
                        // eslint-disable-next-line
                        let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 5])
                        // eslint-disable-next-line
                        let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                        // eslint-disable-next-line
                        let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        // eslint-disable-next-line
                        let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 8])
                        // eslint-disable-next-line
                        let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 16])
                        // eslint-disable-next-line
                        let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 24])
                        // eslint-disable-next-line
                        let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 32])
                        // eslint-disable-next-line
                        let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 40])
                        // eslint-disable-next-line
                        let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 48])
                        // eslint-disable-next-line
                        let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 56])
                        // eslint-disable-next-line
                        let legalMove29 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                        // eslint-disable-next-line
                        let legalMove30 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                        // eslint-disable-next-line
                        let legalMove31 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                        // eslint-disable-next-line
                        let legalMove32 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                        // eslint-disable-next-line
                        let legalMove33 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                        // eslint-disable-next-line
                        let legalMove34 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                        // eslint-disable-next-line
                        let legalMove35 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                        // eslint-disable-next-line
                        let legalMove36 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                        // eslint-disable-next-line
                        let legalMove37 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                        // eslint-disable-next-line
                        let legalMove38 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                        // eslint-disable-next-line
                        let legalMove39 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                        // eslint-disable-next-line
                        let legalMove40 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                        // eslint-disable-next-line
                        let legalMove41 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                        // eslint-disable-next-line
                        let legalMove42 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                        // eslint-disable-next-line
                        let legalMove43 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                        // eslint-disable-next-line
                        let legalMove44 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                        // eslint-disable-next-line
                        let legalMove45 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                        // eslint-disable-next-line
                        let legalMove46 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                        // eslint-disable-next-line
                        let legalMove47 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                        // eslint-disable-next-line
                        let legalMove48 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                        // eslint-disable-next-line
                        let legalMove49 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                        // eslint-disable-next-line
                        let legalMove50 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                        // eslint-disable-next-line
                        let legalMove51 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                        // eslint-disable-next-line
                        let legalMove52 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                        // eslint-disable-next-line
                        let legalMove53 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                        // eslint-disable-next-line
                        let legalMove54 = document.getElementById(this.state.chessGrid[thisIndex - 42])

                        for (let i = 1; i < 55; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                let subStr1 = test.id.substr(1, 2)
                                let subStr2 = piece.id.substr(1, 2)
                                let subStr3 = test.id.substr(0, 1) 
                                let subStr4 = piece.id.substr(0, 1)
                                let color = test.className
                                // eslint-disable-next-line
                                if ((test && (subStr1 === subStr2 || subStr3 === subStr4)) || (color === startColor || color === "yellow" || color === "yellow2") && i !== 5 && i !== 19) {
                                    (test.appendChild(document.createElement("div")).className = "y-dot")
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "wN" && this.state.isWhiteTurn === true && this.state.userWhite === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 10])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 17])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 15])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 10])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 15])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 17])
                        
                        for (let i = 1; i < 9; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                // let subStr1 = test.id.substr(1, 2)
                                // let subStr2 = piece.id.substr(1, 2)
                                // let subStr3 = test.id.substr(0, 1) 
                                // let subStr4 = piece.id.substr(0, 1)
                                if (test) {
                                // if (test && (subStr1 === subStr2 || subStr3 === subStr4)) {
                                    // if(startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f' && startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') {
                                    //     (test.appendChild(document.createElement("div")).className = "y-dot")
                                    if(startColumn === 'g' && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if(startColumn ==='b' && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if(startColumn === 'h' && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if(startColumn === 'a' && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn === 'h' && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn === 'a' && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn ==='b' && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn === 'g' && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn === 'h' && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn === 'a' && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn ==='b' && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn === 'g' && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'g' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'h' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'a' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'b' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 3 && i !== 4) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '8' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 3 && i !== 4 && i !== 1 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if ((startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6')) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '2' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 7 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '1' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 7 && i !== 8 && i !== 6 && i !== 5) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    }

                                    //you need to get the middle of board movements down!!!! close but not there yet.  start work above ^^^^    

                                    // } else if(startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') {
                                    //     (test.appendChild(document.createElement("div")).className = "y-dot")
                                    // } else if(startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') {
                                    //     (test.appendChild(document.createElement("div")).className = "y-dot")
                                    // }
                                    // else if(startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f' && startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') {
                                    //     (test.appendChild(document.createElement("div")).className = "y-dot")
                                    // }
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "bN" && this.state.isWhiteTurn === false && this.state.userBlack === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex - 10])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 6])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex - 17])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex - 15])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 10])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 6])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 15])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 17])
                        
                        for (let i = 1; i < 9; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                // let subStr1 = test.id.substr(1, 2)
                                // let subStr2 = piece.id.substr(1, 2)
                                // let subStr3 = test.id.substr(0, 1) 
                                // let subStr4 = piece.id.substr(0, 1)
                                if (test) {
                                    if(startColumn === 'g' && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if(startColumn ==='b' && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if(startColumn === 'h' && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if(startColumn === 'a' && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn === 'h' && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn === 'a' && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn ==='b' && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && i !== 3 && i !== 4 && startColumn === 'g' && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn === 'h' && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn === 'a' && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn ==='b' && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow ==='8' && i !== 3 && i !== 4 && i !== 1 && i !== 2 && startColumn === 'g' && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'g' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 5 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'h' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 5 && i !== 2 && i !== 4 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'a' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 3 && i !== 7 && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startColumn === 'b' && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6') && i !== 1 && i !== 6) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '7' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 3 && i !== 4) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '8' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 3 && i !== 4 && i !== 1 && i !== 2) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if ((startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && (startRow === '3' || startRow === '4' || startRow === '5' || startRow === '6')) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '2' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 7 && i !== 8) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    } else if (startRow === '1' && (startColumn === 'c' || startColumn === 'd' || startColumn === 'e' || startColumn === 'f') && i !== 7 && i !== 8 && i !== 6 && i !== 5) {
                                        (test.appendChild(document.createElement("div")).className = "y-dot")
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "wB" && this.state.isWhiteTurn === true && this.state.userWhite === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                        // eslint-disable-next-line
                        let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        // eslint-disable-next-line
                        let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                        // eslint-disable-next-line
                        let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                        // eslint-disable-next-line
                        let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                        // eslint-disable-next-line
                        let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                        // eslint-disable-next-line
                        let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                        // eslint-disable-next-line
                        let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                        // eslint-disable-next-line
                        let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                        // eslint-disable-next-line
                        let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                        // eslint-disable-next-line
                        let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                        // eslint-disable-next-line
                        let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                        // eslint-disable-next-line
                        let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                        // eslint-disable-next-line
                        let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                        // eslint-disable-next-line
                        let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                        // eslint-disable-next-line
                        let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        // eslint-disable-next-line
                        let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                        // eslint-disable-next-line
                        let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                        // eslint-disable-next-line
                        let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                        // eslint-disable-next-line
                        let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                        // eslint-disable-next-line
                        let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 42])

                        for (let i = 1; i < 29; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                let color = test.className
                                // let subStr1 = test.id.substr(1, 2)
                                // let subStr2 = piece.id.substr(1, 2)
                                // let subStr3 = test.id.substr(0, 1) 
                                // let subStr4 = piece.id.substr(0, 1)
                                // if (test && (subStr1 === subStr2 || subStr3 === subStr4)) {
                                    if(color===startColor || color === "yellow" || color === "yellow2")
                                    (test.appendChild(document.createElement("div")).className = "y-dot")
                            }
                        }
                    }
                }
            }
            if (piece.childNodes[0].id === "bB" && this.state.isWhiteTurn === false && this.state.userBlack === this.state.thisUser) {
                for (let i = 0; i < 64; i++) {
                    if (this.state.chessGrid[i] === id && this.state.twoClicks.length !== 1) {
                        let thisIndex = this.state.chessGrid.indexOf(id)
                        // eslint-disable-next-line
                        let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                        // eslint-disable-next-line
                        let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex + 18])
                        // eslint-disable-next-line
                        let legalMove3 = document.getElementById(this.state.chessGrid[thisIndex + 27])
                        // eslint-disable-next-line
                        let legalMove4 = document.getElementById(this.state.chessGrid[thisIndex + 36])
                        // eslint-disable-next-line
                        let legalMove5 = document.getElementById(this.state.chessGrid[thisIndex + 45])
                        // eslint-disable-next-line
                        let legalMove6 = document.getElementById(this.state.chessGrid[thisIndex + 54])
                        // eslint-disable-next-line
                        let legalMove7 = document.getElementById(this.state.chessGrid[thisIndex + 63])
                        // eslint-disable-next-line
                        let legalMove8 = document.getElementById(this.state.chessGrid[thisIndex + 72])
                        // eslint-disable-next-line
                        let legalMove9 = document.getElementById(this.state.chessGrid[thisIndex + 7])
                        // eslint-disable-next-line
                        let legalMove10 = document.getElementById(this.state.chessGrid[thisIndex + 14])
                        // eslint-disable-next-line
                        let legalMove11 = document.getElementById(this.state.chessGrid[thisIndex + 21])
                        // eslint-disable-next-line
                        let legalMove12 = document.getElementById(this.state.chessGrid[thisIndex + 28])
                        // eslint-disable-next-line
                        let legalMove13 = document.getElementById(this.state.chessGrid[thisIndex + 35])
                        // eslint-disable-next-line
                        let legalMove14 = document.getElementById(this.state.chessGrid[thisIndex + 42])
                        // eslint-disable-next-line
                        let legalMove15 = document.getElementById(this.state.chessGrid[thisIndex - 9])
                        // eslint-disable-next-line
                        let legalMove16 = document.getElementById(this.state.chessGrid[thisIndex - 18])
                        // eslint-disable-next-line
                        let legalMove17 = document.getElementById(this.state.chessGrid[thisIndex - 27])
                        // eslint-disable-next-line
                        let legalMove18 = document.getElementById(this.state.chessGrid[thisIndex - 36])
                        // eslint-disable-next-line
                        let legalMove19 = document.getElementById(this.state.chessGrid[thisIndex - 45])
                        // eslint-disable-next-line
                        let legalMove20 = document.getElementById(this.state.chessGrid[thisIndex - 54])
                        // eslint-disable-next-line
                        let legalMove21 = document.getElementById(this.state.chessGrid[thisIndex - 63])
                        // eslint-disable-next-line
                        let legalMove22 = document.getElementById(this.state.chessGrid[thisIndex - 72])
                        // eslint-disable-next-line
                        let legalMove23 = document.getElementById(this.state.chessGrid[thisIndex - 7])
                        // eslint-disable-next-line
                        let legalMove24 = document.getElementById(this.state.chessGrid[thisIndex - 14])
                        // eslint-disable-next-line
                        let legalMove25 = document.getElementById(this.state.chessGrid[thisIndex - 21])
                        // eslint-disable-next-line
                        let legalMove26 = document.getElementById(this.state.chessGrid[thisIndex - 28])
                        // eslint-disable-next-line
                        let legalMove27 = document.getElementById(this.state.chessGrid[thisIndex - 35])
                        // eslint-disable-next-line
                        let legalMove28 = document.getElementById(this.state.chessGrid[thisIndex - 42])

                        for (let i = 1; i < 29; i++) {
                            // eslint-disable-next-line
                            let test = eval(`legalMove${i}`)
                            if (test) {
                                let color = test.className
                                // let subStr1 = test.id.substr(1, 2)
                                // let subStr2 = piece.id.substr(1, 2)
                                // let subStr3 = test.id.substr(0, 1) 
                                // let subStr4 = piece.id.substr(0, 1)
                                // if (test && (subStr1 === subStr2 || subStr3 === subStr4)) {
                                    if(color===startColor || color === "yellow" || color === "yellow2")
                                    (test.appendChild(document.createElement("div")).className = "y-dot")
                            }
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
        if (piece.childNodes[0].id === "bP") {
            for (let i = 0; i < 64; i++) {
                if (this.state.chessGrid[i] === id) {
                    let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 8])
                        if (legalMove1 && this.state.twoClicks.length !== 1) {
                            let yellowCircle = document.getElementsByClassName("y-dot")
                            while(yellowCircle.length > 0) {
                                yellowCircle[0].parentNode.removeChild(yellowCircle[0])
                            }
                        }
                    }
                }
            }
        if (piece.childNodes[0].id === "wK" || piece.childNodes[0].id === "bK") {
            for (let i = 0; i < 64; i++) {
                if (this.state.chessGrid[i] === id) {
                    let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                    let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 1])

                        if ((legalMove1 || legalMove2) && this.state.twoClicks.length !== 1) {
                            let yellowCircle = document.getElementsByClassName("y-dot")
                            while(yellowCircle.length > 0) {
                                yellowCircle[0].parentNode.removeChild(yellowCircle[0])
                            }
                        }
                    }
                }
            } 
        if (piece.childNodes[0].id === "wR" || piece.childNodes[0].id === "bR") {
            for (let i = 0; i < 64; i++) {
                if (this.state.chessGrid[i] === id) {
                    let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 1])
                    let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 1])

                        if ((legalMove1 || legalMove2) && this.state.twoClicks.length !== 1) {
                            let yellowCircle = document.getElementsByClassName("y-dot")
                            while(yellowCircle.length > 0) {
                                yellowCircle[0].parentNode.removeChild(yellowCircle[0])
                            }
                        }
                    }
                }
            }
        if (piece.childNodes[0].id === "wN" || piece.childNodes[0].id === "bN") {
            for (let i = 0; i < 64; i++) {
                if (this.state.chessGrid[i] === id) {
                    let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 10])
                    let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 10])

                        if ((legalMove1 || legalMove2) && this.state.twoClicks.length !== 1) {
                            let yellowCircle = document.getElementsByClassName("y-dot")
                            while(yellowCircle.length > 0) {
                                yellowCircle[0].parentNode.removeChild(yellowCircle[0])
                            }
                        }
                    }
                }
            }
        if (piece.childNodes[0].id === "wQ" || piece.childNodes[0].id === "bQ") {
            for (let i = 0; i < 64; i++) {
                if (this.state.chessGrid[i] === id) {
                    let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 10])
                    let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 10])

                        if ((legalMove1 || legalMove2) && this.state.twoClicks.length !== 1) {
                            let yellowCircle = document.getElementsByClassName("y-dot")
                            while(yellowCircle.length > 0) {
                                yellowCircle[0].parentNode.removeChild(yellowCircle[0])
                            }
                        }
                    }
                }
            }
        if (piece.childNodes[0].id === "wB" || piece.childNodes[0].id === "bB") {
            for (let i = 0; i < 64; i++) {
                if (this.state.chessGrid[i] === id) {
                    let thisIndex = this.state.chessGrid.indexOf(id)
                    let legalMove1 = document.getElementById(this.state.chessGrid[thisIndex + 9])
                    let legalMove2 = document.getElementById(this.state.chessGrid[thisIndex - 9])

                        if ((legalMove1 || legalMove2) && this.state.twoClicks.length !== 1) {
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

    async handleUserLogic() {
        if (this.props.username) {
            await this.setState({
                thisUser: this.props.username,
            })
        } else {
            await this.setState({
                thisUser: "Guest"
            })
        }
        if (this.state.userWhite) {
            if (this.props.user) {
                await this.setState({
                    userBlack: this.props.user
                })
            if (this.state.newGame === true) {
                await axios
                .post('/game/newGame', {g_id: this.state.g_id, placement: this.state.placement, isWhiteTurn: true})
                .then(res => {
                    // console.log(res)
                })
                .catch(err => console.log(err))
            }
            await axios
            .post('/game/updateUsersPlaying', {g_id: this.state.g_id, userWhite: this.state.userWhite, userBlack: this.state.userBlack})
            .then(res => {
            console.log(res)
            })
            .catch(err => console.log(err))
            } else {
                this.setState({
                    userBlack: "Guest"
                })
            }
        } else {
            if (this.props.user) {
                await this.setState({
                    userWhite: this.props.user
                })
            } else {
                this.setState({
                    userWhite: "Guest"
                })
            }
        }
        await this.socket.emit(
            'update user', {g_id: this.state.g_id, state: this.state }
        )
        
    }

    async updateUserLogic(data) {
        // console.log(data)
        if (this.state.userWhite) {
            await this.setState({
                userBlack: data.state.userBlack
            })
        } else {
            await this.setState({
                userWhite: data.state.userWhite
            })
        }
    }

    async handleGame() {
        await this.setState({
            g_id: this.props.match.params.id
        })

        await axios
        .post('/game/checkGameExists', {g_id: this.state.g_id})
        .then(res => {
            if (res.data[0]) {
                this.setState({
                    placement: res.data[0].game_array,
                    newGame: false,
                    userBlack: res.data[0].black_user,
                    userWhite: res.data[0].white_user,
                    thisUser: this.props.username,
                    isWhiteTurn: res.data[0].is_white_turn,
                })
            }
        })
        .catch(err => console.log(err))
        
        
        await this.socket.emit('new game', {g_id: this.state.g_id})
        }
    

    async componentDidMount() {
    await this.handleGame()
    const chessGrid = this.state.chessGrid;
    const startingPlacement = this.state.placement;
    setTimeout(() => {
        this.setState({ loading: false });
        // Draws Chessboard
        for (var j = 0; j < 64; j++){
            let newCell = document.getElementById("mainChessBoard").appendChild(document.createElement("div"))
            newCell.className = (parseInt((j / 8) + j) % 2 === 0 ? 'white' : 'black')
            newCell.id = `${chessGrid[j]}`
            newCell.addEventListener('click', () => this.handleClick(newCell.id, newCell.className))
            newCell.addEventListener('mouseover', () => this.handleHover(newCell.id, newCell.className))
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
            if (startingPlacement[i] === "bN") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/knight-b.png";
            startingPiece.className = "piece";
            startingPiece.id = "b";
            }
            if (startingPlacement[i] === "bB") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/bishop-b.png";
            startingPiece.className = "piece";
            startingPiece.id = "b";
            }
            if (startingPlacement[i] === "bQ") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/queen-b.png";
            startingPiece.className = "piece";
            startingPiece.id = "b";
            }
            if (startingPlacement[i] === "bK") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/king-b.png";
            startingPiece.className = "piece";
            startingPiece.id = "b";
            }
            if (startingPlacement[i] === "wP") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/pawn-w.png";
            startingPiece.className = "piece";
            startingPiece.id = "w";
            }
            if (startingPlacement[i] === "wR") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/rook-w.png";
            startingPiece.className = "piece";
            startingPiece.id = "w";
            }
            if (startingPlacement[i] === "wN") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/knight-w.png";
            startingPiece.className = "piece";
            startingPiece.id = "w";
            }
            if (startingPlacement[i] === "wB") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/bishop-w.png";
            startingPiece.className = "piece";
            startingPiece.id = "w";
            }
            if (startingPlacement[i] === "wK") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/king-w.png";
            startingPiece.className = "piece";
            startingPiece.id = "w";
            }
            if (startingPlacement[i] === "wQ") {
            let startingPiece = document
                .getElementById(chessGrid[i])
                .appendChild(document.createElement("img"));
            startingPiece.src = "/assets/Pieces/queen-w.png";
            startingPiece.className = "piece";
            startingPiece.id = "w";
            }
        }, 800);
    }


    render() {
        // console.log(this.props)
        return (
        <div className="whole-game">
            
            <div className="tinkering">
            <div id="mainChessBoard"></div>

            <div className="border-letters">
                <div className="two-players">
                    <h1>{this.state.userWhite}-white VS {this.state.userBlack}-black</h1>
                </div>
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
            <div className="game-info">
                {this.state.isWhiteTurn ? (
                    <h1 className="player-turn">White's Turn</h1>
                ) : 
                    <h1 className="player-turn">Black's Turn</h1>
                }
                {this.state.twoClicks.length > 1 ? (
                    <h1 className="recent-moves">{this.state.twoClicks[0]} -> {this.state.twoClicks[1]}</h1>
                ) : null }
                {this.state.userWhite && this.state.userBlack ? (
                    null
                ) : 
                <div className="color-select">
                {this.state.userWhite ? (
                    <button onClick={() => this.handleUserLogic()}>Ready - Select Black</button>
                ) :
                    <button onClick={() => this.handleUserLogic()}>Ready - Select White</button>
                }
                </div>
                }
                <div className="destroyed-piece-container">
                    {/* <img className="destroyed-piece" src="/assets/Pieces/bishop-b.png" alt=""/> */}
                </div>
            </div>

        </div>
        );
    }
}

function mapStateToProps(reduxState) {
    return reduxState;
    }
    
    export default withRouter(connect(mapStateToProps, { updateUserInfo })(Chess));