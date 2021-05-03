import React from 'react';
/* -------------------------------
 this file is used to display the users as a list'
 ---------------------------------*/
import { Link } from 'react-router-dom';
import './registered-users.style.scss';
const RegisteredDetails = ({ user }) => {
    // console.log (user);
    return (
        <>
            <div className='reg-user-list-component__box'>
                <Link
                    to={`/registereduserdetails/${user.uid}`}
                    className='reg-user-list-component__detail-link'
                >
                    {user.firstName ? (
                        <span>
                            {user.firstName} {user.lastName}
                        </span>
                    ) : (
                        <span>{user.login} </span>
                    )}
                </Link>
            </div>
        </>
    );
};

export default RegisteredDetails;
