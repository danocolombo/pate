import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './confirmUser.styles.scss';

const ConfirmUserDetails = ({ setSpinner, clearSpinner, pateSystem, id }) => {
    const history = useHistory();
    // variables for the form
    const [code, setCode] = useState('');
    useEffect(() => {}, [pateSystem.showSpinner]);

    const handleSubmitClick = (event) => {
        event.preventDefault();

        setSpinner();
        try {
            Auth.confirmSignUp(id, code)
                .then((data) => {
                    history.push('/profile');
                })
                .catch((err) => {
                    console.log('Yak:' + err.code);
                    if (err.code === 'CodeMismatchException') {
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
                                value={id}
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
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
});
export default connect(mapStateToProps, {
    setSpinner,
    clearSpinner,
    mapDispatchToProps,
})(ConfirmUserDetails);
