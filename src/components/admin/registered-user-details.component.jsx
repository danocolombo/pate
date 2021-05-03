import React from 'react'

const RegisteredUserDetails = ({user, key}) => {
    return (
        <div>
            {user.firstName? (
                <div>{user.firstName}</div>
            ):(
                <div>{user.login}</div>
            )}
            
        </div>
    )
}

export default RegisteredUserDetails;
