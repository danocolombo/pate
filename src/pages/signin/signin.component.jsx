import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
//----- actions needed -------
import {
    loadRegistrations,
} from '../../redux/registrations/registrations.actions';
import { setCurrentUser } from '../../redux/user/user.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './signin.styles.scss';

const SignIn = ({
    onSignIn,
    setCurrentUser,
    setSpinner,
    clearSpinner,
    loadRegistrations,
    pateSystem,
    currentUser,
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    useEffect(() => {}, [pateSystem.showSpinner]);
    const signIn = async () => {
        //display spinner
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
                                console.log(e);
                            });
                    } else {
                        // other situations
                    }
                })
                .catch((e) => {
                    console.log(e);
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
            
            clearSpinner();
            history.push('/');
        } catch (error) {
            clearSpinner();
            console.log('Error signing in' + error);
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
                        const util = require('util');
                        console.log(
                            'registrations-data:\n' +
                                util.inspect(data.body, {
                                    showHidden: false,
                                    depth: null,
                                })
                        );
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
            userDetails.dislayName = userInfo?.username;
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
            userDetails.dislayName = dbUser.displayName;
            userDetails.firstName = dbUser.firstName;
            userDetails.lastName = dbUser.lastName;
            userDetails.uid = userInfo?.attributes?.sub;
            userDetails.login = userInfo?.username;
            userDetails.email = userInfo?.attributes?.email;
            userDetails.jwt = userSession?.idToken?.jwtToken;
        }
        // if they are a state rep...
        if (dbUser?.repInfo) {
            userDetails.stateRep = dbUser?.repInfo?.stateProv;
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

            <div className='signin-page-wrapper'>
                <div className='signin-box'>
                    <div className='signin-title-box'>
                        <h3>Login</h3>
                    </div>
                    <div className='signin-wrapper'>
                        <div className='username-wrapper'>
                            <FormInput
                                name='username'
                                className='form-component'
                                type='username'
                                handleChange={handleChange}
                                value={username}
                                label='login'
                                required
                            />
                        </div>
                        <div className='password-wrapper'>
                            <FormInput
                                name='password'
                                className='form-component'
                                type='password'
                                value={password}
                                handleChange={handleChange}
                                label='password'
                                required
                            />
                        </div>
                    </div>
                    <div className='button-wrapper'>
                        <CustomButton
                            onClick={signIn}
                            className='register-button'
                        >
                            {' '}
                            Sign in{' '}
                        </CustomButton>
                    </div>
                    <div className='register-offer-wrapper'>
                        If you don't have an account,
                        <br />
                        <Link to={'/register'}>click here</Link> to register.
                    </div>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRegistrations: (registrations) =>
        dispatch(loadRegistrations(registrations)),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
