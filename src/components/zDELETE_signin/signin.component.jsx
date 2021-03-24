import React, { useState } from 'react';
import { Auth, signInButton } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './signin.styles.scss';

const SignIn = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = async () => {
        try {
            const user = Auth.signIn(username, password);
            const util = require('util');
            console.log(
                'user: ' +
                    util.inspect(user, {
                        showHidden: false,
                        depth: null,
                    })
            );

            history.push('/');
            onSignIn();
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
        <div className='signin-page-wrapper'>
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
    );
};

export default SignIn;
