import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
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
            const user = Auth.signIn(username, password);
            // const util = require('util');
            // Auth.currentAuthenticatedUser({
            //     bypassCache: false})
            //     .then(user => console.log('current....RESPONSE:\n ' +
            //     util.inspect(user, {
            //         showHidden: false,
            //         depth: null,
            //     })))
            //     .catch(err => console.log(err));

            Auth.currentSession()
                .then((data) => {
                    saveUser(data);
                })
                .catch((err) => console.log(err));

            history.push('/');
            // onSignIn();
        } catch (error) {
            console.log('Error signing in' + error);
        }
    };
    const saveUser = (userInfo) => {
        const userDetails = {
            isLoggedIn: true,
            email: userInfo.idToken.payload.email,
            cognitoId: userInfo.accessToken.payload.username,
            jwtToken: userInfo.idToken.jwtToken,
        };
        // const util = require('util');
        // console.log(
        //     'userDetails \n' +
        //         util.inspect(userDetails, { showHidden: false, depth: null })
        // );
        setCurrentUser(userDetails);
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
