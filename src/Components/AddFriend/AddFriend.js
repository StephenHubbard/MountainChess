import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SmallProfile from './SmallProfile'

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      search: ""
    };
  }

  componentDidMount() {
    axios 
    .get('/api/users')
    .then(res => {
      this.setState({
        users: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  clearSearch = () => {
    this.setState({
      search: ""
    });
  };

  filter = () => {
      let arr = this.state.users.map(el => el.username.includes(`${this.state.search}`))
  }

  handleChange = target => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return <div className="add-friend">
        <input name='search' onChange={e => { this.handleChange(e.target);}} value={this.state.search} placeholder='Search by Username' />
        <ul>
            {!this.state.search ? this.state.users.map(el => (<SmallProfile username={el.username} email={el.username} portrait={el.portrait}/>)) : this.state.filteredUsers.map(el => (<SmallProfile username={el.username} email={el.username} portrait={el.portrait} />))}
        </ul>
    </div>;
  }
}
