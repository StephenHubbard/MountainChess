import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../ducks/reducer';
import axios from 'axios';

class LoggedInUser extends Component {
    
    componentDidMount() {
        axios
        .get('/auth/getUser')
        .then(res => {
            //console.log(res.data)
            this.props.updateUserInfo({
                username: res.data.username,
                user_id: res.data.user_id,
                profile_img: res.data.portrait,
                email: res.data.email
            })
        })
    }

    render() {
        //console.log(this.props)
        return (
            <div>
            </div>
        )
    }
}