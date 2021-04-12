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
//----- actions needed -------
import {
    loadRegistrations,
    clearTempRegistration,
} from '../../redux/registrations/registrations.actions';
import { setCurrentUser } from '../../redux/user/user.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import './signin.styles.scss';

const SignIn = ({
    onSignIn,
    setCurrentUser,
    setSpinner,
    setAlert,
    clearSpinner,
    loadRegistrations,
    clearTempRegistration,
    pateSystem,
    currentUser,
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    useEffect(() => {}, [pateSystem.showSpinner]);
    const signIn = async () => {
        //display spinner
        let alertPayload = {};
        setSpinner();
        try {
            // let userDetails = {};
            await Auth.signIn(username, password)
                .then((user) => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                        Auth.completeNewPassword(
                            username, // the Cognito User Object
                            password,
                            []
                            // the new password
                            // OPTIONAL, the required attributes
                            // {
                            //     email: 'xxxx@example.com',
                            //     phone_number: '1234567890'
                            // }
                        )
                            .then((user) => {
                                // at this time the user is logged in if no MFA required
                                console.log(user);
                            })
                            .catch((e) => {
                                const alertPayload = {
                                    msg:
                                        'Authentication failed. Please check your credentials',
                                    alertType: 'danger',
                                };
                                setAlert(alertPayload);
                                return;
                            });
                    } else {
                        // the user is good to go....
                        console.log(
                            'this is where we check for currentUser.firstName'
                        );
                        // if (currentUser?.firstName) {
                        //     // if we have a first name saved, we presume profile is filled in
                        //     history.push('/');
                        // } else {
                        //     alertPayload = {
                        //         msg:
                        //             'Please complete your profile to complete registration process.',
                        //         alertType: 'warning',
                        //         timeout: 10000,
                        //     };
                        //     history.push('/profile');
                        // }
                    }
                })
                .catch((e) => {
                    switch (e.code) {
                        case 'UserNotFoundException':
                            alertPayload = {
                                msg: e.message,
                                alertType: 'danger',
                            };
                            break;

                        default:
                            alertPayload = {
                                msg: 'Signin error: [' + e.message + ']',
                                alertType: 'danger',
                            };
                            break;
                    }
                    setAlert(alertPayload);
                    return;
                });

            let currentUserInfo = {};
            let currentSession = {};
            await Auth.currentUserInfo().then((u) => {
                currentUserInfo = u;
            });
            await Auth.currentSession().then((data) => {
                currentSession = data;
            });
            await saveUser(currentUserInfo, currentSession);
            await getRegistrations(currentUserInfo.attributes.sub);
            //generic cleanup
            await clearTempRegistration();
            clearSpinner();
            if (currentUser?.firstName) {
                // if we have a first name saved, we presume profile is filled in
                history.push('/');
            } else {
                alertPayload = {
                    msg:
                        'Please complete your profile to complete registration process.',
                    alertType: 'warning',
                    timeout: 10000,
                };
                history.push('/profile');
            }
            history.push('/');
        } catch (error) {
            switch (error) {
                case 'No current user':
                    alertPayload = {
                        msg:
                            'Authentication failed. Please check your credentials',
                        alertType: 'danger',
                    };
                    break;

                default:
                    alertPayload = {
                        msg: 'Unknown error signing in.[' + error + ']',
                        alertType: 'danger',
                    };
                    break;
            }
            setAlert(alertPayload);
            clearSpinner();
        }
    };
    const changePassword = async () => {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                return Auth.changePassword(user, 'oldPassword', 'newPassword');
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };
    const getRegistrations = async (uid) => {
        async function getUserReg() {
            try {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getAllUserRegistrations',
                            payload: {
                                rid: uid,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // const util = require('util');
                        // console.log(
                        //     'registrations-data:\n' +
                        //         util.inspect(data.body, {
                        //             showHidden: false,
                        //             depth: null,
                        //         })
                        // );
                        loadRegistrations(data.body);
                    });
            } catch (error) {
                clearSpinner();
                console.log('Error fetching registrations \n' + error);
            }
        }
        await getUserReg();
    };
    const saveUser = async (userInfo, userSession) => {
        //get p8user data...

        let dbUser = {};
        try {
            await fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'getUser',
                        payload: {
                            uid: userInfo?.attributes?.sub,
                        },
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    dbUser = data?.body?.Items[0];
                });
        } catch (error) {
            clearSpinner();
            let alertPayload = {
                msg: 'Error fetching registrations: [' + error.message + ']',
                alertType: 'danger',
            };

            setAlert(alertPayload);
            console.log('Error fetching registrations \n' + error);
        }

        // now we have dbUser, add it to cognito data to put in redux
        // const util = require('util');
        // console.log(
        //     'dbUser: \n' +
        //         util.inspect(dbUser, { showHidden: false, depth: null })
        // );
        //============================================
        // if user has never updated their profile, there
        // will not be any pate ddb data to load, so need
        // to default...
        let userDetails = {};
        if (dbUser === undefined) {
            // default values
            userDetails.isLoggedIn = true;
            userDetails.role = 'guest';
            userDetails.status = 'active';
            userDetails.phone = '';
            userDetails.displayName = userInfo?.username;
            userDetails.firstName = '';
            userDetails.lastName = '';
            // session values
            userDetails.uid = userInfo?.attributes?.sub;
            userDetails.login = userInfo?.username;
            userDetails.email = userInfo?.attributes?.email;
            userDetails.jwt = userSession?.idToken?.jwtToken;
        } else {
            userDetails.isLoggedIn = true;
            userDetails.role = dbUser?.role;
            userDetails.status = dbUser?.status;
            userDetails.phone = dbUser?.phone;
            userDetails.displayName = dbUser.displayName;
            userDetails.firstName = dbUser.firstName;
            userDetails.lastName = dbUser.lastName;
            userDetails.uid = userInfo?.attributes?.sub;
            userDetails.login = userInfo?.username;
            userDetails.email = userInfo?.attributes?.email;
            userDetails.jwt = userSession?.idToken?.jwtToken;
        }
        // if they are a state rep...
        if (dbUser?.stateRep) {
            userDetails.stateRep = dbUser?.stateRep;
        }
        // if they are a state lead...
        if (dbUser?.stateLead) {
            userDetails.stateLead = dbUser?.stateLead;
        }
        //if there is address,
        if (dbUser?.residence) {
            let residence = {};
            if (dbUser?.residence?.street !== undefined) {
                residence.street = dbUser.residence.street;
            }
            if (dbUser?.residence?.city !== undefined) {
                residence.city = dbUser.residence.city;
            }
            if (dbUser?.residence?.postalCode !== undefined) {
                residence.postalCode = dbUser.residence.postalCode;
            }
            if (dbUser?.residence?.stateProv !== undefined) {
                residence.stateProv = dbUser.residence.stateProv;
            }

            userDetails.residence = residence;
        }
        if (dbUser?.church) {
            let church = {};
            if (dbUser?.church?.name !== undefined) {
                church.name = dbUser.church.name;
            }
            if (dbUser?.church?.city !== undefined) {
                church.city = dbUser.church.city;
            }
            if (dbUser?.church?.stateProv !== undefined) {
                church.stateProv = dbUser.church.stateProv;
            }

            userDetails.church = church;
        }
        await setCurrentUser(userDetails);
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='signin-page__signin-wrapper'>   
                <div className='signin-page__title-box'>
                    Login
                </div>
                <div className='signin-page__signin-box'>
                    <div className='signin-page__input-line'>
                        <div className='signin-page__input-label'>
                            Username
                        </div>
                        <div className='signin-page__input-control'>
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
                    <div className='signin-page__input-line'>
                        <div className='signin-page__input-label'>
                            Password
                        </div>
                        <div className='signin-page__input-control'>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                onChange={handleChange}
                                value={password}
                                required
                            />
                        </div>
                    </div>
                    <div className='signin-page__button-wrapper'>
                        <CustomButton
                            onClick={signIn}
                            className='signin-page__signin-button'
                        >
                            {' '}
                            Sign In{' '}
                        </CustomButton>
                    </div>
                </div>
                <div className='signin-page__offer-box'>
                    Don't have an account? Click here to 
                    <Link to="/register"> REGISTER</Link>
                </div>
            </div>
            <MainFooter />
            
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    setAlert: (payload) => dispatch(setAlert(payload)),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRegistrations: (registrations) =>
        dispatch(loadRegistrations(registrations)),
    clearTempRegistration: () => dispatch(clearTempRegistration),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    alerts: state.alert,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
