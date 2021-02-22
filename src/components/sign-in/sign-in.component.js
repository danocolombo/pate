import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {authenticateUser} from '../../actions/cognito.actions';
// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = ({ login, isAuthenticated}) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const signInSomehow = (event) => {
        return null;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            // await auth.signInWithEmailAndPassword(email, password);
            setemail(email);
            setpassword(password);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        if(event.name == 'email')setemail(event.value);
        if(event.name == 'password')setpassword(event.value);
    };

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    handleChange={handleChange}
                    value={email}
                    label='email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <div className='buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton
                        onClick={signInSomehow}
                        isGoogleSignIn
                    >
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}
SignIn.propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { authenticateUser })(SignIn);
