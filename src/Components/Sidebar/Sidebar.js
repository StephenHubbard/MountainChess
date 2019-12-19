import React, { Component } from "react";
import "./Sidebar.css";
import { connect } from "react-redux";
import { updateUserInfo } from "./../../ducks/reducer";
import axios from "axios";
import LoggedInUser from "./../LoginContainer/LoggedInUser";
import Register from "./../Auth/Register";
// import LoginContainer from "./../LoginContainer/LoginContainer";
import Login from "./../Auth/Login";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      username: "",
      user_id: "",
      loginModalActivate: false,
      registerModalActivate: false,
      portraitModalActivate: false,
      users: [],
      portraits: []
    };
    this.getUser = this.getUser.bind(this);
    this.getPortraits = this.getPortraits.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getUsers();
    this.getPortraits();
  }

  getUser = () => {
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
    });
  };

  loginModalFn = () => {
    this.setState({
      loginModalActivate: !this.state.loginModalActivate
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
    console.log("hit");
    axios
    .get("/api/users")
    .then(res => {
      this.setState({
        users: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    console.log(this.props)
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
      }
      
    });
    return (
      <>
        <div className="hamburger">
          <i
            className="fas fa-bars"
            onClick={() => {
              this.setState({ open: !open });
              // console.log(this.state.open);
            }}
          />
        </div>
        {/* <div className={`sidebar-${open ? 'open' : ''}`}>
                <h1>sidebarrrr</h1>
            </div> */}
        <div className="sidebar-toggle">
          <div className={`sidebar ${open ? "open" : ""}`}>
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
                  <div className="modal-content">
                    {/* Modal Body */}
                    <div className="modal-body">
                      <div className="modal-header">
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
                        <Login />
                      </div>
                    </div>
                  </div>
                  {/* <div class="overlay"></div> */}
                </div>
              )}

              {/* REGISTER MODAL */}
              {this.state.registerModalActivate && (
                <div>
                  <div className="modal-content">
                    {/* Modal Body */}
                    <div className="modal-body">
                      <div className="modal-header">
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
                        <h2>Register for a free account.</h2>
                      </div>
                      <div className="modal-registerInfo">
                        <Register />
                      </div>
                    </div>
                  </div>
                  {/* <div class="overlay"></div> */}
                </div>
              )}

              {/* PORTRAIT MODAL */}
              {this.state.portraitModalActivate && (
                <div>
                  <div className="modal-content">
                    {/* Modal Body */}
                    <div className="modal-body">
                      <div className="modal-header">
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
            <div className="friends-list">
              <ul>
                {this.state.users.map(el => (
                  <li>
                    <div className="friend">
                      {el.username}
                      <button className="invite-btn">Invite</button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* <li><div className="offline-online"></div>Friend1<button>Challenge</button></li>
                <li><div className="offline-online"></div>Friend2<button>Challenge</button></li>
                <li><div className="offline-online"></div>Friend3<button>Challenge</button></li>
                <li><div className="offline-online"></div>Friend4<button>Challenge</button></li>
                <li><div className="offline-online"></div>Friend5<button>Challenge</button></li>
                <li><div className="offline-online"></div>Friend6<button>Challenge</button></li> */}
            </div>
            <div className="top-users">
              <ul>
                <li>User1</li>
                <li>User2</li>
                <li>User3</li>
                <li>User4</li>
              </ul>
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
