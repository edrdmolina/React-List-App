//  Libraries
import React from 'react';
import { createUseStyles } from "react-jss";

// Styles
const useStyles = createUseStyles({
    home: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        border: '1px solid #FCFCFC',
        backgroundColor: '#FCFCFC09',
        borderRadius: '15px',
        height: '300px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        color: '#FCFCFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',

        '& h1': {
            margin: '15% 0 2% 0',
        },

        '& p': {
            margin: '0rem 0 10% 0',
            
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
    }
})

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <div className={classes.container}>
                <h1>GET DONE</h1>
                <p>
                    Never miss another item at the store.
                </p>
                <button onClick={() => window.location.href = '/register'}>GET STARTED</button>
            </div>
        </div>
    )
}

export default Home
