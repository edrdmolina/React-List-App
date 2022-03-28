// Libraries
import React, { useState } from "react";
import axios from 'axios';
import { createUseStyles } from 'react-jss';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Components
import DeleteUserConfirmation from '../Components/DeleteUserConfirmation';
import PWConfirmation from '../Components/PWConfirmation';
import PWValidation from "../Components/PWValidation";

// Styles
const useStyles = createUseStyles({
    user: {
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FCFCFC',

        '& p': {
            margin: '0',
        }

    },
    form: {
        height: '600px',
        width: '90%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '10px',
        boxShadow: '0 0 10px #00000070',
        backgroundColor: '#0388A6C8',

        '& h1': {
            margin: '1rem 0'
        }
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        minHeight: '4.25rem',
        margin: '0.5rem 0',

        '& input': {
            border: '1px solid #FCFCFC',
            color: '#FCFCFC',
            height: '2rem',
            borderRadius: '5px',
            textIndent: '1rem',

            '&:focus': {
                boxShadow: '0px 0px 10px #F28705',
            }
        },

        '& p': {
            fontSize: '0.65rem',
            marginTop: '0.5rem'
        }
    },
    password: {
        display: 'flex',
        justifyContent: 'space-between',
        
        '& p' :{
            fontSize: '0.75rem',
            margin: '0',
        }
    },
    inputGroupLocked: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        minHeight: '4.25rem',
        margin: '0.5rem 0',

    },
    inputContainer: {
        border: '1px solid #FCFCFC',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '5px',
        height: '2rem',

        '& input': {
            color: '#FCFCFC',
            textIndent: '1rem',
            width: '90%',
        },
    },
    inputContainerBoxShadow: {
        boxShadow: '0px 0px 10px #F28705 !important',
    },
    inputLocked: {
        width: '90%',
        textIndent: '1rem',
        color: '#CCCCCC'
    },
    lockContainer: {
        width: '10%',
        cursor: 'pointer',
        height: '100%',
        backgroundColor: '#F28705',
        borderRadius: '0 3.5px 3.5px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    formFooter: {
        width: '65%',
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '1rem 0',

        '& button': {
            color: '#FCFCFC',
            backgroundColor: '#F28705',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',

            '&:active': {
                backgroundColor: '#F25C05',
            }
        }
    },
    disabled: {
        backgroundColor: '#03658C !important',
        cursor: 'not-allowed',
    },
    inputError: {
        position: 'relative',
        animation: '$shake 0.05s linear infinite alternate',
        boxShadow: '0 0 5px #C03546 !important',
    },
    '@keyframes shake': {
        from: {
            left: '3px',
        },
        to: {
            right: '3px',
        }
    },
    '@media (max-width: 768px)': {
        inputGroup: {
            width: '80%'
        },
        inputGroupLocked: {
            width: '80%',
        },
        formFooter: {
            width: '80%'
        }
    }
})

