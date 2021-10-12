// Libraries
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Hooks
import useChangeToken from '../../hooks/useChangeToken';

// Styles
import '../../styles/Token.css'


function Token(props) {
    // Initialize hooks
    const history = useHistory();

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
        <div className={`Token${isError ? ' shake' : ''}`}>
            <div className='Token-input'>
                <h2>Input Token</h2>
                <p>{message}</p>
                <div className='Token-numbers'>
                    <input type='text' id='token1' 
                        name='token-1' value={token1}
                        maxLength='1' data-slot={1}
                        onChange={updateToken1}
                    />
                    <input type='text' id='token2' 
                        name='token-2' value={token2}
                        maxLength='1' data-slot={2}
                        onChange={updateToken2}
                    />
                    <input type='text' id='token3' 
                        name='token-3' value={token3}
                        maxLength='1' data-slot={3}
                        onChange={updateToken3}
                    />
                    <input type='text' id='token4' 
                        name='token-4' value={token4}
                        maxLength='1' data-slot={4}
                        onChange={updateToken4}
                    />
                    <input type='text' id='token5' 
                        name='token-5' value={token5}
                        maxLength='1' data-slot={5}
                        onChange={updateToken5}
                    />
                    <input type='text' id='token6'
                        name='token-6' value={token6}
                        maxLength='1' data-slot={6}
                        onChange={updateToken6}
                    />
                </div>
                <button className='cancel-btn' onClick={handleCancel}>CANCEL</button>
                
            </div>
        </div>
    )
}

export default Token;