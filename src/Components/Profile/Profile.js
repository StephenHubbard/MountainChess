import React, { Component } from "react";
// import { connect } from "react-redux";
import axios from "axios";
import "./Profile.css";
import Loading from '../Loading/Loading'
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import { withRouter, Link } from 'react-router-dom'

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      myGames: [],
    };
  }

  componentDidMount() {
    
    setTimeout(() => {
      this.setState({ loading: false });
      if (this.props.username) {
        axios
        .post('/api/getGames', {username: this.props.username})
        .then(res => {
          this.setState({
            myGames: res.data
          })
        })
        .catch(err => console.log(err))
      }
    }, 800);
    this.isUserTurn()
  }  

  isUserTurn() {
    // do you algorythm
    // set state to an array
  }

  render() {
    // const gameArray = this.state.arr.map()
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
        <div className="chart">
            <h1 className="current-games-h1"> Your Current Games </h1>
            <div className="white-black">
              <h1>White</h1>
              <h1>Black</h1>
            </div>
              <h1>Current Turn</h1>
          <div className="chart-row">
            {this.state.myGames.map(el => (
              <Link to={`/game/${el.g_id}`} >
              <div className="game-cont">
                <h1>{el.white_user}</h1>
                <h1>VS</h1>
                <h1>{el.black_user}</h1>
                <h1>{el.g_id}</h1>
                {el.is_white_turn ? (
                  <h1>White</h1>
                ) : 
                  <h1>Black</h1>
                }
              </div>
            </Link>
            ))}
          </div>
        </div>
      </div>)}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default withRouter(
  connect(mapStateToProps, { updateUserInfo })(Profile)
);

