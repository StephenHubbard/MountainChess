import React, { Component } from "react";
import "./Sidebar.css";
import io from 'socket.io-client'
import { connect } from "react-redux";
import { updateUserInfo } from "./../../ducks/reducer";
import './UserPresence.css'

class UserPresence extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      users: [],
      userOnline: 'red',
    };
    this.socket = io.connect(':7777')
    // this.socket.on('online', data => this.updateStatus(data))
  }


  async componentDidMount () {
    if (await this.props.username) {
      await this.statusUpdate()
    }
  }

  componentDidUpdate() {
    if( this.props.username) {
      this.statusUpdate()
    }
  }

  statusUpdate = () => {
    if (this.props.username) {
      this.socket.emit('online', {room: 'online', username: this.props.username, profile_img: this.props.profile_img})
      // this.setState({ userOnline: 'green' })
    } 
  }

  render() {
    // console.log(this.props)
    return (
      <div>
      
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(UserPresence);