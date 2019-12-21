import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './TopUsers.css'
// import { withRouter } from 'react-router-dom'

class TopUsers extends Component {
  constructor() {
    super ()
    this.state = {
      topUsers: [],
    }
  }

  componentDidMount() {
    this.getTopUsers()
  }

  getTopUsers = () => {
    axios
      .get('/api/elo')
      .then(res => {
        this.setState({
          topUsers: res.data
      });
      console.log(this.state.topUsers)
    })
  }

  render() {
    return (
      <ul >
        {this.state.topUsers.map(el =>  (
          <li className="top-user-li" key={el.username} >
            <img className="portrait-small" src={`/assets/ProfilePics/${el.portrait}`} alt="" />
            <div className="top-user-username">
              {el.username}
            </div>
            <div className="top-user-elo">
              {el.elo}
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, {})(TopUsers);