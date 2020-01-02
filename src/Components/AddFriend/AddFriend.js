import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import SmallProfile from "./SmallProfile";
import Loading from "../Loading/Loading";
import "./AddFriend.css";
import { connect } from "react-redux";
import { updateUserInfo } from "../../ducks/reducer";

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      search: "",
      loading: true,
      username: "",
      user_id: ""
    };
  }

  findUser = () => {
    const { username } = this.state;
    axios
      .get("/api/user", { username })
      .then(res => {
        this.setState({
          username: res.data.username,
          user_id: res.data.user_id
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
    axios
      .get("/api/users")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.findUser();
  }

  clearSearch = () => {
    this.setState({
      search: ""
    });
  };

  filter = async () => {
    let arr = this.state.users.filter(el =>
      el.username.includes(this.state.search)
    );

    await this.setState({
      filteredUsers: arr
    });
    console.log(this.state);
  };

  handleChange = target => {
    this.setState({ [target.name]: target.value });
    this.forceUpdate();
  };

  render() {
    return (
      <>
        {!this.props.username ? (
          <div className="logged-out-container">
            <h1 className="logged-out-h1">Log in to view all profiles!</h1>
          </div>
        ) : (
          <>
            {!this.state.loading && (
              <div className="add-friend">
                <div className="search">
                  <input
                    name="search"
                    onChange={e => {
                      this.handleChange(e.target);
                      this.filter();
                    }}
                    value={this.state.search}
                    placeholder="Search by Username"
                  />
                </div>
                <div className="all">
                <ul className = "friend-list">
                  {!this.state.search
                    ? this.state.users.map(el => (
                        <SmallProfile
                          key={`${el.username} el.user_id`}
                          usernameProp={el.username}
                          email={el.username}
                          portrait={el.portrait}
                          user_id_display={el.user_id}
                        />
                      ))
                    : this.state.filteredUsers.map(el => (
                        <SmallProfile
                          key={`${el.username} el.user_id`}
                          usernameProp={el.username}
                          email={el.username}
                          portrait={el.portrait}
                          user_id_display={el.user_id}
                        />
                      ))}
                </ul>
                </div>
              </div>
            )}
          </>
        )}
        {this.state.loading && (
          <>
            <div className="loading">
              <Loading />
            </div>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { updateUserInfo })(AddFriend);
