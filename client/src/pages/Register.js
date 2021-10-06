// Libraries
import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// Components 
import PWConfirmation from './components/PWConfirmation';

// Styles
import '../styles/Register.css'

export class Register extends Component {  
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleUserInput = e => {
        const { value } = e.target;
        this.setState({ [e.target.id]: value});
    }
      
    handleSubmit = e => {
        e.preventDefault()
        this.registerUser();
    }

    registerUser = async () => {
        const { email, username, password, confirmPassword } = this.state;

        const input = {
            email, username, password, confirmPassword
        }
        const result = await axios.post('/api/users/register', input);
        window.location.href = result.data.redirectUrl;
    }

    render() {
        const { email, username, password, confirmPassword } = this.state; 

        let isDisabled = true;

        if (email && username && password && confirmPassword && (password === confirmPassword)) {
            isDisabled = false;
        } else {
            isDisabled = true;
        }

        return (
            <div className='Register'>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit} className='Form'>
                    <div className='Email Input-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' value={this.state.email}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className='Username Input-group'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' value={this.state.username} 
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className='Password Input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={this.state.password}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className='ConfirmPassword Input-group'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' id='confirmPassword' value={this.state.confirmPassword}
                            onChange={this.handleUserInput}
                        />
                        <PWConfirmation password={password} passwordConfirmation={confirmPassword} />
                    </div>
                    <div className='Form-footer'>
                        <button 
                            type='submit'
                            className={`Register-btn ${isDisabled ? 'Disabled' : ''}`}
                            disabled={isDisabled}
                        >Sign Up</button>
                    </div>
                </form>
                
                <p className='login-message'>
                    Already have an account? 
                    <NavLink to='/login'> Log in here.</NavLink>
                </p>
            </div>
        )
    }
}

export default Register
