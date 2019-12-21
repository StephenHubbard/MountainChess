import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import "./Home.css";



class Home extends Component {
    constructor() {
        super();

        this.state = {
        };
        this.socket = io.connect(":7777");
    }

    async spectateGame() {
    let lastGame = 12;
    await this.socket.emit("find a game", {
        lastGame: lastGame,
        username: this.props.username
    });
    await this.props.history.push(`/game/${lastGame}`);
    }

    async findGame() {
    await axios
    .get('/game/getLastGame') 
    .then(res => {
        this.setState({
        lastGame: res.data[0].max + 1
        })
    })
    let lastGame = this.state.lastGame
    await this.socket.emit('find a game', {lastGame: lastGame, username: this.props.username})
    await this.props.history.push(`/game/${lastGame}`)
    }


    render() {
        return (
            <div className="two-btns">
                <button onClick={() => this.spectateGame()}>Spectate</button>
                <button onClick={() => this.findGame()}>Start a Game</button>
            </div>
        );
    }
    }

    function mapStateToProps(reduxState) {
    return reduxState;
    }

    export default withRouter(
    connect(mapStateToProps, { updateUserInfo })(Home)
    );
