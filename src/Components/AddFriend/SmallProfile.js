import React, { Component } from "react";
import "./SmallProfile.css";
import axios from 'axios'

export default class SmallProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friend: false,
            loggedInUser: this.props.usernameDisplay,
            user_id: ''
        }
    }

    getUser = () => {
        const {username} = this.state
        axios
          .get("/api/getUser", {username})
          .then(res => {
            console.log(res.data)
            this.setState({
              username: res.data.username,
              user_id: res.data.user_id
            });
          })
          .catch(err => console.log(err));
      };

    componentDidMount() {
        this.getUser();
    }

    addFriend = () => {
        const {loggedInUser} = this.state
        axios
          .post(`/api/addfriend/${this.props.user_id}`, {loggedInUser})
          .then(res => {
              this.setState({
                  friend: true
              })
          })
          .catch(err => console.log(err))
    }

  render() {

    return (
      <div className="small-profile">
        <div className="profile">
          <div className="profile-box">
            <div className="left-box">
                <img className="left-box-portrait" src={`/assets/ProfilePics/${this.props.portrait}`}/>
            </div>
            <div className="right-box">
              <div className="username">
                 <h4>{this.props.usernameProp}</h4>
              </div>
              <button
                className="edit-btn"
                onClick={() => console.log(this.state)}
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
