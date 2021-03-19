import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
//----- actions needed -------
import { setCurrentUser } from '../../redux/user/user.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './signin.styles.scss';

const SignIn = ({
    onSignIn,
    setCurrentUser,
    setSpinner,
    clearSpinner,
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
            await Auth.signIn(username, password);
            let currentUserInfo = {};
            let currentSession = {};
            await Auth.currentUserInfo().then((u) => {
                currentUserInfo = u;
            });
            await Auth.currentSession().then((data) => {
                currentSession = data;
            });
            await saveUser(currentUserInfo, currentSession);
            clearSpinner();
            history.push('/');
        } catch (error) {
            clearSpinner();
            console.log('Error signing in' + error);
        }
    };
    const saveUser = async (userInfo, userSession) => {
        //get p8user data...

        let dbUser = {};
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
        // now we have dbUser, add it to cognito data to put in redux
        // const util = require('util');
        // console.log(
        //     'dbUser: \n' +
        //         util.inspect(dbUser, { showHidden: false, depth: null })
        // );

        let userDetails = {
            isLoggedIn: true,
            login: userInfo?.username,
            testMe: true,
            role: dbUser?.role,
            status: dbUser?.status,
            email: userInfo?.attributes?.email,
            phone: userInfo?.attributes?.phone_number,
            uid: userInfo?.attributes?.sub,
            displayName: dbUser.displayName,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            jwt: userSession?.idToken?.jwtToken,
        };
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
            <div className='signin-title-wrapper'>
                <div className='signin-page-title'>Login Page</div>
            </div>
            <div className='signin-wrapper'>
                <FormInput
                    name='username'
                    className='form-component'
                    type='username'
                    handleChange={handleChange}
                    value={username}
                    label='login'
                    required
                />
                <FormInput
                    name='password'
                    className='form-component'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <div className='buttons'>
                    <CustomButton onClick={signIn}> Sign in </CustomButton>
                </div>
                <div className='register-offer-wrapper'>
                    If you don't have an account,{' '}
                    <Link to={'/register'}>click here</Link> to register.
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
