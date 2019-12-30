import React, { Component } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import UserPresence from "../Sidebar/UserPresence";
import Loading from '../Loading/Loading'


class Dashboard extends Component {
  constructor() {
    super();

  }



  render() {
    return (
      <>
      <div>
      <UserPresence/>

        <Sidebar />
        <Link to="/">
          <div className="logo">
            {/* <h1 className="title"> Mountain Chess </h1> */}
          </div>
        </Link>
        <nav className="dashboard-nav stroke">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/users">
            <li>All Users</li>
          </Link>
          <Link to="/profile/1">
            <li>My Profile</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/tinkering">
            <li>Chess</li>
          </Link>
        </nav>
      </div>
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default withRouter(
  connect(mapStateToProps, { updateUserInfo })(Dashboard)
);
