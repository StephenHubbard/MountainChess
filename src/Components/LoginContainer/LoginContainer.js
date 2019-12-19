import React, { Component } from "react";
import "./LoginContainer.css";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { updateUserInfo } from "../../ducks/reducer";
import axios from "axios";
// import LoggedInUser from "./LoggedInUser";
import Login from './../Auth/Login'

export default class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      user_id: ""
    };
    this.getUser = this.getUser.bind(this);
  }

  getUser = () => {
    axios
      .get("/auth/getUser")
      .then(res => {
        //console.log(res.data)
        this.setState({
          username: "",
          user_id: ""
        });
      })
      .catch(err => console.log(err));
  };

  logout = () => {
    axios.delete("./auth/logout").then(res => {
      //console.log(res.data)
      this.props.updateUserInfo({
        username: "",
        user_id: ""
      });
    });
  };

  render() {
    return (
      <div>
        {this.props.user_id ? (
          <div>
            <img
              className="sidebar-portrait"
              alt=""
              src={`/assets/ProfilePics/${this.props.profile_img}`}
            />
            <button id="logout-button" onClick={() => this.logout()}></button>
          </div>
        ) : (
          <div>
            <Login />
            <button id="login-button" onClick={this.login}></button>
            <button id="register-button" onClick={this.register}></button>
          </div>
        )}
      </div>
    );
  }
}
