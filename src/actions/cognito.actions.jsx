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
export const authenticateUser = (email, password) => async (dispatch) => {
    // call to login
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
    });
    console.log('AUTHENTICATE NOW');
}