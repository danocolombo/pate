import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.componet';

import './signin-and-signup.styles.scss';

const SignInAndSignUpPage = () => (
    <div className='signin-and-signup'>
        <SignIn />
        <SignUp />
    </div>
);

export default SignInAndSignUpPage;
