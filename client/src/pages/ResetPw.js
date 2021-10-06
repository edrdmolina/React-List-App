// Libraries
import React, { Component } from "react";
import axios from "axios";

// Components 
import PWConfirmation from './components/PWConfirmation';

// Styles


export class ResetPw extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            newPassword: '',
            confirmNewPassword: '',
            message: ''
        }
    }

    handleUserInput = e => {
        const { value } = e.target;
        this.setState({ [e.target.id]: value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { token } = this.props.match.params;
        const { newPassword, confirmNewPassword } = this.state;
        const input = { newPassword, confirmNewPassword, token };
        const res = await axios.put(`/api/users/reset-pw`, input);
        console.log(res.data)
        const { message, success, error, redirectUrl } = res.data;
        console.log(message);
        if(error) {
            return this.setState({ message: error });
        }

        this.setState({ message: success })
        window.location.href = redirectUrl;

    }

    render() {

        const { newPassword, confirmNewPassword } = this.state;

        let isDisabled = true;
        
        if (newPassword && confirmNewPassword && (newPassword === confirmNewPassword)) {
            
            isDisabled = false;
        } else {
            isDisabled = true;
        }

        return (
            <div className='Login'>
                <h1>RESET PW PAGE</h1>
                <form onSubmit={this.handleSubmit} className='Form'>
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
                    <div className='Form-footer'>
                        <button 
                            type='submit'
                            className={`Register-btn ${isDisabled ? 'Disabled' : ''}`}
                            disabled={isDisabled}
                        >Save Changes</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ResetPw
