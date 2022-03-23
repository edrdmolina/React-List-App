// Libraries
import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

// Components
import Logo from '../Icons/Logo-SM.png'

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Styles
const useStyles = createUseStyles({
    login: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FCFCFC',

        '& img': {
            display: 'none',
        },

        '& p': {
            margin: '1rem',
            '& a': {
                color: '#FCFCFC'
            }
        }
    },
    form: {
        height: '400px',
        width: '90%',
        maxWidth: '500px',
        borderRadius: '10px',
        boxShadow: '0 0 10px #00000070',
        backgroundColor: '#0388A6C8',
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
            border: '1px solid #FCFCFC',
            color: '#FCFCFC',
            height: '2rem',
            borderRadius: '5px',
            textIndent: '1rem',

            '&:focus': {
                boxShadow: '0px 0px 10px #F28705',
            }
        },
    },
    submitRow: {
        width: '65%',
        display: 'flex',
        margin: '1rem 0',

        '& button': {
            backgroundColor: '#F28705',
            color: '#FCFCFC',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',
            marginLeft: 'auto',
            textTransform: 'uppercase',

            '&:active': {
                backgroundColor: '#F25C05',
            }
        }
    },
    loginLinks: {
        width: '90%',
        maxWidth: '500px',
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
        submitRow: {
            width: '80%'
        },

        login: {
            justifyContent: 'flex-start',
            paddingTop: '8rem',
            '& img': {
                display: 'inline',
                height: '100px',
                margin: '0 0 2rem 0'
            }
        }
    }
})

function Login() {
    const classes = useStyles();

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
        }, 500);
        clearUsername();
        clearPassword();
    }

    return (
        <div className={classes.login}>
            <Link to='/'>
                <img src={Logo} alt="Logo" className={classes.logo} />
            </Link>
            <form onSubmit={loginUser} className={`${classes.form} ${isError ? classes.inputError : null}`}>
                <h1>Log in</h1>
                <p>{message}</p>
                <div className={classes.inputGroup}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text' name='username' id='username'
                        value={username} onChange={updateUsername}
                    />
                </div>
                <div className={classes.inputGroup}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password' name='password' id='password'
                        value={password} onChange={updatePassword}
                    />
                </div>
                <div className={classes.submitRow}>
                    <button 
                        type='submit'
                        className={`${isDisabled ? classes.disabled : null}`}
                        disabled={isDisabled}
                    >Sign In</button>
                </div>
                <div className={classes.loginLinks}>
                    <p>
                    Forgot login? 
                    <Link to='/forgot-pw'> Click here.</Link>
                    </p> 
                    <p>
                    Don't have an account? 
                    <Link to='/register'> Sign up here.</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;