import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
//----- actions needed -------
import { setCurrentUser } from '../../redux/user/user.actions';
import './signin.styles.scss';

const SignIn = ({ onSignIn, setCurrentUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const signIn = async () => {
        try {
            // let userDetails = {};
            await Auth.signIn(username, password);
            let currentUserInfo = {};
            let currentSession = {};
            await Auth.currentUserInfo()
            .then(u => {
                currentUserInfo = u;
                
            });
            // const util = require('util');
            // console.log('currentUserInfo:\n' + util.inspect(currentUserInfo, { showHidden: false, depth: null }));
            // console.log('))))))))))))))))))))))))))))))');
            await Auth.currentSession()
            .then(data => {
                currentSession = data;
                

            });
            // const util = require('util');
            // console.log('currentSession:\n ' + util.inspect(currentSession, { showHidden: false, depth: null }));
            await saveUser(currentUserInfo, currentSession);
            
            history.push('/');
            // onSignIn();
        } catch (error) {
            console.log('Error signing in' + error);
        }
    };
    const saveUser = async (userInfo, userSession) => {
        
        const userDetails = {
            isLoggedIn: true,
            userName: userInfo?.username,
            email: userInfo?.attributes?.email,
            phone: userInfo?.attributes?.phone_number,
            uid: userInfo?.attributes?.sub,
            jwt: userSession?.idToken?.jwtToken,
            
        };
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
    return (
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
                    label='email'
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
});
export default connect(null, mapDispatchToProps)(SignIn);
