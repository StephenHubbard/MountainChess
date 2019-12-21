import React, { Component } from "react";
import "./Sidebar.css";
import "./UserPresence.css";
import { connect } from "react-redux";
import { updateUserInfo } from "./../../ducks/reducer";
import axios from "axios";
import LoggedInUser from "./../LoginContainer/LoggedInUser";
import Register from "./../Auth/Register";
// import LoginContainer from "./../LoginContainer/LoginContainer";
import Login from "./../Auth/Login"
import TopUsers from './../TopUsers/TopUsers'
// import UserPresence from "./UserPresence";
// import Friend from '../Friend/Friend'
import io from 'socket.io-client'


class Sidebar extends Component {
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
      userFriends: [],
    };
    this.getUser = this.getUser.bind(this);
    this.getPortraits = this.getPortraits.bind(this);
    this.loginModalToggle = this.loginModalToggle.bind(this);
    this.socket = io.connect(':7777')
    this.socket.on('all online users', data => this.updateFollowedUsers(data))

  }

  componentDidMount() {
    this.getUser();
    this.getUsers();
    this.getPortraits();
  }

  async calcOfflineUsers() {
    // * Welcome to my wet code hell. -Stephen
    let newArr1 = []
    let newArr2 = []
    let offlineUsers = []
    let offlineUsersFull = []
    for ( let i = 0; i < this.state.loggedInUsers.length; i++) {
      await newArr1.push(this.state.loggedInUsers[i].username)
    }
    for ( let i = 0; i < this.state.userFriends.length; i++) {
      await newArr2.push(this.state.userFriends[i].username)
    }
    for (let i in newArr2) {
      if (newArr1.indexOf(newArr2[i]) < 0){
        offlineUsers.push(newArr2[i])
      }
    }
    for (let i = 0; i < offlineUsers.length; i++) {
      for (let k = 0; k < this.state.userFriends.length; k++) {
        if (this.state.userFriends[k].username === offlineUsers[i]) {
          offlineUsersFull.push(this.state.userFriends[k])
        }
      }
    }
    await this.setState({
      offlineUsers: offlineUsersFull
    })
    console.log(this.state.offlineUsers)
  }

  async updateFollowedUsers(data) {
    this.setState({
      loggedInUsers: data
    })
    await this.getUserFriends()
    await this.calcOfflineUsers()
  }

  async getUserFriends(){
    // console.log(this.state.users)
    const { user_id } = this.props
    await axios
    .post('/api/getUserFriends', { user_id })
    .then(res => {
      this.setState({
        userFriends: res.data
      })
    })
    .catch(err => console.log(err))
  }

  getUser = () => {
    if(this.props.username) {
    axios
      .get("/auth/getUser")
      .then(res => {
        // console.log(res.data)
        this.setState({
          username: "",
          user_id: "",
          profile_img:""
        });
      })
      .catch(err => console.log(err));
  };
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
    }

  updatePortrait = name => {
    axios.put("/api/portraits", { name: name }).then(res => {
      //console.log(res.data)
      this.props
        .updateUserInfo({
          username: res.data.username,
          user_id: res.data.user_id,
          profile_img: res.data.portrait,
          email: res.data.email
        })
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
    })
  }

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
        .get('/api/users')
        .then(res => {
          this.setState({
            users: res.data
          })
          // this.calcOfflineUsers()
        })
        .catch(err => {
          console.log(err)
        })
  }

  

  render() {
    const { open } = this.state;
    let allPortraits = this.state.portraits.map((portrait, i) => {
      if (portrait.image !== 'blank-profile.png'){
        return (
          <img
            onClick={() => this.updatePortrait(portrait.image)}
            className="sidebar-portrait"
            alt="portrait"
            src={`/assets/ProfilePics/${portrait.image}`}
          />
        )
      } else {
        return <></>
      }
      
    });
    return (
      <>
      {this.state.open ? (
        null
      ) : <div className="hamburger-closed">
      <i
        className="fas fa-bars"
        onClick={() => {
          this.setState({ open: !open });
          // console.log(this.state.open);
        }}
      />
      </div>}
      
        {/* <div className={`sidebar-${open ? 'open' : ''}`}>
                <h1>sidebarrrr</h1>
              </div> */}
        <div className="sidebar-toggle">
          <div className={`sidebar ${open ? "open" : ""}`}>
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
                  <h4>{this.props.username}</h4>
                  <button id="logout-button" onClick={() => this.logout()}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="login-div">
                  <button id="login-button" onClick={() => this.loginModalFn()}>
                    Login
                  </button>
                  <button id="register-button" onClick={this.registerModalFn}>
                    Register
                  </button>
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
                              },
                              // console.log(this.state.loginModalActivate)
                            )
                          }
                        >
                          &times;
                        </span>
                        {/* <h2>Please enter your login information.</h2> */}
                      </div>
                      <div className="modal-loginInfo">
                        <Login 
                        loginModalActivateFn = {this.loginModalToggle}
                        />
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
                      <div className="modal-portraits">
                        {allPortraits}
                      </div>
                    </div>
                  </div>
                  {/* <div class="overlay"></div> */}
                </div>
              )}
            </div>
            <div className="friends-list" id="style-2">
              <h3>Friends</h3>
              <ul>
                {this.state.loggedInUsers.map(el =>  (
                  <li className="friend-li" key={el.username}>
                    <div className="friend">
                      <div className="green" />
                      <img className="portrait-small" src={`/assets/ProfilePics/${el.portrait}`} alt="" />
                      {el.username}
                      <button className="invite-btn">Invite</button>
                    </div>
                  </li>
                ))}
                {this.state.offlineUsers.map(el =>  (
                  <li className="friend-li" key={el.username}>
                    <div className="friend">
                      <div className="red offline-friend" />
                      <img className="portrait-small" src={`/assets/ProfilePics/${el.portrait}`} alt="" />
                      {el.username}
                      <button className="invite-btn">Invite</button>
                    </div>
                  </li>
                ))}

              </ul>
            </div>
            <div className="top-users">
              <h3>Top Users</h3>
              <TopUsers/>
            </div>
          </div>
          <LoggedInUser logout={this.logout} />
        </div>
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(Sidebar);
