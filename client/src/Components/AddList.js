// Libraries
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

// Styles
const useStyles = createUseStyles({
    addList: {
        height: '250px',
        width: '250px',
        borderRadius: '10px',
        color: 'white',
        backgroundColor: '#0388A6C8',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        cursor: 'pointer',

        '&:hover': {
            boxShadow: '0 0 10px #FCFCFC52',
        },

        '& h3':{
            textAlign: 'center',
            borderBottom: 'dashed #FCFCFC 4px',
            height: '20%',
            paddingTop: '0.5rem',
            margin: '0',
        },

        '& input': {
            height: '20%',
            borderBottom: 'dashed #FCFCFC 4px',
            textAlign: 'center',
            color: '#FCFCFC',
            fontSize: '28px',
            maxWidth: '250px',
        },
        '& input:focus': {
            borderRadius: '10px 10px 0px 0px',
            boxShadow: 'inset 0px 0px 10px #F28705'
        }
    },
    addIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        fontSize: '6rem'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '80%',

        '& button': {
            padding: '0.5rem 1rem',
            borderRadius: '15px',
            color: '#FCFCFC',
            backgroundColor: '#F28705',
            width: '66%',
            '&:hover': {
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            },
            '&:active': {
                backgroundColor: '#F25C05',
            }
        },
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
    addListForm: {},
    '@media (max-width: 768px)': {
        addList: {
            width: '100%',
            maxWidth: '400px',
            height: '5rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            '& h3': {
                border: 'none',
                height: '50%',
                width: '75%',
                textAlign: 'start',
                marginLeft: '1rem'
            }
        },
        addIcon: {
            width: '20%',
            fontSize: '2rem',
        },
        addListForm: {
            height: '200px',
            flexDirection: 'column',
            width: '100%',
            cursor: 'auto',

            '& button': {
                width: '100%'
            },
        },
    },
    
})

function AddList(props) {
    const classes = useStyles();
    const { handleToggleShowForm, showForm, addList } = props;

    const [title, updateTitle] = useState('');
    const [inputError, updateInputError] = useState(false);

    const handleInput = e => updateTitle(e.target.value);

    const handleAddList = async () => {
        if (title.length < 1) {
            updateInputError(true);
            setTimeout(() => {
                updateInputError(false);
            }, 300);
            return;
        }
        const input = { title };
        const result = await axios.post('/api/addList', input);
        handleToggleShowForm();
        updateTitle("");
        addList(result.data.newList)
    }

    if (showForm) {
        return (
            <div className={`${classes.addList} ${classes.addListForm} ${inputError ? classes.inputError : null}`}>
                <input type="text" value={title} onChange={handleInput} autoFocus="on" />
                <div className={classes.buttonContainer}>
                    <button onClick={handleAddList}>ADD</button>
                    <button onClick={handleToggleShowForm}>CANCEL</button>
                </div>
            </div>
        )
    } else {
        return (
            <div onClick={handleToggleShowForm} className={classes.addList} >
                <h3>ADD LIST</h3>
                <div className={classes.addIcon}>
                    <i className="far fa-plus-square" />
                </div>
            </div>
        )
    }
}

export default AddList