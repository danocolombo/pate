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
import { UserActionTypes } from '../redux/user/user.types';
import UserPool from './UserPool';
export const loginWithCognito = (email, password) => async (dispatch) => {
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });
    console.log('email: ' + email);
    console.log('password: ' + password);
    console.log('AUTHENTICATE NOW');
    user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            const jwToken = data.idToken.jwtToken;
            data.token = jwToken;
            let login_success_data = {
                token: data.token,
            };
            //pass the jwt to LOGIN_SUCCESS
            dispatch({
                type: UserActionTypes.LOGIN_SUCCESS,
                payload: login_success_data,
            });
            //======================================
            // now lets get our user information
            // from Cognito, send to loadUser
            let uData = {
                _id: data.idToken.payload.sub,
                email: data.idToken.payload.email,
                firstName: data.idToken.payload.given_name,
                lastName: data.idToken.payload.family_name,
                phone: data.idToken.payload.phone_number,
            };

            //===================
            // DANOTEST
            //===================
            // try {
            //     let newUser = {
            //         login: 'meeter.tester@wmogcolumbus.com',
            //         password: 'R0mans1212!',
            //         firstName: 'Meeter',
            //         lastName: 'Tester',
            //         phone: '+17066543210',
            //         email: 'meeter.tester@wmogcolumbus.com',
            //         role: 'guest', //superuser, owner, manager
            //         client: 'wbc',
            //     };
            //     dispatch(registerUserInPool({ newUser }));
            // } catch (regError) {
            //     console.log('registerUserInPool FAILED');
            // }
            dispatch({
                type: UserActionTypes.UPDATE_USER,
                payload: uData,
            });
            // dispatch(loadUser({ uData }));
        },
        onFailure: (err) => {
            console.error('onFailure:', err);
            const util = require('util');
            console.log(
                'err: ' + util.inspect(err, { showHidden: false, depth: null })
            );

            // dispatch(setAlert(err.message, 'danger'));
            dispatch({
                type: UserActionTypes.LOGIN_FAILURE,
            });
        },
        // newPasswordRequired: (data) => {
        //     console.log('newPasswordRequired:', data);
        // },
    });

    return null;
};
export const newCognitoLogin = (email, password) => async () => {
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });
    console.log('email: ' + email);
    console.log('password: ' + password);
    console.log('AUTHENTICATE NOW');
    // user.authenticateUser(authDetails, {
    //     onSuccess: (data) => {
    //         const jwToken = data.idToken.jwtToken;
    //         data.token = jwToken;
    //         let login_success_data = {
    //             token: data.token,
    //         };
    //         //pass the jwt to LOGIN_SUCCESS
    //         // dispatch({
    //         //     type: UserActionTypes.LOGIN_SUCCESS,
    //         //     payload: login_success_data,
    //         // });
    //         //======================================
    //         // now lets get our user information
    //         // from Cognito, send to loadUser
    //         let uData = {
    //             _id: data.idToken.payload.sub,
    //             email: data.idToken.payload.email,
    //             firstName: data.idToken.payload.given_name,
    //             lastName: data.idToken.payload.family_name,
    //             phone: data.idToken.payload.phone_number,
    //         };
    //         const util = require('util');
    //         console.log(
    //             'COGNITO_DATA: ' + util.inspect(data, { showHidden: false, depth: null })
    //         );

    //         // dispatch({
    //         //     type: UserActionTypes.UPDATE_USER,
    //         //     payload: uData,
    //         // });
    //         // dispatch(loadUser({ uData }));
    //     },
    //     onFailure: (err) => {
    //         console.error('onFailure:', err);
    //         const util = require('util');
    //         console.log(
    //             'err: ' + util.inspect(err, { showHidden: false, depth: null })
    //         );

    //         // dispatch(setAlert(err.message, 'danger'));
    //         // dispatch({
    //         //     type: UserActionTypes.LOGIN_FAILURE,
    //         // });
    //     },
    //     // newPasswordRequired: (data) => {
    //     //     console.log('newPasswordRequired:', data);
    //     // },
    // });
    let msg = 'FINISH_NEW';
    return msg; // was null
};

export const testFunc = (e, p) => {
    e = 'danocolombo@gmail.com';
    p = 'gxF*0n46';
    const user = new CognitoUser({
        Username: e,
        Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
        Username: e,
        Password: p,
    });
    user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            const jwToken = data.idToken.jwtToken;
            data.token = jwToken;
            let login_success_data = {
                token: data.token,
            };
            //pass the jwt to LOGIN_SUCCESS
            // dispatch({
            //     type: UserActionTypes.LOGIN_SUCCESS,
            //     payload: login_success_data,
            // });
            //======================================
            // now lets get our user information
            // from Cognito, send to loadUser
            // let uData = {
            //     _id: data.idToken.payload.sub,
            //     email: data.idToken.payload.email,
            //     firstName: data.idToken.payload.given_name,
            //     lastName: data.idToken.payload.family_name,
            //     phone: data.idToken.payload.phone_number,
            // };

            // dispatch({
            //     type: UserActionTypes.UPDATE_USER,
            //     payload: uData,
            // });
            // dispatch(loadUser({ uData }));
        },
        onFailure: (err) => {
            console.error('onFailure:', err);
            const util = require('util');
            console.log(
                'err: ' + util.inspect(err, { showHidden: false, depth: null })
            );

            // dispatch(setAlert(err.message, 'danger'));
            // dispatch({
            //     type: UserActionTypes.LOGIN_FAILURE,
            // });
        },
    });

    //++++++++++++++++++++++++++++++++++++++++++

    const util = require('util');
    // console.log(
    //     'user: ' + util.inspect(user, { showHidden: false, depth: null })
    // );
    // console.log('----------------------');
    // console.log('======================');

    console.log(
        'DONE WITH ROUTINE: ' +
            util.inspect(authDetails, { showHidden: false, depth: null })
    );
    return null;
};
