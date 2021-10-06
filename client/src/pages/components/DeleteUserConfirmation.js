// Libraries
import React, { Component } from 'react'
import axios from 'axios'

// Styles
import '../../styles/DeleteUserConfirmation.css'

export class DeleteUserConfirmation extends Component {


    deleteUser = async () => {
        console.log('clicking delete user')
        const { password } = this.props;
        const input = { password }
        const res = await axios.put('/api/users/delete', input);
        console.log(res)
        window.location.href = res.data.redirectUrl;
    }

    handleCancelDeleteUser = e => {
        this.props.cancelDeleteUser()
    }

    render() {
        return (
            <div className='DeleteUserConfirmation'>
                <p className='Warning'>
                    This will delete all lists and items along with user.
                    Are you sure you want to delete account?
                </p>
                <button className='No' onClick={this.handleCancelDeleteUser} >No</button>
                <button className='Yes' onClick={this.deleteUser}>Yes</button>
            </div>
        )
    }
}

export default DeleteUserConfirmation
