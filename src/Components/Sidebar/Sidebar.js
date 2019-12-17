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
            <img
              src="https://engineering.mit.edu/wp-content/uploads/blank-profile-picture.png"
              className="profile-picture"
            />
            <div>
              <ul className="friends-list">
                <li>Friend1</li>
                <li>Friend2</li>
                <li>Friend3</li>
                <li>Friend4</li>
                <li>Friend5</li>
                <li>Friend6</li>
              </ul>
            </div>
            <ul className="top-users">
              <li>User1</li>
              <li>User2</li>
              <li>User3</li>
              <li>User4</li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar 