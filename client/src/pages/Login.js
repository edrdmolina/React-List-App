// Libraries
import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Styles
import '../styles/Login.css';
import '../styles/Register.css';

function Login() {

    // State
    const [username, updateUsername, clearUsername] = useChangeInput('');
    const [password, updatePassword, clearPassword] = useChangeInput('');
    const [isError, updateIsError] = useState(false);
    const [message, updateMessage] = useState('');


    // Disables and Enables Login button
    let isDisabled = true;
    if (username && password) {
        isDisabled = false;
    } else {
        isDisabled = true;
    }

    async function loginUser(e) {
        e.preventDefault();
        const input = { username, password };
        const res = await axios.post('/api/users/login', input);
        if (res.data.error) {
            updateMessage(res.data.error.message);
            triggerError()
        } else if (res.data.success) {
            updateMessage('');
            return window.location.href = res.data.redirectUrl;
        }
    }

    function triggerError() {
        updateIsError(true);
        setTimeout(() => {
            updateIsError(false);
        }, 1000);
        clearUsername();
        clearPassword();
    }

    return (
        <div className='Login'>
            <h1>Login</h1>
            <form onSubmit={loginUser} className={`Form ${isError ? 'shake' : null}`}>
                <div className='Login-error'>
                    <p>{message}</p>
                </div>
                <div className='Input-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text' name='username' id='username'
                        value={username} onChange={updateUsername}
                    />
                </div>
                <div className='Input-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password' name='password' id='password'
                        value={password} onChange={updatePassword}
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

export default Login;