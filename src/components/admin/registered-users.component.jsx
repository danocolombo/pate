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
        //-------------------------------------
        // hit cognito user pool api (listUsers)
        //---------------------------------------------
        // the data to send
        //NOTE: max returned users is 60, so will need to use paging
        /*              
            {
                "AttributesToGet": [ "string" ], //null returns *
                "Filter": "string",
                "Limit": number,
                "PaginationToken": "string",
                "UserPoolId": "string"
            }
            OUR ACTUAL REQUEST
            {         
                "PaginationToken": "string",
                "UserPoolId": "us-east-1_2AD4aPWxt"
            }
            }
        */
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
