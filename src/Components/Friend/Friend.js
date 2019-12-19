import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import "./Friend.css";
import io from 'socket.io-client'
import {withRouter} from 'react-router-dom'
import { updateUserInfo } from "../../ducks/reducer";

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      friends: [
        { username: "friend1" },
        { username: "friend2" },
        { username: "friend3" }
      ]
    };
    this.socket = io.connect(':7777')
  }

  componentDidMount() {
    let friendRoom = Math.floor(Math.random() * 1000)
    // console.log(this.props)
    this.socket.emit('I have friends', {friend_list: friendRoom})

  }

  challengeUser() {
    this.socket.emit('challenge user', {challenger: this.props.username, challengee: this.props.usernameDisplay})
  }

  render() {
    return (
      <div className="friend">
        <div className="status-container">
          <div className="status">{/*put status here*/}</div>
        </div>

        <div className="images">
          <img src="../../../assets/ProfilePics/mountain_poker_logo.png" alt=""/>
        </div>
        <div className="usernames">
          <div className="username-container">
            <div className="username"> {this.props.usernameDisplay} </div>
          </div>
        </div>
          <div className="button-container">
              <button onClick={() => this.challengeUser()}>Challenge</button>
          </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState
  }
  
export default withRouter(connect(mapStateToProps, {updateUserInfo})(Friend))
