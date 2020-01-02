import React, { Component } from "react";
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
// import Demo from "../GameView/Chessboard/Demo";
import "./GameView.css";
import { connect } from "react-redux";
import { updateUserInfo } from "./../../ducks/reducer";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import Chess from "../Chess/Chess";
import Loading from "../Loading/Loading";

class GameView extends Component {
  constructor() {
    super();

    this.state = {
      newNum: 0,
      newNumBackend: 0,
      messages: [],
      message: "",
      username: "Guest",
      usernameSet: false,
      userTyping: false,
      img: "",
      loading: true
    };
    this.socket = io.connect(":7777");
    this.socket.on("room response", data => this.updateMessages(data));
    this.socket.on("typing", () => this.setTyping());
    this.socket.on("stopped typing", () => this.stopTyping());
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
    if (this.props.username) {
      this.setState({
        username: this.props.username
      });
    }
    this.socket.emit("join game room", { room: "game room" });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.message) {
        this.socket.emit("typing", { room: "game room" });
      } else {
        this.socket.emit("stopped typing", { room: "game room" });
      }
    });
  };

  setTyping = () => {
    this.setState({ userTyping: true });
  };

  stopTyping = () => {
    this.setState({ userTyping: false });
  };

  updateMessages = data => {
    this.setState({
      messages: [
        ...this.state.messages,
        { message: data.message, username: data.username }
      ],
      userTyping: false,
      img: data.img
    });
  };

  blast = () => {
    this.socket.emit("blast to game room", {
      message: this.state.message,
      username: this.state.username,
      img: this.props.profile_img
    });
    this.setState({
      message: ""
    });
  };

  render() {
    // console.log(this.props)
    const messages = this.state.messages.map((message, i) => (
      <div
        key={i}
        className={
          message.username === this.state.username ? "my-message" : "message"
        }
      >
        <div className="chat-prof-pic">
          <img
            className="portrait-small"
            src={`/assets/ProfilePics/${this.state.img}`}
            alt=""
          />
        </div>
        <div className="chat-username">
          <h5>{message.username}: </h5>
        </div>
        <div className="chat-message">
          <p> &nbsp;&nbsp;{message.message}&nbsp;&nbsp; </p>
        </div>
      </div>
    ));
    return (
      <>
        {this.state.loading && (
          <>
            <div className="loading">
              <Loading />
            </div>
          </>
        )}
         {!this.state.loading && (
        <div className="game-view">
          <div className="game-row">
            <Chess user={this.props.username} />
            <div className="chat-cont">
              <div className="messages">{messages}</div>
              {this.state.userTyping && (
                <h4 className="typing-message">User Typing...</h4>
              )}
              <div className="input-btn-div">
                <input
                  type="text"
                  name="message"
                  className="chat-input"
                  placeholder="Message..."
                  value={this.state.message}
                  onChange={this.handleChange}
                  onKeyPress={event => {
                    if (event.key === "Enter") {
                      this.blast();
                    }
                  }}
                />
                <button className="send-btn" onClick={this.blast}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default withRouter(
  connect(mapStateToProps, { updateUserInfo })(GameView)
);
