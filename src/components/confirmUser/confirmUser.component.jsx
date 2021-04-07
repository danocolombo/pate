import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import AlertBox from '../../components/alert-box/alert-box.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import './confirmUser.styles.scss';
import { setCurrentUser } from '../../redux/user/user.actions';

const ConfirmUserDetails = ({ setSpinner, setAlert, clearSpinner, pateSystem, id }) => {
    const history = useHistory();
    // variables for the form
    const [userName, setUserName] = useState('');
    const [code, setCode] = useState('');
    // const [alertVisible, setAlertVisible] = useState(false);
    // const [alertMessage, setAlertMessage] = useState('');

    
    useEffect(() => {
        if (id !== 0){
            setUserName(id);
        }
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);

    const handleSubmitClick = (event) => {
        event.preventDefault();
        let alertPayload = {};
        setSpinner();
        try {
            Auth.confirmSignUp(id, code)
                .then((data) => {
                    alertPayload = {
                        msg: 'Your registration is verified.',
                        alertType: 'success',
                    };
                    setAlert(alertPayload);
                    history.push('/signin');
                })
                .catch((err) => {
                    let msg = null;
                    switch (err.code) {
                        case 'CodeMismatchException':
                            alertPayload = {
                                msg: 'Code Mismatch\n[' + err.message + ']',
                                alertType: 'danger',  
                            };
                            break;
                        case 'UsernameExistsException':
                            alertPayload = {
                                msg: 'User Already Exists.\n[' + err.message + ']',
                                alertType: 'danger',
                            };
                            break;
                        case 'NotAuthorizedException':
                            alertPayload = {
                                msg: 'Invalid coded provided.\n[' + err.message + ']',
                                alertType: 'danger',
                            };
                            break;
                        default:
                            alertPayload = {
                                msg: 'User Validation Error.\n[' + err.message + ']',
                                alertType: 'danger',
                            };
                            break;
                    }
                    setAlert(alertPayload);

                    // console.log(err);
                });
        } catch (error) {
            console.log('error:' + error);
        }
        clearSpinner();
        history.push('/signin');
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userName':
                setCurrentUser(value);
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
            <div className='confirmuserwrapper'>
                <div className='confirmform'>
                    <form>
                        <div className='instructions'>
                            Check your email for a confirmation code and enter
                            below to confirm your registration.
                        </div>
                        <div>
                            <label htmlFor='email'>User Name</label>
                            <input
                                type='text'
                                name='userName'
                                id='userName'
                                value={id!==0?userName:null}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='code'>Code</label>
                            <input
                                type='text'
                                id='code'
                                name='code'
                                onChange={handleChange}
                                value={code}
                                required
                            />
                        </div>
                        <div className='confirmButton'>
                            <button onClick={handleSubmitClick}>CONFIRM</button>
                        </div>
                    </form>
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
})(ConfirmUserDetails);
