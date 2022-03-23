// Libraries
import React, { useState } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

// Components
import Token from '../Components/Token';
import Logo from '../Icons/Logo-SM.svg';

// Hooks
import useChangeInput from "../hooks/useChangeInput";

// Styles
const useStyles = createUseStyles({
    forgotPW: {
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
        height: '250px',
        width: '90%',
        maxWidth: '500px',
        borderRadius: '10px',
        boxShadow: '0 0 10px #00000070',
        backgroundColor: '#FCFCFC12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '10rem',

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

    '@media (max-width: 768px)': {
        forgotPW: {
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

function ForgotPw() {
    const classes = useStyles();
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
        <div className={classes.forgotPW}>
            <Link to='/'>
                <img src={Logo} alt="Logo" className={classes.logo} />
            </Link>
            <form onSubmit={handleSubmit} className={`${classes.form} ${isError ? 'shake' : null}`}>
                <h1>FORGOT PASSWORD</h1>
                <p>{message}</p>
                <div className={classes.inputGroup}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={email} 
                        onChange={updateEmail}
                    />
                </div>
                <button type='submit'>Send Token</button>
            </form>

            { tokenInput ? ( <Token showToken={showToken} /> ) : ( null )}

        </div>
    )
}

export default ForgotPw;