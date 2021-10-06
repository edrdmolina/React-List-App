// Libraries
import React, { Component } from 'react';
import axios from 'axios';

// Components
import DeleteUserConfirmation from './components/DeleteUserConfirmation';
import PWConfirmation from './components/PWConfirmation';

// Styles
import '../styles/Register.css';
import '../styles/User.css';

export class User extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: {},
            email: '',
            username: '',
            password: '',
            confirmNewPassword: '',
            newPassword: '',
            emailLocked: true,
            usernameLocked: true,
            isDeleteConfirmation: false,
            message: '',
        }
    }

    componentDidMount = () => {
        this.getUserData();
    }

    handleUserInput = e => {
        const { value } = e.target;
        this.setState({ [e.target.id]: value});
    }

    getUserData = async () => {
        const res = await axios.get('/api/users/getUser');
        if (res.data.error) {
            return window.location.href = res.data.redirectUrl;
        }
        const { user } = res.data
        this.setState({
            user,
            email: user.email,
            username: user.username,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.updateUser()
    }

    updateUser = async () => {
        const { email, username, user, 
            password, newPassword, confirmNewPassword 
        } = this.state;
        const input = { 
            email, username, user, 
            password, newPassword, confirmNewPassword 
        };
        const res = await axios.put('/api/users/updateUser', input);
        console.log(res)
        this.postUpdate(res)
    }

    postUpdate = (res) => {
        if (res.data.error) {
            this.setState({ message: res.data.error });
        } else {
            this.setState({ message: res.data.message });
        }
        this.setState({
            newPassword: '',
            confirmNewPassword: '',
            password: '', 
        })

    }

    handleDeleteUser = e => {
        this.setState({ isDeleteConfirmation: true });
    }

    cancelDeleteUser = e => {
        this.setState({ isDeleteConfirmation: false });
    }

    toggleEmailLock = (e) => {
        e.preventDefault();
        this.setState(ps => ({
            emailLocked: !ps.emailLocked
        }))
    }
    
    toggleUsernameLock = (e) => {
        e.preventDefault();
        this.setState(ps => ({
            usernameLocked: !ps.usernameLocked
        }))
    }

    render() {
        const { email, username, password, newPassword, isDeleteConfirmation,
            confirmNewPassword, emailLocked, usernameLocked 
        } = this.state;

        let isDisabled = true;
        
        if (email && username && password && (newPassword === confirmNewPassword)) {
            
            isDisabled = false;
        } else {
            isDisabled = true;
        }


        return (
            <div className='User'>
                <h1>USER SETTINGS</h1>
                <form onSubmit={this.handleSubmit} className='Form'>
                    <div className='message'>
                        <p>
                            {this.state.message}
                        </p>
                    </div>
                    { emailLocked ? (
                        <div className='Input-group-locked'>
                            <p className='label'> Email</p>
                            <div className='disabled-row'> 
                                <div className='input'>
                                    <p className='email'>
                                        {email}
                                    </p>
                                </div>
                                <div className='lock' onClick={this.toggleEmailLock}>
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='Input-group-locked'>
                            <label htmlFor='email' className='label'>Email</label>
                            <div className='disabled-row'>
                                <input className='input-unlocked' type='email' id='email' value={email} onChange={this.handleUserInput}
                                />
                                <div className='lock' onClick={this.toggleEmailLock}>
                                <i className="fas fa-lock-open"></i>
                                </div>
                            
                            </div>
                        </div>
                    )}

                    { usernameLocked ? (
                        <div className='Input-group-locked'>
                            <p className='label'> Username</p>
                            <div className='disabled-row'> 
                                <div className='input'>
                                    <p className='email'>
                                        {username}
                                    </p>
                                </div>
                                <div className='lock' onClick={this.toggleUsernameLock}>
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='Input-group-locked'>
                            <label htmlFor='username' className='label'>Username</label>
                            <div className='disabled-row'>
                                <input className='input-unlocked' type='text' id='username' value={username} onChange={this.handleUserInput}
                                />
                                <div className='lock' onClick={this.toggleUsernameLock}>
                                <i className="fas fa-lock-open"></i>
                                </div>
                            
                            </div>
                        </div>
                    )}

                    <div className='Input-group'>
                        <label htmlFor='newPassword' className='label'>New Password</label>
                        
                        <input type='password' id='newPassword' value={newPassword} onChange={this.handleUserInput}
                        />
                    </div>
                    <div className='Input-group'>
                        <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                        <input type='password' id='confirmNewPassword' value={confirmNewPassword}
                            onChange={this.handleUserInput}
                        />
                        <PWConfirmation password={newPassword} passwordConfirmation={confirmNewPassword} />
                    </div>
                    <div className='Input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={this.state.password}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    
                    <div className='Form-footer'>
                        <button 
                                type='button'
                                className={`deleteUser-btn ${isDisabled ? 'Disabled-delete' : ''}`}
                                disabled={isDisabled}
                                onClick={this.handleDeleteUser}
                            >Delete User</button>
                        <button 
                            type='submit'
                            className={`Register-btn ${isDisabled ? 'Disabled' : ''}`}
                            disabled={isDisabled}
                        >Save Changes</button>
                    </div>
                </form>
                
                { isDeleteConfirmation ? (
                     <DeleteUserConfirmation password={password} cancelDeleteUser={this.cancelDeleteUser} />
                ) : (
                    null
                )}
               
            </div>
        )
    }
}

export default User
