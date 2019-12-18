import React, { Component } from "react";
import "./Sidebar.css";
import axios from 'axios'

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers()
  }

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
    const { open } = this.state;
    return (
      <>
        <div className="hamburger">
          <i
            className="fas fa-bars"
            onClick={() => {
              this.setState({ open: !open });
              console.log(this.state.open);
            }}
          />
        </div>
        {/* <div className={`sidebar-${open ? 'open' : ''}`}>
                <h1>sidebarrrr</h1>
            </div> */}
        <div className="sidebar-toggle">
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="profile-pic-container">
              <img
                src="https://engineering.mit.edu/wp-content/uploads/blank-profile-picture.png"
                className="profile-picture"/>
                <h4 className="username">Carter</h4>
            </div>
            <div className="friends-list">
              <ul>
                {this.state.users.map(el =>  (
                  <li><div className="friend">{el.username}<button className="invite-btn">Invite</button></div></li>
                ))}
              </ul>
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
        </div>
      </>
    );
  }
}

export default Sidebar;
