// Libraries
import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// Styles
import '../styles/NavigationBar.css'

export class NavigationBar extends Component {

    // Logs the user out of the account through backend Passport API
    logout = async (e) => {
        await axios.get('/api/users/logout');
        this.props.removeUser();
    }

    // Deletes list from backend MongoDB. 
    deleteList = async () => {
        const { deleteListId } = this.props;
        const result = await axios.delete(`/api/${deleteListId}`);
        console.log(result)
        window.location.href = result.data.redirectUrl
    }

    render() {

        const { isLoggedIn, isInList, user } = this.props;

        // Returns the delete list button if found to be within the list
        const deleteList = isInList ? (
                <Nav.Link as={NavLink} to="/lists" onClick={this.deleteList} active className='push-right'>
                    Delete List
                </Nav.Link>
        ) : (
            null
        )

        return (
            <Navbar collapseOnSelect expand="lg" bg="none" variant="dark" className='NavigationBar'>
                
                { isLoggedIn ? (
                    <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        { isInList ? (
                            <i className="Back-button fas fa-chevron-left fa-2x"></i>
                        ) : (
                            <i className="far fa-list-alt fa-2x text-white"></i>
                        )}
                        
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                                   
                        <Nav className='push-right'>
                            { deleteList }
                            <Nav.Link as={NavLink} to={`/user`} active className='push-right'>
                                User Settings
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/" onClick={this.logout} active className='push-right'>
                                Logout
                            </Nav.Link>
                            <Nav.Link to='#' active className='push-right'>
                            <i className="fas fa-user"></i> {user.username}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                ) : (
                    <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        <i className="far fa-list-alt fa-2x text-white"></i>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='push-right'>
                            <Nav.Link as={NavLink} to="/register" className='push-right'>
                                Register
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/login" className='push-right'>
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                )}            
            </Navbar>
        )
    }
}

export default NavigationBar
