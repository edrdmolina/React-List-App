import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

// Styles
const useStyles = createUseStyles({
    error: {
        height: '200px',
        width: '100vw',
        position: 'absolute',
        top: 'calc(50% - 300px / 2)',
        textAlign: 'center',
        color: '#FCFCFC',

        '& h1, p, a': {
            margin: '2rem'
        },

        '& a': {
            color: '#FCFCFC',
            textDecoration: 'none',
            backgroundColor: '#4F51BC',
            padding: '0.75rem 1rem',
            borderRadius: '15px',

            '&:hover':{
                backgroundColor: '#4F51BC88',
            }
        }
    }
})

function Error() {
    const classes = useStyles();
    return (
        <div className={classes.error}>
            <h1>404</h1>
            <p>The page you are looking for is not available.</p>
            <Link to='/'>Go Home</Link>
        </div>
    )
}

export default Error