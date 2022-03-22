// Libraries
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Components
import PWConfirmation from '../Components/PWConfirmation';
import PWValidation from "../Components/PWValidation";

// Styles
const useStyles = createUseStyles({
    register: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FCFCFC',

        '& p': {
            margin: '1rem',
            '& a': {
                color: '#FCFCFC'
            }
        }

    },
    form: {
        height: '600px',
        width: '90%',
        maxWidth: '500px',
        borderRadius: '10px',
        boxShadow: '0 0 10px #00000070',
        backgroundColor: '#FCFCFC12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',

        '& p': {
            margin: '0',
        }
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        minHeight: '4.25rem',

        '& input': {
            boxShadow: '0px 0px 10px #4F51BC',
            color: '#FCFCFC',
            height: '2rem',
            borderRadius: '5px',
            textIndent: '1rem',

            '&:focus': {
                boxShadow: '0px 0px 10px #FCFCFC',
            }
        },

        '& p': {
            fontSize: '0.65rem',
            marginTop: '0.5rem'
        }
    },

    submitRow: {
        width: '65%',
        display: 'flex',
        margin: '1rem 0',

        '& button': {
            backgroundColor: '#4F51BC',
            color: '#FCFCFC',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',
            marginLeft: 'auto',
            textTransform: 'uppercase',

            '&:active': {
                backgroundColor: '#4F51BC32',
            }
        }
    },
    disabled: {
        backgroundColor: '#0F0F0F5F !important',
        cursor: 'not-allowed',
    },
    password: {
        display: 'flex',
        justifyContent: 'space-between',
        
        '& p' :{
            fontSize: '0.75rem'
        }
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
        submitRow: {
            width: '80%'
        }
    }
})

function Register() {
    const classes = useStyles();

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
        }, 500);
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
        <div className={classes.register}>
            <form onSubmit={registerUser} className={`${classes.form} ${isError ? classes.inputError : null}`}>
                <h1>Sign Up</h1>
                <p>{message}</p>
                <div className={classes.inputGroup}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div className={classes.inputGroup}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' value={username} 
                        onChange={updateUsername}
                    />
                </div>
                <div className={classes.inputGroup}>
                    <label htmlFor='password' className={classes.password}>
                        Password
                        <PWValidation password={password} />
                    </label>
                    <input type='password' id='password' value={password}
                        onChange={updatePassword}
                    />
                    <p>Minimum eight characters, at least one uppercase letter, one lowercase letter and one number</p>
                </div>
                <div className={classes.inputGroup}>
                    <label htmlFor='confirmPassword' className={classes.password}>
                        Confirm Password
                        <PWConfirmation password={password} passwordConfirmation={confirmPassword} />
                    </label>
                    <input type='password' id='confirmPassword' value={confirmPassword}
                        onChange={updatePWConfirmation}
                    />
                </div>
                <div className={classes.submitRow}>
                    <button 
                        type='submit'
                        className={`${isDisabled ? classes.disabled : null}`}
                        disabled={isDisabled}
                    >Sign Up</button>
                </div>
            </form>
            <p>
                Already have an account? 
                <NavLink to='/login'> Log in here.</NavLink>
            </p>
        </div>
    )
}

export default Register;
