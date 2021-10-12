// Libraries
import React, { Component } from 'react'
import axios from 'axios'

// Styles
import '../../styles/DeleteUserConfirmation.css'

export class DeleteUserConfirmation extends Component {


    deleteUser = async () => {
        const { password, user } = this.props;
        const input = { password, user }
        const res = await axios.put('/api/users/delete', input);
        if (res.data.error) {
            this.props.updateMessage(res.data.error);
            return this.props.cancelDeleteUser();

        } else {
            return window.location.href = res.data.redirectUrl;
        }
    }

    handleCancelDeleteUser = e => {
        this.props.cancelDeleteUser()
    }

    render() {
        return (
            <div className='DeleteUserConfirmation-bg'>
                <div className='DeleteUserConfirmation'>
                    <p className='Warning'>
                        This will delete all lists and items along with user.
                        Are you sure you want to delete account?
                    </p>
                    <button className='No' onClick={this.handleCancelDeleteUser} >No</button>
                    <button className='Yes' onClick={this.deleteUser}>Yes</button>
                </div>
            </div>
        )
    }
}

export default DeleteUserConfirmation
