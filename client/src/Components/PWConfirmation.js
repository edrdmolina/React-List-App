import React from 'react'

function PWConfirmation(props) {
    const { password, passwordConfirmation } = props;

    if (passwordConfirmation && password !== passwordConfirmation) {
        return (
            <p style={{ color: '#C03546' }}>
                Passwords don't match. <i className="fas fa-times-circle" />
            </p>
        )
    } else if (passwordConfirmation && password === passwordConfirmation) {
        return (
            <p style={{ color: '#FCFCFC' }}>
                Passwords match! <i className="fas fa-check-circle" />
            </p>
        )
    } else {
        return (
            <p/>
        )
    }
}

export default PWConfirmation