import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import AlertBox from '../../components/alert-box/alert-box.component';
import FormInput from '../../components/form-input/form-input-reg.component';
import Header from '../../components/header/header.component';
//----- actions needed -------
import { updateCurrentUser } from '../../redux/user/user.actions';
import './registerUser.styles.scss';

const ConfirmUser = ({ setCurrentUser }) => {
    const [userEmail, setUserEmail] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();

    const confirm = async () => {
        setUserEmail(document.getElementById('userEmail').value);
        setConfirmCode(document.getElementById('confirmationCode').value);

        try {
            Auth.confirmSignUp(userEmail, confirmCode)
                .then((data) => {
                    console.log('User Confirmed');
                    history.push('/signin');
                })
                .catch((err) => {
                    console.log('Yak:' + err.code);
                    if (err.code === 'CodeMismatchException') {
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
            case 'confirmationCode':
                setConfirmCode(value);
                break;
            case 'userEmail':
                setUserEmail(value);
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
                        Registration Confirmation Form
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
                                <h3>
                                    Check your email, and provide the code to
                                    confirm
                                </h3>
                                <div>
                                    <label htmlFor='userEmail'>
                                        Email Address
                                    </label>
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
                                    <label htmlFor='confirmationCode'>
                                        Code
                                    </label>
                                    <FormInput
                                        name='confirmationCode'
                                        id='confirmationCode'
                                        className='form-reg-input'
                                        type='confirmationCode'
                                        handleChange={handleChange}
                                        value={confirmCode}
                                        required
                                    />
                                </div>

                                <div className='register-btn-wrapper'>
                                    <label></label>
                                    <input
                                        type='submit'
                                        value='Send Confirmation'
                                        id='create-account-btn'
                                        onClick={confirm}
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
export default connect(null, mapDispatchToProps)(ConfirmUser);
