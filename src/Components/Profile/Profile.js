import React, { Component } from "react";
// import { connect } from "react-redux";
// import axios from "axios";
import "./Profile.css";
import Loading from '../Loading/Loading'
//import redux functions

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
  }  

  render() {
    return (
      <>
      {this.state.loading && (
        <>
          <div className="loading">
            <Loading />
          </div>
        </>
      )}
      {!this.state.loading && (<div className="big-profile">
          <h1> Your Current Games </h1>
        <div className="chart">
          <div className="chart-row">
            
          </div>
        </div>
      </div>)}
      
      </>
    );
  }
}
