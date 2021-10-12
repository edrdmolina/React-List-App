// Libraries
import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Components 
import PWConfirmation from './components/PWConfirmation';

// Styles

function ResetPw() {
    // Initialize hooks
    const location = useLocation();

    // State
    const [newPassword, updateNewPassword, clearNewPassword] = useChangeInput('');  
    const [confirmNewPassword, updateConfirmNewPassword, clearConfirmNewPassword] = useChangeInput('');
    const [message, updateMessage] = useState('');
    const { user } = location.state

    async function handleSubmit(e) {
        e.preventDefault();
        const input = {
            newPassword, confirmNewPassword, id: user._id
        }

        const res = await axios.put('/api/users/reset-pw', input);
        const { success, error, redirectUrl } = res.data;

        if (error) {
            clearNewPassword();
            clearConfirmNewPassword();
            return updateMessage(error);
        }

        if (success) {
            return window.location.href = redirectUrl;
        }



    }

    // Disables and enables save button
    let isDisabled = true;
        
    if (newPassword && confirmNewPassword && (newPassword === confirmNewPassword)) {
        isDisabled = false;
    } else {
        isDisabled = true;
    }

    return (
        <div className='Login'>
            <h1>RESET PW PAGE</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit} className='Form'>
                <div className='Input-group'>
                    <label htmlFor='newPassword' className='label'>New Password</label>
                    
                    <input type='password' id='newPassword' value={newPassword} onChange={updateNewPassword}
                    />
                </div>
                <div className='Input-group'>
                    <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                    <input type='password' id='confirmNewPassword' value={confirmNewPassword}
                        onChange={updateConfirmNewPassword}
                    />
                    <PWConfirmation password={newPassword} passwordConfirmation={confirmNewPassword} />
                </div>
                <div className='Form-footer'>
                    <button 
                        type='submit'
                        className={`Register-btn ${isDisabled ? 'Disabled' : ''}`}
                        disabled={isDisabled}
                    >Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPw;
