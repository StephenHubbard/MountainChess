import React, { Component } from "react";
import "./SmallProfile.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";
import Swal from 'sweetalert2'

class SmallProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: false,
      loggedInUser: '',
      isSame: ''
    };
  }

  // getUser = () => {
  //     const {username} = this.state
  //     axios
  //       .get("/api/getUser", {username})
  //       .then(res => {
  //         console.log(res.data)
  //         this.setState({
  //           username: res.data.username,
  //           user_id: res.data.user_id
  //         });
  //       })
  //       .catch(err => console.log(err));
  //   };

  componentDidMount() {
    if (this.props.username) {
      this.checkFriend();
      this.checkIfSame();
    }
  }

  checkIfSame = () => {
    axios
        .get(`/api/users/${this.props.user_id_display}`)
        .then( res => {
            if(this.state.loggedInUser === res.data[0].username) {
                this.setState({isSame: 'same'})
            }
        })
  }

  addFriend = () => {
      if(this.props.username){
        const { loggedInUser } = this.state;
        axios
          .post(`/api/addfriend/${this.props.user_id_display}`, { loggedInUser })
          .then(res => {
            this.setState({
              friend: true
            });
          })
          .catch(err => console.log(err));
      } else {
        Swal.fire({
            title: `You have to be logged in to do that!`,
            icon: "warning",
            confirmButtonText: 'Okay',
            confirmButtonColor: "rgb(84, 84, 95)"
          });
          
      }

  };

  checkFriend = async () => {
    await this.setState({loggedInUser: this.props.username})
    const { loggedInUser } = this.state;
    axios
      .post(`/api/users/user/${this.props.user_id_display}`, { loggedInUser })
      .then(result => {
        if (result.data[0].count > 0) {
          this.setState({ friend: true });
        } else {this.setState({friend: false})}
      });
  };

  render() {
    return (
      <div className="small-profile">
        <div className="profile">
          <div className="profile-box">
            <div className="left-box">
              <img
                className="left-box-portrait"
                src={`/assets/ProfilePics/${this.props.portrait}`}
                alt=""
              />
            </div>
            <div className="right-box">
              <div className="username">
                <h4>{this.props.usernameProp}</h4>
              </div>
              <button disabled={this.state.friend} className="edit-btn" onClick={() => this.addFriend()} id={this.state.isSame}>
                {!this.state.friend  ? ('Add Friend') : ('Already Friended')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(SmallProfile);
