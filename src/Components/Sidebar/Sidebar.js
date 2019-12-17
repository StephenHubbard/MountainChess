import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
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
                <li>Friend1</li>
                <li>Friend2</li>
                <li>Friend3</li>
                <li>Friend4</li>
                <li>Friend5</li>
                <li>Friend6</li>
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
