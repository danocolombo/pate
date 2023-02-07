import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
import { Link, useHistory } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import Modal from '../../components/modals/wrapper.modal';
import ResetPassword from '../../components/modals/auth/reset-password.modal';
import Modal2 from '../../components/modals/wrapper.modal';
import CheckEmailModal from '../../components/modals/auth/check-email.modal';
import { printObject, createAWSUniqueID } from '../../utils/helpers';
//----- actions needed -------
import {
    loadRegistrations,
    clearTempRegistration,
} from '../../redux/registrations/registrations.actions';
import { setCurrentUser } from '../../redux/user/user.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import { createNewGQLProfile } from '../../pateGraphql/pateGraphql.provider';
import './signin.styles.scss';
import { getGQLProfile, getDDBProfile } from '../../providers/profile.provider';

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
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [modal2IsVisible, setModal2IsVisible] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] =
        useState(false);
    const [resetEmailDest, setResetEmailDest] = useState('');
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
                                    msg: 'Authentication failed. Please check your credentials',
                                    alertType: 'danger',
                                };
                                setAlert(alertPayload);
                                return;
                            });
                    } else {
                        // the user is good to go....
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
                        case 'PasswordResetRequiredException':
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
            let graphQLProfile = {};
            let newProfile = {};
            let dProfile = {};
            await Auth.currentUserInfo().then((u) => {
                currentUserInfo = u;
            });
            await Auth.currentSession().then((data) => {
                currentSession = data;
            });
            // we will get true if user is registered or false if not

            //    **********************************************
            //    get the profile information from graphql
            //    **********************************************
            const gqlProfile = await getGQLProfile(
                currentUserInfo?.attributes.sub
            );
            if (gqlProfile.status === 200) {
                graphQLProfile = gqlProfile.data;
                printObject('SIP:130-->gProfile:\n', gqlProfile.data);
            } else {
                //  *******************************************
                //      get Dynamo Profile - if necessary
                //  *******************************************
                const oldProfile = await getDDBProfile(
                    currentUserInfo?.attributes?.sub
                );
                printObject('SIP:140-->oldProfile:\n', oldProfile);
                //===========================================
                let residenceUniqueID = createAWSUniqueID();
                let userUniqueID = createAWSUniqueID();
                let affiliationUniqueID = createAWSUniqueID();
                // create residence object
                const residenceObject = {
                    id: residenceUniqueID,
                    street: oldProfile?.data?.residence?.street || '',
                    city: oldProfile?.data?.residence?.city || '',
                    stateProv: oldProfile?.data?.residence?.stateProv || '',
                    postalCode: oldProfile?.data?.residence?.postalCode,
                    latitude: '',
                    longitude: '',
                };

                const userObject = {
                    id: userUniqueID,
                    sub: currentUserInfo?.attributes.sub,
                    username: currentUserInfo.username,
                    firstName: oldProfile?.data?.firstName || '',
                    lastName: oldProfile?.data?.lastName || '',
                    email: oldProfile?.data?.email || '',
                    phone: oldProfile?.data?.phone || '',
                    divisionDefaultUsersId:
                        'fffedde6-5d5a-46f0-a3ac-882a350edc64',
                    residenceResidentsId: residenceUniqueID,
                };
                const affiliationObject = {
                    id: affiliationUniqueID,
                    role: oldProfile?.data?.role,
                    status: 'active',
                    divisionAffiliationsId:
                        'fffedde6-5d5a-46f0-a3ac-882a350edc64',
                    userAffiliationsId: userUniqueID,
                };

                const multiMutate = {
                    residence: residenceObject,
                    user: userObject,
                    affiliation: affiliationObject,
                };
                const creationResults = await createNewGQLProfile(multiMutate);
                graphQLProfile = creationResults.data;
                // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&');
                // printObject('SIP:195-->creationResults:\n', creationResults);
                // console.log('################################');
                console.log('DONE CREATING NEW USER');
            }
            //      DETERMINE USER ROLE FOR CLIENT
            async function setUserRoleValue() {
                const thisAffiliationId =
                    'fffedde6-5d5a-46f0-a3ac-882a350edc64';
                const p8RallyAffiliation =
                    graphQLProfile.affiliations.items.filter(
                        (a) => a.divisionAffiliationsId === thisAffiliationId
                    );
                if (p8RallyAffiliation) {
                    let role = '';
                    if (p8RallyAffiliation[0].status === 'active') {
                        // use the affiliation role
                        role = p8RallyAffiliation[0].role;
                    } else {
                        // set as guest
                        role = 'guest';
                    }
                    graphQLProfile = { ...graphQLProfile, role: role };
                }
                console.log('thisAffiliationId:', thisAffiliationId);
                console.log('p8RallyAffiliation:', p8RallyAffiliation);
            }
            setUserRoleValue();
            //      SET CURRENT USER = graphqQLProfile
            graphQLProfile = { ...graphQLProfile, isLoggedIn: true };
            await setCurrentUser(graphQLProfile);
            // const userIsRegistered = await saveUser(
            //     currentUserInfo,
            //     currentSession
            // );
            await getRegistrations(currentUserInfo?.attributes.sub);

            //console.log("SIP:123-->currentUserInfo:", currentUserInfo);
            //generic cleanup
            await clearTempRegistration();
            //let user know if they need to complete registration

            clearSpinner();
            //todo-gql  NEED TO DETERMINE WHAT THIS LOOKS LIKE FOR NEW USER
            // userIsRegistered ? history.push('/') : history.push('/profile');
            history.push('/');
        } catch (error) {
            switch (error) {
                case 'No current user':
                    alertPayload = {
                        msg: 'Authentication failed. Please check your credentials',
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

    // const changePassword = async () => {
    //     Auth.currentAuthenticatedUser()
    //         .then((user) => {
    //             return Auth.changePassword(user, 'oldPassword', 'newPassword');
    //         })
    //         .then((data) => console.log(data))
    //         .catch((err) => console.log(err));
    // };
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
    const composeUser = async (graphqlProfile, userInfo, userSession) => {
        await setCurrentUser(graphqlProfile);
    };
    const saveUser = async (userInfo, userSession) => {
        //get p8user data...
        //* check if there is graphql profile
        const variables = {
            id: userInfo?.attributes?.sub,
        };
        try {
            const gqlProfile = await API.graphql(
                graphqlOperation(queries.getProfileBySub, variables)
            );
            printObject('SP:216-->gqlProfile:\n', gqlProfile);
        } catch (error) {
            printObject('SP:218-->error gettng graphql data');
        }
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
                msg: 'Error fetching user: [' + error.message + ']',
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
        console.log('SIP:241--> dbUser', dbUser);
        if (dbUser === undefined) {
            // default values
            userDetails.isLoggedIn = true;
            userDetails.role = 'guest';

            // ************************************
            // web based defaults
            // ************************************
            userDetails.affiliate = 'CRP8';
            userDetails.region = 'us#east#south';
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
            // this is for the user that has p8User record
            userDetails.isLoggedIn = true;
            userDetails.affiliate =
                dbUser?.affiliations?.active?.value || 'CRP8';
            userDetails.region = dbUser?.affiliations?.active?.region;
            userDetails.role = dbUser?.affiliations?.active?.role;
            userDetails.status = dbUser?.status;
            userDetails.phone = dbUser?.phone;
            userDetails.displayName = dbUser.displayName || dbUser.firstName;
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
        //will return true if the user is registered, false if not
        //========================================
        if (dbUser?.firstName && dbUser?.lastName && dbUser?.residence?.city) {
            return true;
        } else {
            return false;
        }
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

    const handleResetPasswordRequest = async (uName) => {
        setModalIsVisible(false);
        // alert('USER WANTS TO CHANGE PASSWORD:' + uName);
        await Auth.forgotPassword(uName)
            .then((requestResponse) => {
                const util = require('util');
                console.log(
                    'forgotPassword OK - requestResponse \n' +
                        util.inspect(requestResponse, {
                            showHidden: false,
                            depth: null,
                        })
                );
                setResetEmailDest(
                    requestResponse.CodeDeliveryDetails.Destination
                );
            })
            .catch((e) => {
                const util = require('util');
                console.log(
                    'forgotPassword error (e): \n' +
                        util.inspect(e, {
                            showHidden: false,
                            depth: null,
                        })
                );
                return;
            });
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // NEED TO CALL ForgotPassword
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        setModal2IsVisible(true);
        return;
    };
    const handleResetEmailAcknowledge = () => {
        setModal2IsVisible(false);
        // alert('GOING TO NEW PASSWORD PAGE');
        history.push('/newpassword');
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
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
                                    Password
                                </div>
                                <div className='signin-page__data-control'>
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
                            <div className='signin-page__data-line'>
                                <div className='signin-page__forgot-offer'>
                                    <span
                                        onClick={() => setModalIsVisible(true)}
                                    >
                                        Forgot your password?
                                    </span>
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
                    </div>
                    <div className='signin-page__offer-box'>
                        Don't have an account?
                        <Link
                            className='signin-page__register-link'
                            to='/register'
                        >
                            {' '}
                            SIGN-UP
                        </Link>
                    </div>
                </div>
            </div>
            <MainFooter />
            <Modal isOpened={modalIsVisible}>
                <div>
                    <ResetPassword
                        userNameId={username}
                        resetDecline={() => setModalIsVisible(false)}
                        resetConfirmed={handleResetPasswordRequest}
                    />
                </div>
            </Modal>
            <Modal2 isOpened={modal2IsVisible}>
                <div>
                    <CheckEmailModal
                        emailDest={resetEmailDest}
                        acknowledged={() => handleResetEmailAcknowledge()}
                    />
                </div>
            </Modal2>
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
