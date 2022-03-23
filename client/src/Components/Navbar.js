//  Libraries
import React from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

// Components
import Logo from '../Icons/Logo-SM.svg'

// Styles
const useStyles = createUseStyles({
    container: {
        width: '100%',
        height: '5rem',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center'
    },
    nav: {
        width: '100%',
        maxWidth: '1200px',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        marginLeft: '2rem'
    },
    navLinks: {
        marginRight: '2rem',
        '& a': {
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem'
        }
    },

    '@media (max-width: 768px)': {
        container: {
            bottom: '0',
            backgroundColor: '#000270',
            height: '5rem',
        },
        navLinks: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            color: '#FCFCFC',

            '& a': {
                borderRadius: '50%',
                padding: '0.75rem'
            },
            
            '& a:active': {
                backgroundColor: '#FCFCFC88',
            }
        }
    }

})

function Navbar(props) {
    const classes = useStyles();
    const { user, updateUser, screenWidth } = props;
    
    async function logout() {
        await axios.get('/api/users/logout');
        updateUser({});
    }

    if(screenWidth < 768 && !user.username) return <div />
    else if (screenWidth < 768) {
        return (
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <div className={classes.navLinks}>
                        <NavLink to="/" onClick={logout}>
                            <i className="fas fa-sign-out-alt fa-2x" />
                        </NavLink>
                        <NavLink to='/'>
                            <i className="fas fa-home fa-2x" />
                        </NavLink>
                        <NavLink to='/user'>
                            <i className="fas fa-user fa-2x" />
                        </NavLink>
                    </div>
                </nav>
            </div>
        )
    } else {
        return (
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <NavLink to="/">
                        <img src={Logo} alt="Logo" className={classes.logo} />
                    </NavLink>
                    { user.username ? (
                        <div className={classes.navLinks}>
                            <NavLink to="/" onClick={logout}>
                                Logout
                            </NavLink>
                            <NavLink to='/user'>
                                {user.username} <i className="fas fa-user" />
                            </NavLink>
                        </div>
                    ) : (
                    <div className={classes.navLinks}>
                        <NavLink to="/register">
                            Sign up
                        </NavLink>
                        <NavLink to="login">
                            Log in
                        </NavLink>
                    </div>
                    )}
                </nav>
            </div>
        )
    }
}

export default Navbar