// Libraries
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss';

// Styles
const useStyles = createUseStyles({
    addItemForm: {
        width: '100%',
        height: '3rem',
        borderBottom: '1px solid #FCFCFC',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',


        '& input': {
            width: '55%',
            textAlign: 'center',
            borderRadius: '5px',
            color: '#FCFCFC',
            boxShadow: '0 0 5px #4F51BC',
        },
        '& input:focus': {
            boxShadow: '0 0 5px #FCFCFC',
        },

        '& button': {
            color: '#FCFCFC',
            backgroundColor: '#4F51BC',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',

            '&:active': {
                backgroundColor: '#4F51BC32',
            }
        }
    },
    quantityContainer: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '1.75rem',

        '& i': {
            cursor: 'pointer',

            '&:active': {
                transform: 'translate(1px,1px)'
            }
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
    }
})

function AddItemForm(props) {
    const classes = useStyles();
    const { addItem } = props;

    const [titleInput, updateTitleInput] = useState('');
    const [quantityInput, updateQuantityInput] = useState(1);
    const [inputError, updateInputError] = useState(false);


    function handleTitleInputChange(e) {
        updateTitleInput(e.target.value);
    }

    const handleQtyIncrement = () => updateQuantityInput(quantityInput + 1);
    function handleQtyDecrement() {
        if (quantityInput === 1) return;
        updateQuantityInput(quantityInput - 1);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(titleInput.length === 0) {
            updateInputError(true);
            setTimeout(() => updateInputError(false), 300);
            return;
        }
        addItem(titleInput, quantityInput);
        updateTitleInput('');
        updateQuantityInput(1);
        document.querySelector('#addItemInput').focus();
    }

    return (
        <form className={classes.addItemForm} onSubmit={handleSubmit}>
            <input 
                id="addItemInput" 
                type='text' 
                value={titleInput} 
                onChange={handleTitleInputChange}
                className={inputError ? classes.inputError : null} 
            />
            <div className={classes.quantityContainer}>
                <i className='far fa-minus-square minus' onClick={handleQtyDecrement} />
                {quantityInput}
                <i className='far fa-plus-square plus' onClick={handleQtyIncrement} />
            </div>
            <button type='submit'>ADD</button>
        </form>
    )
}

export default AddItemForm