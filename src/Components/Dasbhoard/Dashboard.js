import React, { Component } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import UserPresence from "../Sidebar/UserPresence";



class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      lastGame: 0
    };

  }

  

  render() {
    return (
      <div>
      <UserPresence/>

        <Sidebar />
        <Link to="/">
          <div className="logo">
            {/* <h1 className="title"> Mountain Chess </h1> */}
          </div>
        </Link>
        
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default withRouter(
  connect(mapStateToProps, { updateUserInfo })(Dashboard)
);
