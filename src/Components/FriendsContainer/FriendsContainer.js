import React, { Component } from 'react'

class FriendsContainer extends component {
  constructor() {
    super ()
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    console.log('hit')
    axios 
      .get('/api/users')
      .then(res => {
        this.setState({
          users: res.data
        })
        console.log(this.state.users)
      })
      .catch(err => {
        console.log(err)
      })
  }



  render() {
    return (
      <>
        <div className="friends-list">
          <ul>
            {this.state.users.map(el =>  {
              //function
              return (
              <li >
                <div className={el.logged_in ? 'online': 'offline'}>
                </div>
                <div className="friend">{el.username}<button className="invite-btn">Invite</button>
                </div>
              </li>
            )})}
          </ul>
        </div>
      </>
    )
  }
}



