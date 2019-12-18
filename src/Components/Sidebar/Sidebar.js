import React, { Component } from "react";
import "./Sidebar.css";
import { connect } from "react-redux";
import { updateUserInfo } from "./../../ducks/reducer";
import axios from "axios";
import LoggedInUser from "./../LoginContainer/LoggedInUser";
import Register from "./../Auth/Register";
// import LoginContainer from "./../LoginContainer/LoginContainer";
import Login from "./../Auth/Login"
import Friend from '../Friend/Friend'

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      username: "",
      user_id: "",
      loginModalActivate: false,
      registerModalActivate: false,
      users: [],
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getUsers()
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

  getUsers() {
    console.log('hit')
    axios 
      .get('/api/users')
      .then(res => {
        this.setState({
          users: res.data
        })
        console.log(this.state.users)
      })
      .catch(err => {
        console.log(err)
      })
  }

  

  render() {
    // console.log(this.props)
    const { open } = this.state;
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
                    src="https://engineering.mit.edu/wp-content/uploads/blank-profile-picture.png"
                    // src={`/assets/ProfilePics/${this.props.profile_img}`} />
                    alt=""
                    className="profile-picture"
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
                            this.setState({
                              loginModalActivate: false
                            },
                            console.log(this.state.loginModalActivate)
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
            </div>
            <div className="friends-list">
              <h3>Your Friends</h3>
              <ul>
                {this.state.users.map(el =>  (
                  <li><Friend username={el.username}/></li>
                ))}
              </ul>
                {//<div className="friend">{el.username}<button className="invite-btn">Invite</button></div>
                }
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
