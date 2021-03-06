//  Libraries
import React from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

// Components
import Logo from '../Icons/Logo-SM.png';

// Styles
const useStyles = createUseStyles({
    container: {
        width: '100%',
        height: '5rem',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
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
        marginLeft: '2rem',
        height: '55px',
    },
    navLinks: {
        marginRight: '2rem',
        '& a': {
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',

            '&:hover': {
                color: '#F25C05'
            }
        }
    },

    '@media (max-width: 768px)': {
        container: {
            bottom: '0',
            backgroundColor: '#F25C05',
            height: '5rem',
        },
        navLinks: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            color: '#FCFCFC',
            margin: '0',
            marginBottom: '1rem',

            '& a': {
                borderRadius: '50%',
                padding: '0.75rem',

                '&:hover': {
                    color: '#FCFCFC'
                },
                '&:active': {
                    backgroundColor: '#FCFCFC88',
                },
                '& i': {
                    fontSize: '1.5rem'
                }
            },
        }
    },
    hide: {
        transform: 'translateY(100%)',
        transition: 'transform 0.25s linear 0s'
    }

})

function Navbar(props) {
    const classes = useStyles();
    const { user, updateUser, screenWidth, isNavHidden } = props;
    
    async function logout() {
        await axios.get('/api/users/logout');
        updateUser({});
    }

    if(screenWidth < 768 && !user.username) return <div />
    else if (screenWidth < 768) {
        return (
            <div className={`${classes.container} ${isNavHidden ? classes.hide : null}`}>
                <nav className={classes.nav}>
                    <div className={classes.navLinks}>
                        <NavLink to="/" onClick={logout}>
                            <i className="fas fa-sign-out-alt" />
                        </NavLink>
                        <NavLink to='/'>
                            <i className="fas fa-home" />
                        </NavLink>
                        <NavLink to='/user'>
                            <i className="fas fa-user" />
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