// Libraries
import React, { useState } from 'react';
import axios from 'axios';

// Components
import Token from './components/Token';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Styles
import '../styles/ForgotPw.css';

function ForgotPw() {
    // Initialize hooks

    // State
    const [email, updateEmail, clearEmail] = useChangeInput('');
    const [message, updateMessage] = useState('');
    const [tokenInput, showToken] = useState(false)
    const [isError, updateIsError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const input = { email };
        const res = await axios.post('/api/users/forgot-pw', input);
        if(res.data.error) {
            updateMessage(res.data.error);
            triggerError();
            return;
        }
        // RETURN TO TOKEN INPUT MESSAGE
        updateMessage('')
        clearEmail()
        return showToken('true')
    }

    function triggerError() {
        updateIsError(true);
        setTimeout(() => {
            updateIsError(false);
        }, 1000);
        clearEmail();
    }

    return (
        <div className='ForgotPw'>
            <h1>RETRIEVE RESET TOKEN</h1>

            <form onSubmit={handleSubmit} className={`Form ${isError ? 'shake' : null}`}>
                <p className='forgot-message'>{message}</p>
                <div className='Input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={email} 
                        onChange={updateEmail}
                    />
                </div>
                <div className='Form-footer'>
                    <button type='submit' className='Token-btn'>Send Token</button>
                </div>
            </form>

            { tokenInput ? ( <Token showToken={showToken} /> ) : ( null )}

        </div>
    )
}

export default ForgotPw;