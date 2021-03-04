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
// const loginWithCognito = (email, password) => async (dispatch) => {
//     const user = new CognitoUser({
//         Username: email,
//         Pool: UserPool,
//     });

//     const authDetails = new AuthenticationDetails({
//         Username: email,
//         Password: password,
//     });
//     console.log('email: ' + email);
//     console.log('password: ' + password);
//     console.log('AUTHENTICATE NOW');
//     user.authenticateUser(authDetails, {
//         onSuccess: (data) => {
//             const jwToken = data.idToken.jwtToken;
//             data.token = jwToken;
//             let login_success_data = {
//                 token: data.token,
//             };
//             //pass the jwt to LOGIN_SUCCESS
//             dispatch({
//                 type: UserActionTypes.LOGIN_SUCCESS,
//                 payload: login_success_data,
//             });
//             //======================================
//             // now lets get our user information
//             // from Cognito, send to loadUser
//             let uData = {
//                 _id: data.idToken.payload.sub,
//                 email: data.idToken.payload.email,
//                 firstName: data.idToken.payload.given_name,
//                 lastName: data.idToken.payload.family_name,
//                 phone: data.idToken.payload.phone_number,
//             };

//             //===================
//             // DANOTEST
//             //===================
//             // try {
//             //     let newUser = {
//             //         login: 'meeter.tester@wmogcolumbus.com',
//             //         password: 'R0mans1212!',
//             //         firstName: 'Meeter',
//             //         lastName: 'Tester',
//             //         phone: '+17066543210',
//             //         email: 'meeter.tester@wmogcolumbus.com',
//             //         role: 'guest', //superuser, owner, manager
//             //         client: 'wbc',
//             //     };
//             //     dispatch(registerUserInPool({ newUser }));
//             // } catch (regError) {
//             //     console.log('registerUserInPool FAILED');
//             // }
//             dispatch({
//                 type: UserActionTypes.UPDATE_USER,
//                 payload: uData,
//             });
//             // dispatch(loadUser({ uData }));
//         },
//         onFailure: (err) => {
//             console.error('onFailure:', err);
//             const util = require('util');
//             console.log(
//                 'err: ' + util.inspect(err, { showHidden: false, depth: null })
//             );

//             // dispatch(setAlert(err.message, 'danger'));
//             dispatch({
//                 type: UserActionTypes.LOGIN_FAILURE,
//             });
//         },
//         // newPasswordRequired: (data) => {
//         //     console.log('newPasswordRequired:', data);
//         // },
//     });

//     return null;
// };
export const testCognitoFunc = (email, password) => async (dispatch) => {
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });
    let cognitoResponse = {};
    // console.log(user?.getUsername);
    await user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            const jwToken = data.idToken.jwtToken;
            data.token = jwToken;
            let login_success_data = {
                token: data.token,
            };
            //pass the jwt to LOGIN_SUCCESS
            //@@@@@@@@@@@@@@@@@@@@@@@@@
            //DISPATCH CALL
            // dispatch({
            //     type: UserActionTypes.LOGIN_SUCCESS,
            //     payload: login_success_data,
            // });
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
            console.log('IN ACTION');
            cognitoResponse = data;
            // console.log('_id: ' + data.idToken.payload.sub);
            const util = require('util');
            console.log(
                'cognito data: ' +
                    util.inspect(data, { showHidden: false, depth: null })
            );

            // console.log('given_name: ' + data.idToken.payload.given_name);
            // console.log('email: ' + data.idToken.password.email);
            // console.log('firstName: ' + data.idToken.password.firstName);
            // console.log('lastName: ' + data.idToken.password.lastName);
            // console.log('phone: ' + data.idToken.password.phone);
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
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            // DISPATCH CALL
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            // dispatch({
            //     type: UserActionTypes.UPDATE_USER,
            //     payload: uData,
            // });
            // dispatch(loadUser({ uData }));
            // console.log('WE GOOD');
            // console.log('============');
            // const util = require('util');
            // console.log('cognitoResponse: ' + util.inspect(cognitoResponse, { showHidden: false, depth: null }));

            // return login_success_data;
        },
        onFailure: (err) => {
            console.error('onFailure:', err);
            const util = require('util');
            console.log(
                'err: ' + util.inspect(err, { showHidden: false, depth: null })
            );

            // dispatch(setAlert(err.message, 'danger'));
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@
            // DISPATCH CALL
            // dispatch({
            //     type: UserActionTypes.LOGIN_FAILURE,
            // });
            console.log('WE ERRORED OUT');
        },
        // newPasswordRequired: (data) => {
        //     console.log('newPasswordRequired:', data);
        // },
    });

    // console.log('RETURNING:\n' + JSON.parse(cognitoResponse));
    return cognitoResponse;
    // let msg = 'made it: ' + email;
    // return msg;
};

const testArrowCognito = (email, password) => async (dispatch) => {
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
            let cognitoResponse = data;
            // console.log('_id: ' + data.idToken.payload.sub);
            const util = require('util');
            console.log(
                'cognito data: ' +
                    util.inspect(data, { showHidden: false, depth: null })
            );
            //pass the jwt to LOGIN_SUCCESS
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //DISPATCH
            console.log('DISPATCH: login_success_data');
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

            //@@@@@@@@@@@@@@@@@@@@@@@@@@
            //DISPATCH
            console.log('DISPATCH: UPDATE_USER');
            // dispatch({
            //     type: UserActionTypes.UPDATE_USER,
            //     payload: uData,
            // });
        },
        onFailure: (err) => {
            console.error('onFailure:', err);
            const util = require('util');
            console.log(
                'err: ' + util.inspect(err, { showHidden: false, depth: null })
            );

            // dispatch(setAlert(err.message, 'danger'));
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //DISPATCH
            console.log('LOGIN_FAILURE');
            // dispatch({
            //     type: UserActionTypes.LOGIN_FAILURE,
            // });
        },
        // newPasswordRequired: (data) => {
        //     console.log('newPasswordRequired:', data);
        // },
    });

    return null;
};
export default testArrowCognito;
