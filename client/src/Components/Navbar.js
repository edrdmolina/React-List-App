//  Libraries
import React from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

// Components
import Logo from '../Icons/Logo-SM.svg'

// Styles
const useStyles = createUseStyles({
    nav: {
        width: '100vw',
        maxWidth: '1200px',
        height: '5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 auto'
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
        <nav className={classes.nav}>
            <NavLink to="/">
                <img src={Logo} alt="Logo" className={classes.logo} />
            </NavLink>
            { user.username ? (
                <div className={classes.navLinks}>
                    <NavLink to="/" onClick={logout}>
                        Logout
                    </NavLink>
                    <NavLink to='/'>
                        {user.username} <i className="fas fa-user" />
                    </NavLink>
                </div>
            ) : (
            <div className={classes.navLinks}>
                <NavLink to="/register">
                    Register
                </NavLink>
                <NavLink to="login">
                    Login
                </NavLink>
            </div>
            )}
        </nav>
    )
}

export default Navbar