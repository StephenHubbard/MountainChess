import React, { Component } from 'react'
import './Dashboard.css'
import Sidebar from '../Sidebar/Sidebar'
import io from 'socket.io-client'
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import UserPresence from "../Sidebar/UserPresence";



class Dashboard extends Component {
  constructor() {
    super ()

    this.state = {
      lastGame: 0
    }

    this.socket = io.connect(':7777')

  }

  async spectateGame() {
    let lastGame = 12
    await this.socket.emit('find a game', {lastGame: lastGame, username: this.props.username})
    await this.props.history.push(`/game/${lastGame}`)
  }

  async findGame() {
    await axios
    .get('/game/getLastGame') 
    .then(res => {
      console.log(res.data[0].max)
      this.setState({
        lastGame: res.data[0].max
      })
    })
    let lastGame = this.state.lastGame
    await this.socket.emit('find a game', {lastGame: lastGame, username: this.props.username})
    await this.props.history.push(`/game/${lastGame}`)
  }

  render() {
    return(
      <div>
      <UserPresence/>

        <Sidebar />
        <div className="logo">
          {/* <h1 className="title"> Mountain Chess </h1> */}
        </div>
        <div className="two-btns">
          <button onClick={() => this.spectateGame()}>Spectate</button>
          <button onClick={() => this.findGame()}>Start a Game</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default withRouter(connect(mapStateToProps, { updateUserInfo })(Dashboard));


