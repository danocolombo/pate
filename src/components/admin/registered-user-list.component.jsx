import React from 'react';

const RegisteredDetails = ({ user, key }) => {
    return (
        <>
            <div className='reg-user-list-component__box'>
                <span>{user.login}</span>
                <br />
                <span>{user.firstName}</span>
            </div>
        </>
    );
};

export default RegisteredDetails;
