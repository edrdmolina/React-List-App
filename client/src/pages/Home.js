//  Libraries
import React from 'react';
import { createUseStyles } from "react-jss";
import { Link } from 'react-router-dom';

import BackgroundProp from '../Components/BackgroundProp';
import Logo from '../Icons/Logo-SM.png'

// Styles
const useStyles = createUseStyles({
    home: {
        width: '100%',
        maxWidth: '1200px',
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    container: {
        border: '1px solid #FCFCFC',
        backgroundColor: '#0388A6C8',
        borderRadius: '15px',
        height: '250px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        color: '#FCFCFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem',

        '& h1': {
            marginTop: '2.5rem',
        },

        '& p': {
            margin: '0',
            
        },
        '& a': {
            color: '#FCFCFC',
            backgroundColor: '#F28705',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',
            textDecoration: 'none',

            '&:active': {
                backgroundColor: '#F25C05',
            }
        }
    },
    buttonContainer: {
        display: 'flex',
        width: '80%',
        justifyContent: 'space-evenly'
    },

    '@media (max-width: 768px)': {
        home: {
            flexDirection: 'column',
            justifyContent: 'start',
            
            '& img': {
                height: '100px',
                margin: '8rem 0 5rem 0'
            }
        },

        container: {
            justifyContent: 'center',
            
            '& h1': {
                margin: '1rem',
            },
        },

    }
})

function Home(props) {
    const classes = useStyles();

    const { screenWidth } = props;
    
    if (screenWidth > 768) {
        return (
            <div className={classes.home}>
                <div className={classes.container}>
                    <h1>GET DONE</h1>
                    <p>
                        Never miss another item at the store.
                    </p>
                    <Link to='/register' >GET STARTED</Link>
                </div>
                < BackgroundProp />
            </div>
        )
    } else {
        return (
            <div className={classes.home}>
                <img src={Logo} alt="Logo" className={classes.logo} />
                <div className={classes.container}>
                    <h1>GET DONE</h1>
                    <p>
                        Never miss another item at the store.
                    </p>
                    <div className={classes.buttonContainer}>
                        <Link to='/register' >SIGN UP</Link>
                        <Link to='/login' >LOG IN</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home
