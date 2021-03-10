import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
//----- actions needed -------
import { setCurrentUser } from '../../redux/user/user.actions';
import './registerUser.styles.scss';

const RegisterUser = ({ setCurrentUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const register = () => {
        console.log('stubbed registration');
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
            <div className='register-title-wrapper'>
                <div className='register-page-title'>Registration Form</div>
                <div className='register-page-description'>
                    This is where you get engaged...
                </div>
            </div>
            <div className='register-wrapper'>
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
                    <CustomButton onClick={register}> Register </CustomButton>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(RegisterUser);
