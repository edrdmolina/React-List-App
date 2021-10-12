// Libraries
import React, { useState } from "react";
import {useLocation} from 'react-router-dom'
import axios from 'axios';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Components
import DeleteUserConfirmation from './components/DeleteUserConfirmation';
import PWConfirmation from './components/PWConfirmation';

// Styles
import '../styles/Register.css';
import '../styles/User.css';

function User() {
    // Initialize hooks
    const location = useLocation();

    // State
    const { user } = location.state;
    const [email, updateEmail] = useChangeInput(user.email);
    const [username, updateUsername] = useChangeInput(user.username);
    const [password, updatePassword, clearPassword] = useChangeInput('');
    const [newPassword, updateNewPassword, clearNewPassword] = useChangeInput('');
    const [confirmNewPassword, updateNewPWConfirmation, clearNewPWConfirmation] = useChangeInput('');
    const [emailLocked, updateEmailLocked] = useState(true);
    const [usernameLocked, updateUsernameLocked] = useState(true);
    const [isDeleteConfirmation, updateIsDeleteConfirmation] = useState(false);
    const [message, updateMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        updateUser();
    }

    function toggleEmailLock(e) {
        e.preventDefault();
        updateEmailLocked(!emailLocked);
    }

    function toggleUsernameLock(e) {
        e.preventDefault();
        updateUsernameLocked(!usernameLocked);
    }

    function handleDeleteUser(e) {
        updateIsDeleteConfirmation(!isDeleteConfirmation)
    }

    async function updateUser() {
        const input = { 
            email, username, user, 
            password, newPassword, confirmNewPassword 
        };
        const res = await axios.put('/api/users/updateUser', input);
        postUpdate(res)
    }

    function postUpdate(res) {
        if(res.data.error) {
            updateMessage(res.data.error);
        } else {
            updateMessage(res.data.message);
        }
        clearPassword();
        clearNewPassword();
        clearNewPWConfirmation();
    }

    let isDisabled = true;
        
    if (email && username && password && (newPassword === confirmNewPassword)) {
        isDisabled = false;
    } else {
        isDisabled = true;
    }

    return (
        <div className='User'>
                <h1>USER SETTINGS</h1>
                <form onSubmit={handleSubmit} className='Form'>
                    <div className='message'>
                        <p>
                            {message}
                        </p>
                    </div>
                    { emailLocked ? (
                        <div className='Input-group-locked'>
                            <p className='label'> Email</p>
                            <div className='disabled-row'> 
                                <div className='input'>
                                    <p className='email'>
                                        {email}
                                    </p>
                                </div>
                                <div className='lock' onClick={toggleEmailLock}>
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='Input-group-locked'>
                            <label htmlFor='email' className='label'>Email</label>
                            <div className='disabled-row'>
                                <input className='input-unlocked' type='email' id='email' value={email} onChange={updateEmail}
                                />
                                <div className='lock' onClick={toggleEmailLock}>
                                <i className="fas fa-lock-open"></i>
                                </div>
                            
                            </div>
                        </div>
                    )}

                    { usernameLocked ? (
                        <div className='Input-group-locked'>
                            <p className='label'> Username</p>
                            <div className='disabled-row'> 
                                <div className='input'>
                                    <p className='email'>
                                        {username}
                                    </p>
                                </div>
                                <div className='lock' onClick={toggleUsernameLock}>
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='Input-group-locked'>
                            <label htmlFor='username' className='label'>Username</label>
                            <div className='disabled-row'>
                                <input className='input-unlocked' type='text' id='username' value={username} onChange={updateUsername}
                                />
                                <div className='lock' onClick={toggleUsernameLock}>
                                <i className="fas fa-lock-open"></i>
                                </div>
                            
                            </div>
                        </div>
                    )}

                    <div className='Input-group'>
                        <label htmlFor='newPassword' className='label'>New Password</label>
                        
                        <input type='password' id='newPassword' value={newPassword} onChange={updateNewPassword}
                        />
                    </div>
                    <div className='Input-group'>
                        <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                        <input type='password' id='confirmNewPassword' value={confirmNewPassword}
                            onChange={updateNewPWConfirmation}
                        />
                        <PWConfirmation password={newPassword} passwordConfirmation={confirmNewPassword} />
                    </div>
                    <div className='Input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password}
                            onChange={updatePassword}
                        />
                    </div>
                    
                    <div className='Form-footer'>
                        <button 
                                type='button'
                                className={`deleteUser-btn ${isDisabled ? 'Disabled-delete' : ''}`}
                                disabled={isDisabled}
                                onClick={handleDeleteUser}
                            >Delete User</button>
                        <button 
                            type='submit'
                            className={`Register-btn ${isDisabled ? 'Disabled' : ''}`}
                            disabled={isDisabled}
                        >Save Changes</button>
                    </div>
                </form>
                
                { isDeleteConfirmation ? (
                     <DeleteUserConfirmation user={user} updateMessage={updateMessage} password={password} cancelDeleteUser={handleDeleteUser} />
                ) : (
                    null
                )}
               
            </div>
    )
}

export default User;