// Libraries
import React, { Component } from 'react';
import axios from 'axios';

// Styles
import '../styles/ForgotPw.css';

export class ForgotPw extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            message: ''
        }
    }
    
    handleUserInput = e => {
        const { value } = e.target;
        this.setState({ [e.target.id]: value});
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { email } = this.state;
        const input = { email };
        console.log(input)
        const res = await axios.post('/api/users/forgot-pw', input);
        console.log(res.data);
        if(res.data.error) {
            return this.setState({ message: res.data.error })
        }
        return this.setState({ message: res.data.success })
    }

    render() {
        const { email, message } = this.state;

        return (
            <div className='ForgotPw'>
                <h1>RETRIEVE RESET TOKEN</h1>
                
                <form onSubmit={this.handleSubmit} className='Form'>
                    <p className='forgot-message'>{message}</p>
                    <div className='Input-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' value={email} 
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <div className='Form-footer'>
                        <button type='submit' className='Token-btn'>Send Token</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ForgotPw
