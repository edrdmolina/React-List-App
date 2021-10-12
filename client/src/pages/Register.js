// Libraries
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Components
import PWConfirmation from './components/PWConfirmation';

// Styles
import '../styles/Register.css';

function Register() {

    // State
    const [email, updateEmail, clearEmail] = useChangeInput('');
    const [username, updateUsername, clearUsername] = useChangeInput('');
    const [password, updatePassword, clearPassword] = useChangeInput('');
    const [confirmPassword, updatePWConfirmation, clearPWConfirmation] = useChangeInput('');
    const [message, updateMessage] = useState('');
    const [isError, updateIsError] = useState(false);

    // Register user
    async function registerUser(e) {
        e.preventDefault();
        const input = {
            email, username, password, confirmPassword
        }
        const res = await axios.post('/api/users/register', input);
        if (res.data.error) {
            updateMessage(res.data.error);
            triggerError();
        } else {
            return window.location.href = '/';
        }

    }

    function triggerError() {
        updateIsError(true);
        setTimeout(() => {
            updateIsError(false);
        }, 1000);
        clearEmail();
        clearUsername();
        clearPassword();
        clearPWConfirmation();
    }

    // Disables and enables register button
    let isDisabled = true;
    if (email && username && password && confirmPassword && (password === confirmPassword)) {
        isDisabled = false;
    } else {
        isDisabled = true;
    }


    return (
        <div className='Register'>
                <h1>Sign Up</h1>
                <form onSubmit={registerUser} className={`Form ${isError ? 'shake' : null}`}>
                    <div className='Login-error'>
                        <p>{message}</p>
                    </div>
                    <div className='Email Input-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div className='Username Input-group'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' value={username} 
                            onChange={updateUsername}
                        />
                    </div>
                    <div className='Password Input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password}
                            onChange={updatePassword}
                        />
                    </div>
                    <div className='ConfirmPassword Input-group'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' id='confirmPassword' value={confirmPassword}
                            onChange={updatePWConfirmation}
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

export default Register;
