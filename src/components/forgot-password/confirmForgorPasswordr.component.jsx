import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import { setCurrentUser } from '../../redux/user/user.actions';
import './confirmForgotPassword.styles.scss';
const ConfirmForgotPassword = ({
    setSpinner,
    setAlert,
    clearSpinner,
    pateSystem,
    id,
}) => {
    const history = useHistory();
    // variables for the form
    const [userName, setUserName] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        if (id !== '0') {
            setUserName(id);
        } else {
            setUserName('');
        }
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);

    const handleSubmitClick = (event) => {
        event.preventDefault();
        let alertPayload = {};
        if (password1 !== password2 || password1.length < 3) {
            alertPayload = {
                msg:
                    'Password Error, make sure they match.\n(minimum: 1 lowercase, 1 uppercase, a number',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        if (userName.length < 4 || confirmationCode.length < 6) {
            alertPayload = {
                msg: 'User Name and Code are required.',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        setSpinner();
        try {
            Auth.ConfirmForgotPassword(
                userName,
                password1,
                confirmationCode,
                clientInformation.id
            )
                .then((data) => {
                    alertPayload = {
                        msg: 'Your registration is verified.',
                        alertType: 'success',
                    };
                    setAlert(alertPayload);
                    history.push('/signin');
                })
                .catch((err) => {
                    switch (err.code) {
                        case 'CodeMismatchException':
                            alertPayload = {
                                msg: 'Code Mismatch\n[' + err.message + ']',
                                alertType: 'danger',
                            };
                            break;
                        case 'ExpiredCodeException':
                            alertPayload = {
                                msg: 'Code is expired\n[' + err.message + ']',
                                alertType: 'danger',
                            };
                            break;
                        case 'UsernameExistsException':
                            alertPayload = {
                                msg:
                                    'User Already Exists.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                            };
                            break;
                        case 'NotAuthorizedException':
                            alertPayload = {
                                msg:
                                    'Invalid coded provided.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                            };
                            break;
                        default:
                            alertPayload = {
                                msg:
                                    'User Validation Error.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                            };
                            break;
                    }
                    setAlert(alertPayload);
                    // window.scrollTo(0, 0);
                    clearSpinner();
                    return;
                });
        } catch (error) {
            alertPayload = {
                msg:
                    'Unexpected User Validation Error.\n[' +
                    error.message +
                    ']',
                alertType: 'danger',
            };
            console.log('error:' + error);
            window.scrollTo(0, 0);
            clearSpinner();
            return;
        }
        clearSpinner();
        // history.push('/signin');
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'code':
                setCode(value);
                break;
            default:
                break;
        }
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <div className='confirm-forgot-password-component__wrapper'>
                <div className='confirm-forgot-password-component__instructions'>
                    Check your email for a confirmation code & enter below along
                    with your new password. You will need to confirm your
                    password.
                </div>
                <div className='confirm-forgot-password-component__input-line'>
                    <div className='confirm-forgot-password-component__input-label'>
                        User Name
                    </div>
                    <div className='confirm-forgot-password-component__input-control'>
                        <input
                            type='text'
                            name='userName'
                            id='userName'
                            value={userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='confirm-forgot-password-component__input-line'>
                    <div className='confirm-forgot-password-component__input-label'>
                        Code
                    </div>
                    <div className='confirm-forgot-password-component__input-control'>
                        <input
                            type='text'
                            id='code'
                            name='code'
                            onChange={handleChange}
                            value={code}
                            required
                        />
                    </div>
                </div>
                <div className='confirm-forgot-password-component__input-line'>
                    <div className='confirm-forgot-password-component__input-label'>
                        Password
                    </div>
                    <div className='confirm-forgot-password-component__input-control'>
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
                <div className='confirm-forgot-password-component__input-line'>
                    <div className='confirm-forgot-password-component__input-label'>
                        Password
                    </div>
                    <div className='confirm-forgot-password-component__input-control'>
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
                <div className='confirm-forgot-password-component__button-wrapper'>
                    <button
                        className='confirm-forgot-password-component__confirm-button'
                        onClick={handleSubmitClick}
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    setAlert: (payload) => dispatch(setAlert(payload)),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    alerts: state.alert,
});
export default connect(mapStateToProps, {
    setSpinner,
    setAlert,
    clearSpinner,
    mapDispatchToProps,
})(ConfirmForgotPassword);
