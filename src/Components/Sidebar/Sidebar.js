import React, { Component } from "react";
import "./Sidebar.css";
import "./UserPresence.css";
import { connect } from "react-redux";
import { updateUserInfo } from "./../../ducks/reducer";
import axios from "axios";
import LoggedInUser from "./../LoginContainer/LoggedInUser";
import Register from "./../Auth/Register";
// import LoginContainer from "./../LoginContainer/LoginContainer";
import Login from "./../Auth/Login";
import TopUsers from "./../TopUsers/TopUsers";
// import UserPresence from "./UserPresence";
// import Friend from '../Friend/Friend'
import io from "socket.io-client";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import {Link} from 'react-router-dom'

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: "",
      user_id: "",
      loginModalActivate: false,
      registerModalActivate: false,
      portraitModalActivate: false,
      users: [],
      portraits: [],
      loggedInUsers: [],
      offlineUsers: [],
      userFriends: []
    };
    this.getUser = this.getUser.bind(this);
    this.getPortraits = this.getPortraits.bind(this);
    this.loginModalToggle = this.loginModalToggle.bind(this);
    this.socket = io.connect(":7777");
    this.socket.on("all online users", data => this.updateFollowedUsers(data));
    this.socket.on("new game challenge", data => this.challengeAlert(data));
    this.socket.on("challenge was accepted", data =>
      this.challengeAccepted(data)
    );
  }

  componentDidMount() {
    this.getUser();
    this.getUsers();
    this.getPortraits();
  }

  async calcOfflineUsers() {
    // * Welcome to my wet code hell. -Stephen
    let newArr1 = [];
    let newArr2 = [];
    let offlineUsers = [];
    let offlineUsersFull = [];
    for (let i = 0; i < this.state.loggedInUsers.length; i++) {
      await newArr1.push(this.state.loggedInUsers[i].username);
    }
    for (let i = 0; i < this.state.userFriends.length; i++) {
      await newArr2.push(this.state.userFriends[i].username);
    }
    for (let i in newArr2) {
      if (newArr1.indexOf(newArr2[i]) < 0) {
        offlineUsers.push(newArr2[i]);
      }
    }
    for (let i = 0; i < offlineUsers.length; i++) {
      for (let k = 0; k < this.state.userFriends.length; k++) {
        if (this.state.userFriends[k].username === offlineUsers[i]) {
          offlineUsersFull.push(this.state.userFriends[k]);
        }
      }
    }
    await this.setState({
      offlineUsers: offlineUsersFull
    });
  }

  async updateFollowedUsers(data) {
    this.setState({
      loggedInUsers: data
    });
    await this.getUserFriends();
    await this.calcOfflineUsers();
  }

  async getUserFriends() {
    // console.log(this.state.users)
    const { user_id } = this.props;
    await axios
      .post("/api/getUserFriends", { user_id })
      .then(res => {
        this.setState({
          userFriends: res.data
        });
      })
      .catch(err => console.log(err));
  }

  getUser = () => {
    if (this.props.username) {
      axios
        .get("/auth/getUser")
        .then(res => {
          // console.log(res.data)
          this.setState({
            username: "",
            user_id: "",
            profile_img: ""
          });
        })
        .catch(err => console.log(err));
    }
  };

  getPortraits = () => {
    axios
      .get("/api/portraits")
      .then(res => {
        //console.log(res.data)
        this.setState({
          portraits: res.data
        });
      })
      .catch(err => console.log(err));
  };

  updatePortrait = name => {
    axios
      .put("/api/portraits", { name: name })
      .then(res => {
        //console.log(res.data)
        this.props.updateUserInfo({
          username: res.data.username,
          user_id: res.data.user_id,
          profile_img: res.data.portrait,
          email: res.data.email
        });
      })
      .catch(err => console.log(err));
  };

  logout = () => {
    axios.delete("/auth/logout").then(res => {
      // console.log(res.data)
      this.props.updateUserInfo({
        username: "",
        user_id: ""
      });
      window.location.reload();
    });
  };

  loginModalFn = () => {
    this.setState({
      loginModalActivate: !this.state.loginModalActivate
    });
  };

  loginModalToggle = () => {
    this.setState({
      loginModalActivate: false
    });
  };

  registerModalFn = () => {
    this.setState({
      registerModalActivate: !this.state.registerModalActivate
    });
  };

  portraitModalFn = () => {
    this.setState({
      portraitModalActivate: !this.state.portraitModalActivate
    });
  };

  getUsers() {
    axios
      .get("/api/users")
      .then(res => {
        this.setState({
          users: res.data
        });
        // this.calcOfflineUsers()
      })
      .catch(err => {
        console.log(err);
      });
  }

  inviteFriend(friend) {
    this.socket.emit("challenge user", {
      challenger: this.props.username,
      challengee: friend
    });
  }

  challengeAlert(data) {
    let lastGame = 0
    axios
    .get('/game/getLastGame') 
    .then(res => {
        lastGame = res.data[0].max + 1
    })
    if (this.props.username === data.challengee) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      Swal.fire({
        title: `<strong>${data.challenger} has challenged you to a game!</strong>`,
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Accept!',
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: "Thumbs down"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            this.props.history.push(`/game/${lastGame}`),
            `<strong>Good Luck!</strong>`,
            "success"
          );
          this.socket.emit("challenge accepted", {
            challenger: data.challenger,
            challengee: data.challengee
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Declined",
            `${data.challenger} will be alerted of your cowardness`,
            "error"
          );
        }
      });
    }
  }

  async challengeAccepted(data) {
    let lastGame = 0
    await axios
    .get('/game/getLastGame') 
    .then(res => {
        lastGame = res.data[0].max + 1
    })
    if (this.props.username === data.challenger) {
      await this.props.history.push(`/game/${lastGame}`);
      Swal.fire({
        title: `<strong>${data.challengee} has accepted your challenge`,
        icon: "success"
      });
    }
  }

  render() {
    const { open } = this.state;
    let allPortraits = this.state.portraits.map((portrait, i) => {
      if (portrait.image !== "blank-profile.png") {
        return (
          <img
            onClick={() => this.updatePortrait(portrait.image)}
            className="sidebar-portrait"
            alt="portrait"
            src={`/assets/ProfilePics/${portrait.image}`}
          />
        );
      } else {
        return <></>;
      }
    });
    return (
      <>
        {/* {this.state.open ? null : (
          <div className="hamburger-closed">
            <i
              className="fas fa-bars"
              onClick={() => {
                this.setState({ open: !open });
                // console.log(this.state.open);
              }}
            />
          </div>
        )} */}

        {/* <div className={`sidebar-${open ? 'open' : ''}`}>
                <h1>sidebarrrr</h1>
              </div> */}
        <div className="sidebar-toggle">
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="left-sidebar">
              <div className="hamburger-open">
                <i
                  className="fas fa-bars"
                  onClick={() => {
                    this.setState({ open: !open });
                    // console.log(this.state.open);
                  }}
                />
              </div>
              <div className="login-container">
                {this.props.user_id ? (
                  <div className="profile-div">
                    <img
                      // src="https://engineering.mit.edu/wp-content/uploads/blank-profile-picture.png"
                      className="profile-picture"
                      alt=""
                      src={`/assets/ProfilePics/${this.props.profile_img}`}
                      onClick={() => this.portraitModalFn()}
                    />
                    <h4 data-testid = "username">{this.props.username}</h4>
                    <button id="logout-button" onClick={() => this.logout()}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="profile-div">
                      <img
                        // src="https://engineering.mit.edu/wp-content/uploads/blank-profile-picture.png"
                        className="profile-picture"
                        alt=""
                        src={`/assets/ProfilePics/blank-profile.png`}
                      />
                      <h4>Guest</h4>
                    </div>
                    <div className="login-div">
                      <button
                        id="login-button"
                        onClick={() => this.loginModalFn()}
                      >
                        Login
                      </button>
                      <button
                        id="register-button"
                        onClick={this.registerModalFn}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                )}

                {/* LOGIN MODAL */}
                {this.state.loginModalActivate && (
                  <div>
                    <div className="login-modal-content">
                      {/* Modal Body */}
                      <div className="login-modal-body">
                        <div className="login-modal-header">
                          <span
                            className="close"
                            onClick={() =>
                              this.setState(
                                {
                                  loginModalActivate: false
                                }
                                // console.log(this.state.loginModalActivate)
                              )
                            }
                          >
                            &times;
                          </span>
                          {/* <h2>Please enter your login information.</h2> */}
                        </div>
                        <div className="centerThis">
                          <Login loginModalActivateFn={this.loginModalToggle} />
                        </div>
                      </div>
                    </div>
                    {/* <div class="overlay"></div> */}
                  </div>
                )}

                {/* REGISTER MODAL */}
                {this.state.registerModalActivate && (
                  <div>
                    <div className="register-modal-content">
                      {/* Modal Body */}
                      <div className="register-modal-body">
                        <div className="register-modal-header">
                          <span
                            className="close"
                            onClick={() =>
                              this.setState({
                                registerModalActivate: false
                              })
                            }
                          >
                            &times;
                          </span>
                          {/* <h2>Register for a free account.</h2> */}
                        </div>
                        {/* <div className="modal-registerInfo"> */}
                        <Register />
                        {/* </div> */}
                      </div>
                    </div>
                    {/* <div class="overlay"></div> */}
                  </div>
                )}

                {/* PORTRAIT MODAL */}
                {this.state.portraitModalActivate && (
                  <div>
                    <div className="portrait-modal-content">
                      {/* Modal Body */}
                      <div className="portrait-modal-body">
                        <div className="portrait-modal-header">
                          <span
                            className="close"
                            onClick={() =>
                              this.setState({
                                portraitModalActivate: false
                              })
                            }
                          >
                            &times;
                          </span>
                          <h2>Choose your profile picture</h2>
                        </div>
                        <div className="modal-portraits">{allPortraits}</div>
                      </div>
                    </div>
                    {/* <div class="overlay"></div> */}
                  </div>
                )}
              </div>

              {/* <ToastContainer /> */}
              <div className="friends-list" id="scroll-style">
                {this.props.username ? (
                  <div>
                    <h3>Friends</h3>
                    <ul>
                      {this.state.loggedInUsers.map(el => (
                        <li className="friend-li" key={el.username}>
                          <div className="friend">
                            <div className="green" />
                            <img
                              className="portrait-small"
                              src={`/assets/ProfilePics/${el.portrait}`}
                              alt=""
                            />
                            <h5>{el.username}</h5>
                            <button
                              className="invite-btn"
                              onClick={() => this.inviteFriend(el.username)}
                            >
                              Challenge
                            </button>
                          </div>
                        </li>
                      ))}
                      {this.state.offlineUsers.map(el => (
                        <li className="friend-li" key={el.username}>
                          <div className="friend">
                            <div className="red offline-friend" />
                            <img
                              className="portrait-small"
                              src={`/assets/ProfilePics/${el.portrait}`}
                              alt=""
                            />
                            <h5>{el.username.substring(0, 8)}</h5>
                            <button className="offline-btn">Offline</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                  <h5 className="online-users-h1">Online Users</h5>
                  <ul>
                      {this.state.loggedInUsers.map(el => (
                        <li className="friend-li" key={el.username}>
                          <div className="friend">
                            <div className="green" />
                            <img
                              className="portrait-small"
                              src={`/assets/ProfilePics/${el.portrait}`}
                              alt=""
                            />
                            <h5>{el.username}</h5>
                            <button
                              className="invite-btn"
                              onClick={() => this.inviteFriend(el.username)}
                            >
                              Challenge
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    </div>
                )}
              </div>
              <div className="top-users" id="scroll-style">
                <h3>Top Users</h3>
                <TopUsers />
              </div>
            </div>
            <div className="icon-bar">
              <div className='spacer'></div>
                  <Link to="/">
                    <i className="fas fa-home" id='sb-icon'></i>
                  </Link>
                  <Link to="/users">
                    <i className="fas fa-users" id='sb-icon'></i>
                  </Link>

                  <Link to="/about">
                    <i class="fas fa-info-circle" id='sb-icon'></i>
                  </Link>

                  <Link to="/chess">
                    <i className="fas fa-chess" id='sb-icon'></i>
                  </Link>
            </div>
            <LoggedInUser logout={this.logout} />
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default withRouter(
  connect(mapStateToProps, { updateUserInfo })(Sidebar)
);
