import React from 'react';

const RegisteredDetails = ({ user }) => {
    console.log (user);
    return (
        <>
            <div className='reg-user-list-component__box'>
                {user.firstName?(<span>{user.firstName} {user.lastName}!</span>)
                :(<span>{user.login} </span>)}
            </div>
        </>
    );
};

export default RegisteredDetails;
