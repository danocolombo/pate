import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import Modal from '../../components/modals/wrapper.modal';
import ChangeEmailModal from '../../components/modals/auth/password-changed.modal';
//----- actions needed -------
// import {
//     loadRegistrations,
//     clearTempRegistration,
// } from '../../redux/registrations/registrations.actions';
// import { setCurrentUser } from '../../redux/user/user.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import './new-password.styles.scss';

const NewPassword = ({
    setAlert,
    clearSpinner,
   setSpinner
}) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const [showChangedPasswordModal, setShowChangePasswordModal] = useState(
        false
    );
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const history = useHistory();
    // useEffect(() => {}, [pateSystem.showSpinner]);
    // const handleChangeRequest = async () => {
    //     //display spinner
    //     let alertPayload = {};
    //     setSpinner();
    //     try {
    //         // let userDetails = {};
    //         await Auth.signIn(username, password1)
    //             .then((user) => {
    //                 if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    //                     const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
    //                     Auth.completeNewPassword(
    //                         username, // the Cognito User Object
    //                         password1,
    //                         []
    //                         // the new password
    //                         // OPTIONAL, the required attributes
    //                         // {
    //                         //     email: 'xxxx@example.com',
    //                         //     phone_number: '1234567890'
    //                         // }
    //                     )
    //                         .then((user) => {
    //                             // at this time the user is logged in if no MFA required
    //                             console.log(user);
    //                         })
    //                         .catch((e) => {
    //                             const alertPayload = {
    //                                 msg:
    //                                     'Authentication failed. Please check your credentials',
    //                                 alertType: 'danger',
    //                             };
    //                             setAlert(alertPayload);
    //                             return;
    //                         });
    //                 } else {
    //                     // the user is good to go....
    //                 }
    //             })
    //             .catch((e) => {
    //                 switch (e.code) {
    //                     case 'UserNotFoundException':
    //                         alertPayload = {
    //                             msg: e.message,
    //                             alertType: 'danger',
    //                         };
    //                         break;
    //                     case 'PasswordResetRequiredException':
    //                         alertPayload = {
    //                             msg: e.message,
    //                             alertType: 'danger',
    //                         };
    //                         break;
    //                     default:
    //                         alertPayload = {
    //                             msg: 'Signin error: [' + e.message + ']',
    //                             alertType: 'danger',
    //                         };
    //                         break;
    //                 }
    //                 setAlert(alertPayload);
    //                 return;
    //             });

    //         let currentUserInfo = {};
    //         let currentSession = {};
    //         await Auth.currentUserInfo().then((u) => {
    //             currentUserInfo = u;
    //         });
    //         await Auth.currentSession().then((data) => {
    //             currentSession = data;
    //         });
    //         // we will get true if user is registered or false if not

    //         const userIsRegistered = await saveUser(
    //             currentUserInfo,
    //             currentSession
    //         );
    //         await getRegistrations(currentUserInfo.attributes.sub);
    //         //generic cleanup
    //         await clearTempRegistration();
    //         //let user know if they need to complete registration
    //         console.log('REGISTERED: ' + userIsRegistered);
    //         !userIsRegistered ? console.log('NOPE') : console.log('YEP');

    //         clearSpinner();
    //         userIsRegistered ? history.push('/') : history.push('/profile');
    //     } catch (error) {
    //         switch (error) {
    //             case 'No current user':
    //                 alertPayload = {
    //                     msg:
    //                         'Authentication failed. Please check your credentials',
    //                     alertType: 'danger',
    //                 };
    //                 break;

    //             default:
    //                 alertPayload = {
    //                     msg: 'Unknown error signing in.[' + error + ']',
    //                     alertType: 'danger',
    //                 };
    //                 break;
    //         }
    //         setAlert(alertPayload);
    //         clearSpinner();
    //     }
    // };

    // const changePassword = async () => {
    //     Auth.currentAuthenticatedUser()
    //         .then((user) => {
    //             return Auth.changePassword(user, 'oldPassword', 'newPassword');
    //         })
    //         .then((data) => console.log(data))
    //         .catch((err) => console.log(err));
    // };
    // const getRegistrations = async (uid) => {
    //     async function getUserReg() {
    //         try {
    //             fetch(
    //                 'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
    //                 {
    //                     method: 'POST',
    //                     body: JSON.stringify({
    //                         operation: 'getAllUserRegistrations',
    //                         payload: {
    //                             rid: uid,
    //                         },
    //                     }),
    //                     headers: {
    //                         'Content-type': 'application/json; charset=UTF-8',
    //                     },
    //                 }
    //             )
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     // const util = require('util');
    //                     // console.log(
    //                     //     'registrations-data:\n' +
    //                     //         util.inspect(data.body, {
    //                     //             showHidden: false,
    //                     //             depth: null,
    //                     //         })
    //                     // );
    //                     loadRegistrations(data.body);
    //                 });
    //         } catch (error) {
    //             clearSpinner();
    //             console.log('Error fetching registrations \n' + error);
    //         }
    //     }
    //     await getUserReg();
    // };
    // const saveUser = async (userInfo, userSession) => {
    //     //get p8user data...

    //     let dbUser = {};
    //     try {
    //         await fetch(
    //             'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
    //             {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     operation: 'getUser',
    //                     payload: {
    //                         uid: userInfo?.attributes?.sub,
    //                     },
    //                 }),
    //                 headers: {
    //                     'Content-type': 'application/json; charset=UTF-8',
    //                 },
    //             }
    //         )
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 dbUser = data?.body?.Items[0];
    //             });
    //     } catch (error) {
    //         clearSpinner();
    //         let alertPayload = {
    //             msg: 'Error fetching registrations: [' + error.message + ']',
    //             alertType: 'danger',
    //         };

    //         setAlert(alertPayload);
    //         console.log('Error fetching registrations \n' + error);
    //     }

    //     // now we have dbUser, add it to cognito data to put in redux
    //     // const util = require('util');
    //     // console.log(
    //     //     'dbUser: \n' +
    //     //         util.inspect(dbUser, { showHidden: false, depth: null })
    //     // );
    //     //============================================
    //     // if user has never updated their profile, there
    //     // will not be any pate ddb data to load, so need
    //     // to default...
    //     let userDetails = {};
    //     if (dbUser === undefined) {
    //         // default values
    //         userDetails.isLoggedIn = true;
    //         userDetails.role = 'guest';
    //         userDetails.status = 'active';
    //         userDetails.phone = '';
    //         userDetails.displayName = userInfo?.username;
    //         userDetails.firstName = '';
    //         userDetails.lastName = '';
    //         // session values
    //         userDetails.uid = userInfo?.attributes?.sub;
    //         userDetails.login = userInfo?.username;
    //         userDetails.email = userInfo?.attributes?.email;
    //         userDetails.jwt = userSession?.idToken?.jwtToken;
    //     } else {
    //         userDetails.isLoggedIn = true;
    //         userDetails.role = dbUser?.role;
    //         userDetails.status = dbUser?.status;
    //         userDetails.phone = dbUser?.phone;
    //         userDetails.displayName = dbUser.displayName;
    //         userDetails.firstName = dbUser.firstName;
    //         userDetails.lastName = dbUser.lastName;
    //         userDetails.uid = userInfo?.attributes?.sub;
    //         userDetails.login = userInfo?.username;
    //         userDetails.email = userInfo?.attributes?.email;
    //         userDetails.jwt = userSession?.idToken?.jwtToken;
    //     }
    //     // if they are a state rep...
    //     if (dbUser?.stateRep) {
    //         userDetails.stateRep = dbUser?.stateRep;
    //     }
    //     // if they are a state lead...
    //     if (dbUser?.stateLead) {
    //         userDetails.stateLead = dbUser?.stateLead;
    //     }
    //     //if there is address,
    //     if (dbUser?.residence) {
    //         let residence = {};
    //         if (dbUser?.residence?.street !== undefined) {
    //             residence.street = dbUser.residence.street;
    //         }
    //         if (dbUser?.residence?.city !== undefined) {
    //             residence.city = dbUser.residence.city;
    //         }
    //         if (dbUser?.residence?.postalCode !== undefined) {
    //             residence.postalCode = dbUser.residence.postalCode;
    //         }
    //         if (dbUser?.residence?.stateProv !== undefined) {
    //             residence.stateProv = dbUser.residence.stateProv;
    //         }

    //         userDetails.residence = residence;
    //     }
    //     if (dbUser?.church) {
    //         let church = {};
    //         if (dbUser?.church?.name !== undefined) {
    //             church.name = dbUser.church.name;
    //         }
    //         if (dbUser?.church?.city !== undefined) {
    //             church.city = dbUser.church.city;
    //         }
    //         if (dbUser?.church?.stateProv !== undefined) {
    //             church.stateProv = dbUser.church.stateProv;
    //         }

    //         userDetails.church = church;
    //     }
    //     await setCurrentUser(userDetails);
    //     //will return true if the user is registered, false if not
    //     //========================================
    //     if (dbUser?.firstName && dbUser?.lastName && dbUser?.residence?.city) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password1':
                setPassword1(value);
                break;
            case 'password2':
                setPassword2(value);
                break;
            case 'confirmationCode':
                setConfirmationCode(value);
                break;
            default:
                break;
        }
    };
    const handleAcknowledge = () => {
        setShowChangePasswordModal(false);
        history.push('/signin');
        return;
    };
    const handleChangePassword = async () => {
        let alertPayload = {};
        //first thing, we need to make sure that the 
        //password1 matches password2
        if(password1 !== password2){
            alertPayload = {
                msg:
                    'Passwords do not match. Please try again',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        setSpinner();
        await Auth.forgotPasswordSubmit(username,password1,confirmationCode)
        .then((requestResponse) => {
            const util = require('util');
            console.log(
                'ConfirmForgotPassword OK - requestResponse \n' +
                    util.inspect(requestResponse, {
                        showHidden: false,
                        depth: null,
                    })
            );
        })
        .catch((e) => {
            const util = require('util');
            console.log(
                'forgotPasswordSubmit error (e): \n' +
                    util.inspect(e, {
                        showHidden: false,
                        depth: null,
                    })
            );
            alertPayload = {
                msg:
                    'Error resetting password\n',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        });
        clearSpinner();
        setShowChangePasswordModal(true);
    }
    
    return  (
        <>
            <Header />
            <div className='signin-page__page-frame'>
                <div className='signin-page__content-wrapper'>
                    <div className='signin-page__content-box'>
                        <div className='signin-page__section-title'>LOGIN</div>
                        <div className='signin-page__section-box'>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    Username
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='text'
                                        name='username'
                                        id='username'
                                        value={username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    New Password
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='password'
                                        id='password1'
                                        name='password1'
                                        onChange={handleChange}
                                        value={password1}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    Repeat Password
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='password'
                                        id='password2'
                                        name='password2'
                                        onChange={handleChange}
                                        value={password2}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    Code
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='text'
                                        id='confirmationCode'
                                        name='confirmationCode'
                                        onChange={handleChange}
                                        value={confirmationCode}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__button-wrapper'>
                                <CustomButton
                                    onClick={handleChangePassword}
                                    className='signin-page__signin-button'
                                >
                                    {' '}
                                    Change It{' '}
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter />
            <Modal isOpened={showChangedPasswordModal}>
                <div>
                    <ChangeEmailModal
                        acknowledged={() => handleAcknowledge()}
                    />
                </div>
            </Modal>
            {/*
            <ResetPasswordModal isOpened={showForgotPasswordModal}>
                <ResetPasswordMessage onClose={() => resetPasswordResponse()} />
            </ResetPasswordModal>
            */}
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    setAlert: (payload) => dispatch(setAlert(payload)),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    alerts: state.alert,
});
export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
