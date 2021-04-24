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
            let params = {         
                "PaginationToken": "string",
                "UserPoolId": "us-east-1_2AD4aPWxt"
            }
            cognitoidentityserviceprovider.listUsers(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            });
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
