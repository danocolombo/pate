import React from 'react'

const RegisteredUserList = ({user, key}) => {
    return (
        <div>
            <div><h3>{key} - {user.login}</h3></div>
        </div>
    )
}

export default RegisteredUserList
