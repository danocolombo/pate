import React from 'react';

const RegisteredDetails = ({ user }) => {
    return (
        <>
            <div className='reg-user-list-component__box'>
                <span>{user.Username}</span>
                <br />
                <span>{user.firstName}</span>
            </div>
        </>
    );
};

export default RegisteredDetails;
