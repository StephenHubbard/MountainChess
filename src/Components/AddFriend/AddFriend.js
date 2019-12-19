import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SmallProfile from "./SmallProfile";
import Loading from "../Loading/Loading";

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      search: "",
      loading: true
    };
  }

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
        {this.state.loading && (
          <>
            <div className="loading">
              <Loading />
            </div>
          </>
        )}
        {!this.state.loading && (<div className="add-friend">
          <input
            name="search"
            onChange={e => {
              this.handleChange(e.target);
              this.filter();
            }}
            value={this.state.search}
            placeholder="Search by Username"
          />
          <ul>
            {!this.state.search
              ? this.state.users.map(el => (
                  <SmallProfile
                    username={el.username}
                    email={el.username}
                    portrait={el.portrait}
                    user_id={el.user_id}
                  />
                ))
              : this.state.filteredUsers.map(el => (
                  <SmallProfile
                    username={el.username}
                    email={el.username}
                    portrait={el.portrait}
                    user_id={el.user_id}
                  />
                ))}
          </ul>
        </div>)}
        
      </>
    );
  }
}
