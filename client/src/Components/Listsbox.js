//  Libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss';
import axios from 'axios';

// Styles
const useStyles = createUseStyles({
    listBox: {
        height: '250px',
        width: '250px',
        borderRadius: '10px',
        backgroundColor: '#FCFCFC12',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        color: '#FCFCFC',

        '& a': {
            height: '100%',
            textDecoration: 'none',
            color: '#FCFCFC',
        },
        
        '&:hover':{
            boxShadow: '0 0 10px #fcfcfc52',
        },

        '& h3':{
            textAlign: 'center',
            borderBottom: 'dashed #FCFCFC 4px',
            height: '20%',
            paddingTop: '0.5rem',
            margin: '0',
        },

        '& i': {
            position: 'relative',
            bottom: '95%',
            left: '90%',

            '&:hover': {
                transform: 'scale(1.5)'
            }
        },
    },
    preview: {
        height: '80%',
        margin: '0',
        padding: '1.25rem 0 0 .75rem',

        // TODO FIX SIZING
        '& li': {
            fontSize: '20px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        }
    },

    confirmation: {
        height: '80%',
        width: '100%',
        position: 'relative',
        bottom: '89%',
        borderRadius: '0 0 10px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#4F51BC',

        '& button': {
            padding: '0.5rem 1rem',
            borderRadius: '15px',
            color: '#FCFCFC',
            backgroundColor: '#000270',
            width: '66%',
            '&:active': {
                backgroundColor: '#00027088',
            }
        },
    },

    checked: {
        textDecoration: 'line-through'
    },

    dNone: {
        display: 'none',
    },

    '@media (max-width: 768px)': {
        listBox: {
            width: '100%',
            maxWidth: '400px',
            height: '5rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            '& a': {
                height: '100%',
                width: '80%',
            },

            '& h3': {
                border: 'none',
                height: '100%',
                width: '100%',
                textAlign: 'start',
                display: 'flex',
                alignItems: 'center',
                padding: '0',
                marginLeft: '1rem',
                textTransform: 'uppercase',
            },

            '& ul': {
                display: 'none',
            },

            '& i': {
                position: 'static',
                margin: '0 auto',
            }
        },
        confirmation: {
            height: '100%',
            width: '100%',
            position: 'relative',
            bottom: '0%',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#4F51BC',
    
            '& button': {
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                color: '#FCFCFC',
                backgroundColor: '#000270',
                width: '35%',
                '&:active': {
                    backgroundColor: '#00027088',
                }
            },
        },
    }

})


function Listsbox(props) {
    const classes = useStyles();
    
    const { _id, title, items, data, updateData } = props;

    const [showConfirmation, toggleShowConfirmation] = useState();

    const toggleConfirmation = () => toggleShowConfirmation(!showConfirmation);
    
    async function removeList() {
        const newLists = data.filter(l => l._id !== _id);
        updateData([...newLists]);
        await axios.delete(`/api/${_id}`);
    }

    const preview = items.map((item,i) => {
        if (i >= 5) return null;
        return (
            <li key={item._id} className={
                item.checked ? classes.checked : null
            }>
                {item.title}
            </li>
        )
    })
    return (
        <div className={classes.listBox}>
            <Link to={`/${_id}`} className={showConfirmation ? classes.dNone : null} >
                <h3>{ title }</h3>
                <ul className={classes.preview}>
                    {preview}
                </ul>
            </Link>
            <i className={`fas fa-times ${showConfirmation ? classes.dNone : null}`} onClick={toggleConfirmation}/>
            { showConfirmation ? (
                <div className={classes.confirmation}>
                    <button onClick={removeList}>REMOVE LIST</button>
                    <button onClick={toggleConfirmation}>CANCEL</button>
                </div>
            ) : (
                null
            )}
        </div>
    )
    
}

export default Listsbox
