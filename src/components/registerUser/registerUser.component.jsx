import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import './registerUser.styles.scss';
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
        let EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            <div className='registeruserwrapper'>
                <div className='registerform'>
                    <form>
                        <div>
                            <label htmlFor='userName'>Username</label>
                            <input
                                type='text'
                                name='userName'
                                id='userName'
                                value={userName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='password1'>Password</label>
                            <input
                                type='password'
                                id='password1'
                                name='password1'
                                onChange={handleChange}
                                value={password1}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='password2'>Password</label>
                            <input
                                type='password'
                                id='password2'
                                name='password2'
                                onChange={handleChange}
                                value={password2}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                onChange={handleChange}
                                value={email}
                                required
                            />
                        </div>
                        <div className='registerButton'>
                            <button onClick={handleSubmitClick}>
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>
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
