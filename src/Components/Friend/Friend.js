import React, { Component } from "react";
// import { connect } from "react-redux";
import axios from "axios";
import "./Friend.css";

//import {
//redux functions
//}

export default class Friend extends Component {
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
  }



  render() {
    return (
      <div className="friend">
        <div className="status-container">
          <div className="status">{/*put status here*/}</div>
        </div>

        <div className="images">
          <img src="../../../assets/ProfilePics/mountain_poker_logo.png" />
        </div>
        <div className="usernames">
          <div className="username-container">
            <div className="username"> {this.props.usernameDisplay} </div>
          </div>
        </div>
          <div className="button-container">
              <button>Play</button>
          </div>
      </div>
    );
  }
}