function User(props) {
    const classes = useStyles();
    const { user } = props;

    // State
    const [email, updateEmail] = useChangeInput(user.email);
    const [username, updateUsername] = useChangeInput(user.username);
    const [password, updatePassword, clearPassword] = useChangeInput('');
    const [newPassword, updateNewPassword, clearNewPassword] = useChangeInput('');
    const [confirmNewPassword, updateNewPWConfirmation, clearNewPWConfirmation] = useChangeInput('');
    const [emailLocked, updateEmailLocked] = useState(true);
    const [usernameLocked, updateUsernameLocked] = useState(true);
    const [isDeleteConfirmation, updateIsDeleteConfirmation] = useState(false);
    const [message, updateMessage] = useState('');
    const [isError, updateIsError] = useState(false);
    const [isEmailFocus, updateIsEmailFocus] = useState(false);
    const [isUsernameFocus, updateIsUsernameFocus] = useState(false);

    // REDIRECTS if there is no user.
    if(!user.username) window.location.href = '/error';
    
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
            triggerError();
        } else {
            updateMessage(res.data.message);
        }
        clearPassword();
        clearNewPassword();
        clearNewPWConfirmation();
    }

    function triggerError() {
        updateIsError(true);
        
        setTimeout(() => {
            updateIsError(false);
            clearPassword();
            clearNewPassword();
            clearNewPWConfirmation();
        }, 500);
        
    }

    function updateFocus(e) {
        if(e.target.id === 'email') updateIsEmailFocus(!isEmailFocus);
        else if(e.target.id === 'username') updateIsUsernameFocus(!isUsernameFocus);
    }

    let isDisabled = true;
        
    if (email && username && password && (newPassword === confirmNewPassword)) {
        isDisabled = false;
    } else {
        isDisabled = true;
    }

    return (
        <div className={classes.user}>
            <form onSubmit={handleSubmit} className={`${classes.form} ${isError ? classes.inputError : null}`}>
                <h1>USER CREDENTIALS</h1>
                <p>{message}</p>
                { emailLocked ? (
                    <div className={classes.inputGroupLocked}>
                        <label htmlFor='email'>Email</label>
                        <div className={classes.inputContainer}> 
                            <div className={classes.inputLocked}>
                                {email}
                            </div>
                            <div className={classes.lockContainer} onClick={toggleEmailLock}>
                                <i className="fas fa-lock"  />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={classes.inputGroupLocked}>
                        <label htmlFor='email'>Email</label>
                        <div className={`${classes.inputContainer} ${isEmailFocus ? classes.inputContainerBoxShadow : null}`}>
                            <input
                                type='email' id='email' 
                                value={email} 
                                onChange={updateEmail}
                                onFocus={updateFocus}
                                onBlur={updateFocus}
                            />
                            <div className={classes.lockContainer} onClick={toggleEmailLock}>
                                <i className="fas fa-lock-open" />
                            </div>
                        
                        </div>
                    </div>
                )}

                { usernameLocked ? (
                    <div className={classes.inputGroupLocked}>
                        <label htmlFor='username'>Username</label>
                        <div className={classes.inputContainer}> 
                            <div className={classes.inputLocked}>
                            {username}
                            </div>
                            <div className={classes.lockContainer}>
                                <i className="fas fa-lock" onClick={toggleUsernameLock} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={classes.inputGroupLocked}>
                        <label htmlFor='username'>Username</label>
                        <div className={`${classes.inputContainer} ${isUsernameFocus ? classes.inputContainerBoxShadow : null}`}>
                            <input
                                type='text' id='username' 
                                value={username} 
                                onChange={updateUsername}
                                onFocus={updateFocus}
                                onBlur={updateFocus}
                            />
                            <div className={classes.lockContainer} onClick={toggleUsernameLock}>
                                <i className="fas fa-lock-open" />
                            </div>
                        </div>
                </div>
                )}

                <div className={classes.inputGroup}>
                    <label htmlFor='newPassword' className={classes.password}>
                        New Password
                        <PWValidation password={newPassword} />
                    </label>
                    <input type='password' id='newPassword' value={newPassword} onChange={updateNewPassword}
                    />
                </div>
                <div className={classes.inputGroup}>
                    <label htmlFor='confirmNewPassword' className={classes.password}>
                        Confirm New Password
                        <PWConfirmation password={newPassword} passwordConfirmation={confirmNewPassword} />
                    </label>
                    <input type='password' id='confirmNewPassword' value={confirmNewPassword}
                        onChange={updateNewPWConfirmation}
                    />
                </div>
                <div className={classes.inputGroup}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' value={password}
                        onChange={updatePassword}
                    />
                </div>
                    
                <div className={classes.formFooter}>
                    <button 
                            type='button'
                            className={`${isDisabled ? classes.disabled : null}`}
                            disabled={isDisabled}
                            onClick={handleDeleteUser}
                        >Delete User</button>
                    <button 
                        type='submit'
                        className={`${isDisabled ? classes.disabled : null}`}
                        disabled={isDisabled}
                    >Save Changes</button>
                </div>
            </form>
                
            { isDeleteConfirmation ? (
                    <DeleteUserConfirmation 
                        user={user} updateMessage={updateMessage} 
                        password={password} cancelDeleteUser={handleDeleteUser} 
                    />
            ) : (
                null
            )}
            
        </div>
    )
}

export default User;