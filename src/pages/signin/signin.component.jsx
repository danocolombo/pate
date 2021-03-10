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

const SignIn = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState('');
    const history = useHistory();

    const signIn = async () => {
        try {
            let userDetails = {};
            const user = Auth.signIn(username, password);
            const util = require('util');
            // Auth.currentAuthenticatedUser({
            //     bypassCache: false})
            //     .then(user => console.log('current....RESPONSE:\n ' +
            //     util.inspect(user, {
            //         showHidden: false,
            //         depth: null,
            //     })))
            //     .catch(err => console.log(err));
            Auth.currentAuthenticatedUser({
                bypassCache: false})
                .then(user => console.log('username:\n ' +
                user.username))
                .catch(err => console.log(err));

            console.log('userDetails.username: ' + userDetails.username);
            history.push('/');
            // onSignIn();
        } catch (error) {
            console.log('Error signing in' + error);
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
    return (
        <>
            <Header />
            <h2>test</h2>
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
            </div>
        </>
    );
};
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch.setCurrentUser(user)
});
export default connect(null, mapDispatchToProps)(SignIn);
