import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import AlertBox from '../../components/alert-box/alert-box.component';
//import { setAlert } from '../../redux/alert/alert.actions';
import FormInput from '../../components/form-input/form-input-reg.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
//----- actions needed -------
import { updateCurrentUser } from '../../redux/user/user.actions';
import './registerUser.styles.scss';

const RegisterUser = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword1, setUserPassword1] = useState('');
    const [userPassword2, setUserPassword2] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const history = useHistory();

    const register = async (dispatch) => {
        console.log('stubbed registration');
        try {
            Auth.signUp({
                username: userEmail,
                password: userPassword1,
            })
                .then((data) => {
                    let url = '/confirmUser?email=' + userEmail;
                    history.push(url);
                })
                .catch((err) => {
                    // if (err) {
                    //     err.forEach((err) => dispatch(setAlert(err.message, 'danger')));
                    // }
                    console.log('Yak:' + err.code);
                    if (err.code === 'UsernameExistsException') {
                        setAlertMessage(err.message);
                        setAlertVisible(true);
                        console.log(err.message);
                    }
                    console.log(err);
                });
        } catch (error) {
            console.log('error:' + error);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userEmail':
                setUserEmail(value);
                break;
            case 'userPassword1':
                setUserPassword1(value);
                break;
            case 'userPassword2':
                setUserPassword2(value);
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
                    <div className='register-page-title'>
                        Registration Email Account
                    </div>
                </div>
                <AlertBox
                    show={alertVisible}
                    /*onClose={this.onChange}*/
                    message={alertMessage}
                    autoClose={false}
                />
                <div className='register-wrapper'>
                    <div className='main'>
                        <div className='two'>
                            <div className='register'>
                                <h3>Register Your Email</h3>
                                <div>
                                    <label htmlFor='userEmail'>Email</label>
                                    <FormInput
                                        name='userEmail'
                                        id='userEmail'
                                        className='form-reg-input'
                                        type='userEmail'
                                        handleChange={handleChange}
                                        value={userEmail}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='userPassword1'>
                                        Password
                                    </label>
                                    <FormInput
                                        name='userPassword1'
                                        id='userPassword1'
                                        className='form-reg-input'
                                        type='password'
                                        handleChange={handleChange}
                                        value={userPassword1}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='userPassword2'>
                                        Password Again
                                    </label>
                                    <FormInput
                                        name='userPassword2'
                                        id='userPassword2'
                                        className='form-reg-input'
                                        type='password'
                                        handleChange={handleChange}
                                        value={userPassword2}
                                        required
                                    />
                                </div>
                                <div className='register-btn-wrapper'>
                                    <label></label>
                                    <input
                                        type='submit'
                                        value='Register Email'
                                        id='create-account-btn'
                                        onClick={register}
                                        className='button'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(RegisterUser);
