import React, { Component } from "react";
import "./SmallProfile.css";

export default class SmallProfile extends Component {
  render() {
    return (
      <div className="small-profile">
        <div className="profile">
          <h2>Your Account</h2>
          <div className="profile-box">
            <div className="left-box">
                <img className="left-box-portrait" src={this.props.portrait}/>
            </div>
            <div className="right-box">
              <div className="username">
                 <h4>{this.props.username}</h4>
              </div>
              <button
                className="edit-btn"
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
