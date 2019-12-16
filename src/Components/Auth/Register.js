import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { updateUserInfo } from './../../ducks/reducer';
import { connect } from 'react-redux';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            username: '',
            password1: '',
            password2: ''
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    register = () => {
        if (this.state.password1 === this.state.password2) {
            const { email, username, password1, password2 } = this.state
            axios
            .post('/auth/register', { email, username, password1, password2 })
            .then(res => {
                //console.log(res.data)
                this.props.updateUserInfo(res.data.user)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
        } else {
            console.log('Passwords do not match.')
        }
    }

    render() {
        return (
            <div className="register-page">
                <div className="register-container" alt="">
                    <h1>Register for a free Mountain Chess account!</h1>
                    <div className="four-inputs">
                        <input id="email"
                        value={this.state.email}
                        onChange={e => this.handleChange('email', e.target.value)}
                        placeholder="Email"
                        type="text"
                        />
                        <input id="username-register"
                        value={this.state.username}
                        onChange={e => this.handleChange('username', e.target.value)}
                        placeholder="Username"
                        type="text"
                        />
                    </div>
                </div>
            </div>
        )
    }
}