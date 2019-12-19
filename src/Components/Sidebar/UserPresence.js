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

  // async componentDidMount() {
  //   await this.statusUpdate()
  //   await console.log('hit2')
  // }

  componentDidMount () {
    if (this.props.username) {
      this.statusUpdate()
    }
    console.log('hit3')
  }
    // this.setState({userOnline: !this.state.userOnline}, () => {

  statusUpdate = () => {
    console.log('hit2')
    if (this.props.username) {
      this.socket.emit('online', { room: 'online', user: this.props.username })
      this.setState({ userOnline: 'green' })
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className={this.state.userOnline}>

        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(UserPresence);