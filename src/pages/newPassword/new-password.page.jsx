import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import Modal from '../../components/modals/wrapper.modal';
import ChangeEmailModal from '../../components/modals/auth/password-changed.modal';
//----- actions needed -------
// import {
//     loadRegistrations,
//     clearTempRegistration,
// } from '../../redux/registrations/registrations.actions';
// import { setCurrentUser } from '../../redux/user/user.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import './new-password.styles.scss';

const NewPassword = ({ setAlert, clearSpinner, setSpinner }) => {
    const [showChangedPasswordModal, setShowChangePasswordModal] = useState(
        false
    );
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const history = useHistory();
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password1':
                setPassword1(value);
                break;
            case 'password2':
                setPassword2(value);
                break;
            case 'confirmationCode':
                setConfirmationCode(value);
                break;
            default:
                break;
        }
    };
    const handleAcknowledge = () => {
        setShowChangePasswordModal(false);
        history.push('/signin');
        return;
    };
    const handleChangePassword = async () => {
        let alertPayload = {};
        //first thing, we need to make sure that the
        //password1 matches password2
        if (password1 !== password2) {
            alertPayload = {
                msg: 'Passwords do not match. Please try again',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        setSpinner();
        await Auth.forgotPasswordSubmit(username, confirmationCode, password1)
            .then((requestResponse) => {
                const util = require('util');
                console.log(
                    'ConfirmForgotPassword OK - requestResponse \n' +
                        util.inspect(requestResponse, {
                            showHidden: false,
                            depth: null,
                        })
                );
            })
            .catch((e) => {
                const util = require('util');
                console.log(
                    'forgotPasswordSubmit error (e): \n' +
                        util.inspect(e, {
                            showHidden: false,
                            depth: null,
                        })
                );
                alertPayload = {
                    msg: 'Error resetting password\n',
                    alertType: 'danger',
                };
                setAlert(alertPayload);
                return;
            });
        clearSpinner();
        setShowChangePasswordModal(true);
    };

    return (
        <>
            <Header />
            <div className='signin-page__page-frame'>
                <div className='signin-page__content-wrapper'>
                    <div className='signin-page__content-box'>
                        <div className='signin-page__section-title'>LOGIN</div>
                        <div className='signin-page__section-box'>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    Username
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='text'
                                        name='username'
                                        id='username'
                                        value={username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    New Password
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='password'
                                        id='password1'
                                        name='password1'
                                        onChange={handleChange}
                                        value={password1}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    Repeat Password
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='password'
                                        id='password2'
                                        name='password2'
                                        onChange={handleChange}
                                        value={password2}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__data-line'>
                                <div className='signin-page__data-label'>
                                    Code
                                </div>
                                <div className='signin-page__data-control'>
                                    <input
                                        type='text'
                                        id='confirmationCode'
                                        name='confirmationCode'
                                        onChange={handleChange}
                                        value={confirmationCode}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='signin-page__button-wrapper'>
                                <CustomButton
                                    onClick={handleChangePassword}
                                    className='signin-page__signin-button'
                                >
                                    {' '}
                                    Change It{' '}
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter />
            <Modal isOpened={showChangedPasswordModal}>
                <div>
                    <ChangeEmailModal
                        acknowledged={() => handleAcknowledge()}
                    />
                </div>
            </Modal>
            {/*
            <ResetPasswordModal isOpened={showForgotPasswordModal}>
                <ResetPasswordMessage onClose={() => resetPasswordResponse()} />
            </ResetPasswordModal>
            */}
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    setAlert: (payload) => dispatch(setAlert(payload)),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    alerts: state.alert,
});
export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
