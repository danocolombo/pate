import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk';

import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';
import Spinner from '../spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
// import { CognitoUserPool } from 'amazon-cognito-identity-js';

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
       //us-east-1_2AD4aPWxt
       
    //    AWS.config.update({
    //     credentials: new AWS.CognitoIdentityCredentials({
    //       IdentityPoolId: 'us-east-1-foo-bar'
    //     }),
    //     region: 'us-east-1'
    //   });
    //    const {CognitoIdentity} = require("@aws-sdk/client-cognito-identity")
    //     AWS.config.region = 'REGION'; 
    //     AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'IDENTITY_POOL_ID'});
    AWS.config.update({region:'us-east-1'});
    // var myCredentials = new AWS.CognitoIdentityCredentials({
    //     IdentityPoolId:'us-east-1:"Identity Pool ID"'
    // });
        let DANO1 = false;
        if (DANO1 === true){
            let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
            let params = {         
                PaginationToken: "20",
                UserPoolId: "us-east-1_2AD4aPWxt"
            };
            cognitoidentityserviceprovider.listUsers(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            });
            const client = new CognitoIdentityProviderClient({ region: "US-East-1" });
            const command = new ListUsersCommand(params);
            // try {
            //     const data = await client.send(command);
            //     console.log(data);
            // } catch (error) {
            //     console.log(error.message);
            // }
            client.send(command).then(
                (data) => {
                console.log(data);
                },
                (error) => {
                console.log(error.message);
                }
            );
        }
        var params = { 
            UserPoolId: 'xxxxxxxxxxxxxxxxxxxx', 
            AttributesToGet: [ "email" ],
            Filter: "",
            Limit: 10
         };
      
         var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
            cognitoidentityserviceprovider.listUsers(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);         // successful response
            })
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
