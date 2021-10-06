// Libraries
import React, { Component } from 'react'

// Styles
import '../../styles/components/PWConfirmation.css'


export class PWConfirmation extends Component {
    render() {
        const { password, passwordConfirmation } = this.props;

        if (passwordConfirmation && (password === passwordConfirmation)) {
            return (
                <div className='Match'>Passwords match!</div>
            )
        } else {
            if (passwordConfirmation) {
                return (
                    <div className='NoMatch'>Passwords do not match</div>
                )
            } else {
                return null
            }
        }
    }
}

export default PWConfirmation