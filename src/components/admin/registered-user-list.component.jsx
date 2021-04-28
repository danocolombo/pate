import React from 'react'

const RegisteredDetails = ({user, key}) => {
    return (
        <div>
            <div><h3>{key} - {user.login}</h3></div>
        </div>
    )
}

export default RegisteredDetails
