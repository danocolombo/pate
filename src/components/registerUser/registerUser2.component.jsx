// registerUser.component.jsx
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import './registerUser2.styles.scss';
const RegisterUserDetails = ({
    currentUser,
    setSpinner,
    clearSpinner,
    setAlert,
    pateSystem,
}) => {
    const history = useHistory();
    // variables for the form
    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {}, [pateSystem.showSpinner]);

    const handleSubmitClick = (event) => {
        event.preventDefault();
        let alertPayload = {};
        //minimum length of login is 4 characters
        if (userName.length < 4) {
            alertPayload = {
                msg: 'Username length has to be 4 characters',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        // need to prevent user from registering emails as username
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (userName.match(regexEmail)) {
            //user name is email address
            alertPayload = {
                msg: 'Email address not supported for user name.',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }

        if (password1 !== password2) {
            alertPayload = {
                msg: 'Entered passwords need to match',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        // passwords need to be at least 8 characters
        if (password1.length < 8) {
            alertPayload = {
                msg: 'Password minimum length: 8',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        //email needs to be acceptable format
        let EMAIL_REGEX =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!EMAIL_REGEX.test(email)) {
            alertPayload = {
                msg: 'Valid email address is required.',
                alertType: 'danger',
            };
            setAlert(alertPayload);
            return;
        }
        setSpinner();
        try {
            Auth.signUp({
                username: userName,
                password: password1,
                attributes: {
                    email: email,
                },
            })
                .then((data) => {
                    let url = '/confirmUser/' + userName;
                    history.push(url);
                })
                .catch((err) => {
                    // if (err) {
                    //     err.forEach((err) => dispatch(setAlert(err.message, 'danger')));
                    // }
                    switch (err.code) {
                        case 'UsernameExistsException':
                            alertPayload = {
                                msg: err.message,
                                alertType: 'danger',
                            };
                            console.log('ERR1: err.code');
                            break;
                        case 'InvalidPasswordException':
                            alertPayload = {
                                msg:
                                    'Password does not meet requirements.\n[' +
                                    err.message +
                                    ']',
                                alertType: 'danger',
                                timeout: 10000,
                            };
                            break;
                        default:
                            alertPayload = {
                                msg:
                                    'Registration error: [' +
                                    JSON.stringify(err) +
                                    ']',
                                alertType: 'danger',
                                timeout: 10000,
                            };
                            console.log('ERR2: err.code');
                            break;
                    }
                    setAlert(alertPayload);
                });
        } catch (error) {
            alertPayload = {
                msg: 'Registration error: [' + JSON.stringify(error) + ']',
                alertType: 'danger',
            };
            console.log('error3: error.code');
            setAlert(alertPayload);
            console.log('error:' + error);
        }
        clearSpinner();
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'password1':
                setPassword1(value);
                break;
            case 'password2':
                setPassword2(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <div className='register-user-component__register-page'>
                <form
                    action={handleSubmitClick}
                    className='register-user-component__register-form'
                >
                    <h1 className='register-user-component__signup-title'>
                        Create An Account
                    </h1>
                    <label for='userName'>User Name</label>
                    <input
                        type='text'
                        id='userName'
                        name='userName'
                        value={userName}
                        onChange={handleChange}
                        required
                    />
                    <label for='password1'>Password</label>
                    <input
                        type='password'
                        id='password1'
                        name='password1'
                        value={password1}
                        onChange={handleChange}
                        required
                    />
                    <label for='password2'>Repeat Password</label>
                    <input
                        type='password'
                        id='password2'
                        name='password2'
                        value={password2}
                        onChange={handleChange}
                        required
                    />
                    <label for='email'>E-Mail</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {/* <input type='checkbox' id='agree-terms' required />
                     <label for='agree-terms'>
                        Agree to
                        <a href='./termsConditions'>Terms &amp; Conditions</a>
                    </label> */}
                    {/* <div className='register-user-component__input-line'>
                        <div className='register-user-component__input-label'>
                            Username
                        </div>
                        <div className='register-user-component__input-control'>
                            <input
                                type='text'
                                name='userName'
                                id='userName'
                                className='register-user-component__text-boxes'
                                value={userName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='register-user-component__input-line'>
                        <div className='register-user-component__input-label'>
                            Password
                        </div>
                        <div className='register-user-component__input-control'>
                            <input
                                type='password'
                                id='password1'
                                name='password1'
                                className='register-user-component__text-boxes'
                                onChange={handleChange}
                                value={password1}
                                required
                            />
                        </div>
                    </div>
                    <div className='register-user-component__input-line'>
                        <div className='register-user-component__input-label'>
                            Password
                        </div>
                        <div className='register-user-component__input-control'>
                            <input
                                type='password'
                                id='password2'
                                name='password2'
                                className='register-user-component__text-boxes'
                                onChange={handleChange}
                                value={password2}
                                required
                            />
                        </div>
                    </div>
                    <div className='register-user-component__input-line'>
                        <div className='register-user-component__input-label'>
                            Email
                        </div>
                        <div className='register-user-component__input-control'>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                className='register-user-component__email-input-control'
                                onChange={handleChange}
                                value={email}
                                required
                            />
                        </div>
                    </div> */}
                    <div className='register-user-component__button-wrapper'>
                        <button
                            className='register-user-component__register-button'
                            onClick={handleSubmitClick}
                        >
                            REGISTER
                        </button>
                    </div>
                    <div className='register-user-page__offer-confirm-box'>
                        Have you registered and need to confirm your account?
                        <Link
                            className='register-user-page__confirmation-link'
                            to='/confirmUser/0'
                        >
                            {' '}
                            Click here
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    setAlert: (payload) => dispatch(setAlert(payload)),
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
})(RegisterUserDetails);
