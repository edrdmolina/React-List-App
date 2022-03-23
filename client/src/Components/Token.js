// Libraries
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { createUseStyles } from 'react-jss';

// Hooks
import useChangeToken from '../hooks/useChangeToken';

// Styles
const useStyles = createUseStyles({
    modalBackground: {
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0px',
        backgroundColor: '#07020D82'
    },
    modal: {
        position: 'fixed',
        top: '30%',
        left: 'calc(50% - 300px / 2)',
        height: '200px',
        width: '300px',
        backgroundColor: '#000270',
        boxShadow: '0 0 10px #000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FCFCFC',
        borderRadius: '10px',

        '& h2': {
            height: '15%',
            margin: '1rem',
        },

        '& p': {
            fontSize: '0.75rem',
            margin: '0',
            height: '10%',
        },

        '& button': {
            width: '100%',
            backgroundColor: '#C03546',
            color: '#FCFCFC',
            height: '20%',
            borderRadius: '0 0 10px 10px',

            '&:hover': {
                backgroundColor: '#C03546C8'
            }
        }

    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '40%',
        padding: '0 0.5rem',

        '& input': {
            width: '35px',
            height: '35px',
            textAlign: 'center',
            outline: 'none',
            backgroundColor: '#FCFCFC',
            borderRadius: '5px',
            color: '#07020D',

            '&:focus': {
                border: '3px solid #4F51BC'
            }
        }
    }

})


function Token(props) {
    // Initialize hooks
    const history = useHistory();
    const classes = useStyles();

    // State
    const [isError, updateIsError] = useState(false);
    const [message, updateMessage] = useState('Check your Email for a 6 digit token.')
    
    const [token1, updateToken1, clearToken1] = useChangeToken('');
    const [token2, updateToken2, clearToken2] = useChangeToken('');
    const [token3, updateToken3, clearToken3] = useChangeToken('');
    const [token4, updateToken4, clearToken4] = useChangeToken('');
    const [token5, updateToken5, clearToken5] = useChangeToken('');
    const [token6, updateToken6, clearToken6] = useChangeToken('');

    async function submitToken() {
        const token = token1 + token2 + token3 + token4 + token5 + token6;
        const input = { token };

        const res = await axios.post('/api/users/verify-token', input)

        const { error } = res.data;
        const { user } = res.data;

        if(error) {
            return triggerError(error);
        }

        if(user) {
            return history.push({
                pathname: 'reset-pw',
                state: { user },
            });
        }

    }


    // Calls submitToken() after the final token state has changed.
    // https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // Will only call when token6 has a value.
        if(token6) {
            submitToken()
        }

    }, [token6]) // eslint-disable-line react-hooks/exhaustive-deps


    function handleCancel(e) {
        props.showToken(false)
    }

    function triggerError(error) {
        updateMessage(error);
        updateIsError(true);

        clearToken1();
        clearToken2();
        clearToken3();
        clearToken4();
        clearToken5();
        clearToken6();

        const slot1 = document.querySelector('#token1')
        slot1.focus();

        setTimeout(() => {
            updateIsError(false);
        }, 1000);
    }

    return (
        <div className={`${classes.modalBackground} ${isError ? ' shake' : ''}`}>
            <div className={classes.modal}>
                <h2>Input Token</h2>
                <p>{message}</p>
                <div className={classes.inputGroup}>
                    <input type='text' id='token1' 
                        name='token-1' value={token1}
                        maxLength='1' data-slot={1}
                        onChange={updateToken1} autoComplete='off'
                    />
                    <input type='text' id='token2' 
                        name='token-2' value={token2}
                        maxLength='1' data-slot={2}
                        onChange={updateToken2} autoComplete='off'
                    />
                    <input type='text' id='token3' 
                        name='token-3' value={token3}
                        maxLength='1' data-slot={3}
                        onChange={updateToken3} autoComplete='off'
                    />
                    <input type='text' id='token4' 
                        name='token-4' value={token4}
                        maxLength='1' data-slot={4}
                        onChange={updateToken4} autoComplete='off'
                    />
                    <input type='text' id='token5' 
                        name='token-5' value={token5}
                        maxLength='1' data-slot={5}
                        onChange={updateToken5} autoComplete='off'
                    />
                    <input type='text' id='token6'
                        name='token-6' value={token6}
                        maxLength='1' data-slot={6}
                        onChange={updateToken6} autoComplete='off'
                    />
                </div>
                <button onClick={handleCancel}>CANCEL</button>
                
            </div>
        </div>
    )
}

export default Token;