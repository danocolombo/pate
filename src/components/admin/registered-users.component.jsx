import React, { useState, useEffect } from 'react'
import Spinner from '../spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';

const RegisteredUsers = () => {
    const [loadingUsers, setLoadingUsers] = useState(true);
    useEffect(() => {
        getRegisteredUsers();
        
    }, [])
    const getRegisteredUsers = () => {
        // need to get the list of registered users from cognito user pool
        setLoadingUsers(false);
    }
    return loadingUsers ? (
        <Spinner />
    ) : (
        <>
        <div className='serveevent-page__header'>REGISTERED USERS</div>
        <div className='serveevent-page__data-input-box'>
            <div className='serveevent-page__section-header'>
                Location
            </div>
            <div className='serveevent-page__grid-line'>
        
            </div>
        </div>
        </>
          
    )
}

export default RegisteredUsers;
