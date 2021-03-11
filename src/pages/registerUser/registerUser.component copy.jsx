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
    const [userGivenName, setUserGivenName] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userStreet, setUserStreet] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userState, setUserState] = useState('');
    const [userPostalCode, setUserPostalCode] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userChurchName, setUserChurchName] = useState('');
    const [userChurchCity, setUserChurchCity] = useState('');
    const [userChurchState, setUserChurchState] = useState('');

    const history = useHistory();

    const register = () => {
        console.log('stubbed registration');
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userGivenName':
                setUserGivenName(value);
                break;
            case 'userPhoneNumber':
                setUserPhoneNumber(value);
                break;
            case 'userStreet':
                setUserStreet(value);
                break;
            case 'userCity':
                setUserCity(value);
                break;
            case 'userState':
                setUserState(value);
                break;
            case 'userPostalCode':
                setUserPostalCode(value);
                break;
            case 'userChurchName':
                setUserChurchName(value);
                break;
            case 'userChurchCity':
                setUserChurchCity(value);
                break;
            case 'userChurchState':
                setUserChurchState(value);
                break;
            case 'userEmail':
                setUserEmail(value);
                break;
            case 'userPassword':
                setUserPassword(value);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <Header />
            <div className='register-page-wrapper'>
                <div className='register-title-wrapper'>
                    <div className='register-page-title'>Registration Form</div>
                    <div className='register-page-description'>
                        This is where you get engaged...
                    </div>
                </div>
                <div className='register-wrapper'>
                    <FormInput
                        name='userGivenName'
                        className='form-component'
                        type='userGivenName'
                        handleChange={handleChange}
                        value={userGivenName}
                        size='30'
                        label='Full Name'
                        required
                    />
                    <FormInput
                        name='userStreet'
                        className='form-component'
                        type='userStreet'
                        handleChange={handleChange}
                        value={userStreet}
                        size='30'
                        label='Street Address'
                        required
                    />
                    <FormInput
                        name='userCity'
                        className='form-component'
                        type='userCity'
                        handleChange={handleChange}
                        value={userCity}
                        size='30'
                        label='City'
                        required
                    />
                    <FormInput
                        name='userState'
                        className='form-component'
                        type='userState'
                        handleChange={handleChange}
                        value={userState}
                        size='2'
                        label='State'
                        required
                    />
                    <FormInput
                        name='userPostalCode'
                        className='form-component'
                        type='userPostalCode'
                        handleChange={handleChange}
                        value={userPostalCode}
                        size='5'
                        label='Postal Code'
                        required
                    />

                    <FormInput
                        name='userPhoneNumber'
                        className='form-component'
                        type='userPhoneNumber'
                        handleChange={handleChange}
                        value={userPhoneNumber}
                        size='14'
                        label='Phone Number'
                        required
                    />
                    <FormInput
                        name='userEmail'
                        className='form-component'
                        type='userEmail'
                        handleChange={handleChange}
                        value={userEmail}
                        size='30'
                        label='Email'
                        required
                    />
                    <FormInput
                        name='userPassword'
                        className='form-component'
                        type='password'
                        value={userPassword}
                        handleChange={handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        name='userChurchName'
                        className='form-component'
                        type='userChurchName'
                        handleChange={handleChange}
                        value={userChurchName}
                        size='30'
                        label='Church Name'
                        required
                    />
                    <FormInput
                        name='userChurchCity'
                        className='form-component'
                        type='userChurchCity'
                        handleChange={handleChange}
                        value={userChurchCity}
                        size='30'
                        label='Church City'
                        required
                    />
                    <FormInput
                        name='userChurchState'
                        className='form-component'
                        type='userChurchState'
                        handleChange={handleChange}
                        value={userChurchState}
                        size='2'
                        label='Church State'
                        required
                    />
                    <div className='buttons'>
                        <CustomButton onClick={register}>
                            {' '}
                            Register{' '}
                        </CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(RegisterUser);
