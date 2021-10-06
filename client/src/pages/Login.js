//  Libraries
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Styles
import '../styles/Login.css';
import '../styles/Register.css';

export class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            password: '',
            message: '',
        }
    }

    handleUserInput = e => {
        const { value } = e.target;
        this.setState({ [e.target.id]: value});
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.loginUser();
    }

    loginUser = async () => {
        const { username, password } = this.state;
        const input = { username, password };
        const result = await axios.post('/api/users/login', input);

        if (result.data.error) {
            const { message } = result.data.error
            this.setState({ message, username: '', password: '' });
        } else if (result.data.success) {
            console.log('success')
            this.setState({ message: '' });
            window.location.href = result.data.redirectUrl;
        }



    }

    render() {
        const { username, password } = this.state;

        let isDisabled = true;

        if (username && password) {
            isDisabled = false;
        } else {
            isDisabled = true;
        }

        return (
            <div className='Login'>
                <h1>Login</h1>
                
                <form onSubmit={this.handleSubmit} className='Form'>
                    <div className='Login-error'>
                        <p>{this.state.message}</p>
                    </div>
                    <div className='Input-group'>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text' name='username' id='username' value={this.state.username}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className='Input-group'>
                    <label htmlFor='password'>Password</label>
                        <input 
                            type='password' name='password' id='password' value={this.state.password}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className='Form-footer'>
                        <button 
                            type='submit'
                            className={`Login-btn ${isDisabled ? 'Disabled' : ''}`}
                            disabled={isDisabled}
                        >Sign In</button>
                    </div>
                </form>
                <div className='login-message'>
                    <p>
                    Don't have an account? 
                    <Link to='/register'> Sign up here.</Link>
                    </p>
                    <p>
                    Forgot login? 
                    <Link to='/forgot-pw'> Click here.</Link>
                    </p> 
                </div>
            </div>
        )
    }
}

export default Login
