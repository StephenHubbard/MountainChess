import React, {Component} from 'react';
import './Login.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { updateUserInfo } from './../../ducks/reducer';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value })
    }

    login = () => {
        //console.log(this.state.username, this.state.password)
        const { username, password } = this.state
        axios
        .post('/auth/login', { username, password })
        .then(res => {
            //console.log(res.data.user)
            this.props.history.push('/')
            this.props.updateUserInfo({
                username: res.data.user.username,
                user_id: res.data.user.user_id,
                profile_img: res.data.user.portrait,
                email: res.data.user.email
            })
            Swal.fire(res.data.message)
        })
        .catch(err => {
            //Swal.fire(err.response.data.message)
        })
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-container" alt=''>
                    <h1>Enter your login information here.</h1>
                    <input id="username"
                    onChange={e => this.handleChange('username', e.target.value)}
                    value={this.state.username}
                    placeholder="Username"
                    type="text"
                    />
                    <input id="password"
                    onChange={e => this.handleChange('password', e.target.value)}
                    value={this.state.password}
                    placeholder="Password"
                    type="password"
                    />
                    <button className="login-submit" onClick={this.login}>Login!</button>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(null, { updateUserInfo })(Login))