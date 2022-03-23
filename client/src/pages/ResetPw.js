// Libraries
import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Components 
import PWConfirmation from '../Components/PWConfirmation';
import PWValidation from "../Components/PWValidation";
import Logo from '../Icons/Logo-SM.svg';

// Styles
const useStyles = createUseStyles({
    resetPW: {
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

    },
    form: {
        height: '300px',
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
        },

        '& button': {
            backgroundColor: '#4F51BC',
            color: '#FCFCFC',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',
            textTransform: 'uppercase',

            '&:active': {
                backgroundColor: '#4F51BC32',
            }
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
    '@media (max-width: 768px)': {
        resetPW: {
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

function ResetPw() {
    const classes = useStyles();

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
        <div className={classes.resetPW}>
            <Link to='/'>
                <img src={Logo} alt="Logo" className={classes.logo} />
            </Link>
            <form onSubmit={handleSubmit} className={classes.form}>
                <h1>RESET PASSWORD</h1>
                <p>{message}</p>
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
                    <input 
                        type='password' id='confirmNewPassword'
                        value={confirmNewPassword} onChange={updateConfirmNewPassword}
                    />
                    
                </div>
                <button 
                    type='submit'
                    className={`${isDisabled ? classes.disabled : null}`}
                    disabled={isDisabled}
                >Save Changes</button>
            </form>
        </div>
    )
}

export default ResetPw;
