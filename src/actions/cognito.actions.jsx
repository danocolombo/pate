//================================
// cognito.actions
//================================
// this is used to interact with
// cognito user pool
//----------------------------------
import axios from 'axios';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import UserPool from './UserPool';
export const loginWithCognito = (email, password) => {
    // call to login
    console.log('...auth...');
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
    });
    console.log('AUTHENTICATE NOW');
    return null;
}