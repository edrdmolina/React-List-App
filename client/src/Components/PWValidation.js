import React from 'react'

function PWValidation(props) {
    const { password } = props

    const validationRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const isValid = validationRegex.test(password);
    
    if(!password) {
        return (
            <p/>
        )
    } else if (isValid) {
        return (
            <p style={{ color: '#FCFCFC' }}>
                Valid <i className="fas fa-check-circle" />
            </p>
        )
    } else {
        return (
            <p style={{ color: '#C03546' }}>
                Invalid Password <i className="fas fa-times-circle" />
            </p>
        )
    }
}

export default PWValidation