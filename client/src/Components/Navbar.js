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
    }
})

function Navbar(props) {
    const classes = useStyles();
    const { user, updateUser } = props;

    async function logout() {
        await axios.get('/api/users/logout');
        updateUser({});
    }

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

export default Navbar