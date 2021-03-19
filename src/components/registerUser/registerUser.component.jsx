import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './registerUser.styles.scss';
const RegisterUserDetails = ({
    currentUser,
    setSpinner,
    clearSpinner,
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
        if (password1 !== password2) return;

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
                    let url = '/confirmUser?username=' + userName;
                    history.push(url);
                })
                .catch((err) => {
                    // if (err) {
                    //     err.forEach((err) => dispatch(setAlert(err.message, 'danger')));
                    // }
                    console.log('Yak:' + err.code);
                    if (err.code === 'UsernameExistsException') {
                        // setAlertMessage(err.message);
                        // setAlertVisible(true);
                        console.log(err.message);
                    }
                    console.log(err);
                });
        } catch (error) {
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
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
});
export default connect(mapStateToProps, {
    setSpinner,
    clearSpinner,
    mapDispatchToProps,
})(RegisterUserDetails);
