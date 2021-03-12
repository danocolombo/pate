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
import { setCurrentUser } from '../../redux/user/user.actions';
import './registerUser.styles.scss';

const RegisterUser = ({ setCurrentUser }) => {
    const [userFullName, setUserFullName] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userStreet, setUserStreet] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userState, setUserState] = useState('');
    const [userPostalCode, setUserPostalCode] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword1, setUserPassword1] = useState('');
    const [userPassword2, setUserPassword2] = useState('');
    const [userChurchName, setUserChurchName] = useState('');
    const [userChurchCity, setUserChurchCity] = useState('');
    const [userChurchState, setUserChurchState] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const history = useHistory();

    const register = async (dispatch) => {
        console.log('stubbed registration');

        //check if user exists

        try {
            Auth.signUp({
                username: userEmail,
                password: userPassword1,
                // attributes: {
                //     phone: userPhoneNumber
                // }
            })
                .then((data) => {
                    //console.log(data);
                    confirmRegistration(data);
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

        let uState = document.getElementById('userState').value;
        console.log('user state: ' + uState);
    };
    const confirmRegistration = (userRequest) => {
        console.log('checking Cognito response...');
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userFullName':
                setUserFullName(value);
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
    // <AlertBox
    //     show={false}
    //     onClose={setAlertVisible(!alertVisible)}
    //     message={'Danger!: AlertBox'}
    //     autoClose={true}
    //     variant={'danger'}
    // />;
    return (
        <>
            <Header />
            <div className='register-page-wrapper'>
                <div className='register-title-wrapper'>
                    <div className='register-page-title'>Registration Form</div>
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
                                <h3>Create your account</h3>

                                <div>
                                    <label htmlFor='userFullName'>Name</label>
                                    <FormInput
                                        name='userFullName'
                                        id='userFullName'
                                        className='form-reg-input'
                                        type='userFullName'
                                        handleChange={handleChange}
                                        value={userFullName}
                                        required
                                    />
                                </div>
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
                                    <label htmlFor='userPhoneNumber'>
                                        Phone
                                    </label>
                                    <FormInput
                                        name='userPhoneNumber'
                                        id='userPhoneNumber'
                                        className='form-reg-input'
                                        type='userPhoneNumber'
                                        handleChange={handleChange}
                                        value={userPhoneNumber}
                                        required
                                    />
                                </div>
                                <div className='sep'>
                                    <span className='residence-label'>
                                        Residence
                                    </span>
                                </div>
                                <div>
                                    <label htmlFor='userStreet'>Street</label>
                                    <FormInput
                                        name='userStreet'
                                        id='userStreet'
                                        className='form-reg-input'
                                        type='userStreet'
                                        handleChange={handleChange}
                                        value={userStreet}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='userCity'>City</label>
                                    <FormInput
                                        name='userCity'
                                        id='userCity'
                                        className='form-reg-input'
                                        type='userCity'
                                        handleChange={handleChange}
                                        value={userCity}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='userState'>State</label>
                                    <select
                                        type='text'
                                        id='userState'
                                        spellCheck='false'
                                        placeholder=''
                                    >
                                        <option value='AK'>AK</option>
                                        <option value='AL'>AL</option>
                                        <option value='AR'>AR</option>
                                        <option value='AZ'>AZ</option>
                                        <option value='CA'>CA</option>
                                        <option value='CO'>CO</option>
                                        <option value='CT'>CT</option>
                                        <option value='DE'>DE</option>
                                        <option value='FL'>FL</option>
                                        <option value='GA'>GA</option>
                                        <option value='HI'>HI</option>
                                        <option value='IA'>IA</option>
                                        <option value='ID'>ID</option>
                                        <option value='IL'>IL</option>
                                        <option value='IN'>IN</option>
                                        <option value='KS'>KS</option>
                                        <option value='KY'>KY</option>
                                        <option value='LA'>LA</option>
                                        <option value='MA'>MA</option>
                                        <option value='MD'>MD</option>
                                        <option value='ME'>ME</option>
                                        <option value='MI'>MI</option>
                                        <option value='MN'>MN</option>
                                        <option value='MO'>MO</option>
                                        <option value='MS'>MS</option>
                                        <option value='MT'>MT</option>
                                        <option value='NC'>NC</option>
                                        <option value='ND'>ND</option>
                                        <option value='NE'>NE</option>
                                        <option value='NH'>NH</option>
                                        <option value='NJ'>NJ</option>
                                        <option value='NM'>NM</option>
                                        <option value='NV'>NV</option>
                                        <option value='NY'>NY</option>
                                        <option value='OH'>OH</option>
                                        <option value='OK'>OK</option>
                                        <option value='OR'>OR</option>
                                        <option value='PA'>PA</option>
                                        <option value='RI'>RI</option>
                                        <option value='SC'>SC</option>
                                        <option value='SD'>SD</option>
                                        <option value='TN'>TN</option>
                                        <option value='TX'>TX</option>
                                        <option value='UT'>UT</option>
                                        <option value='VA'>VA</option>
                                        <option value='VT'>VT</option>
                                        <option value='WA'>WA</option>
                                        <option value='WI'>WI</option>
                                        <option value='WV'>WV</option>
                                        <option value='WY'>WY</option>
                                        <option value='??'>OTHER</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='userPostalCode'>
                                        Postal Code
                                    </label>
                                    <FormInput
                                        name='userPostalCode'
                                        id='userPostalCode'
                                        className='form-reg-input'
                                        type='userPostalCode'
                                        handleChange={handleChange}
                                        value={userPostalCode}
                                        required
                                    />
                                </div>
                                <div className='sep'>
                                    <span className='church-label'>Church</span>
                                </div>
                                <div>
                                    <label htmlFor='userChurchName'>
                                        Church Name
                                    </label>
                                    <FormInput
                                        name='userChurchName'
                                        id='userChurchName'
                                        className='form-reg-input'
                                        type='userChurchName'
                                        handleChange={handleChange}
                                        value={userChurchName}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='userChurchCity'>City</label>
                                    <FormInput
                                        name='userChurchCity'
                                        id='userChurchCity'
                                        className='form-reg-input'
                                        type='userChurchCity'
                                        handleChange={handleChange}
                                        value={userChurchCity}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='userChurchState'>
                                        State
                                    </label>
                                    <select
                                        type='text'
                                        id='userChurchState'
                                        spellCheck='false'
                                        placeholder=''
                                    >
                                        <option value='AK'>AK</option>
                                        <option value='AL'>AL</option>
                                        <option value='AR'>AR</option>
                                        <option value='AZ'>AZ</option>
                                        <option value='CA'>CA</option>
                                        <option value='CO'>CO</option>
                                        <option value='CT'>CT</option>
                                        <option value='DE'>DE</option>
                                        <option value='FL'>FL</option>
                                        <option value='GA'>GA</option>
                                        <option value='HI'>HI</option>
                                        <option value='IA'>IA</option>
                                        <option value='ID'>ID</option>
                                        <option value='IL'>IL</option>
                                        <option value='IN'>IN</option>
                                        <option value='KS'>KS</option>
                                        <option value='KY'>KY</option>
                                        <option value='LA'>LA</option>
                                        <option value='MA'>MA</option>
                                        <option value='MD'>MD</option>
                                        <option value='ME'>ME</option>
                                        <option value='MI'>MI</option>
                                        <option value='MN'>MN</option>
                                        <option value='MO'>MO</option>
                                        <option value='MS'>MS</option>
                                        <option value='MT'>MT</option>
                                        <option value='NC'>NC</option>
                                        <option value='ND'>ND</option>
                                        <option value='NE'>NE</option>
                                        <option value='NH'>NH</option>
                                        <option value='NJ'>NJ</option>
                                        <option value='NM'>NM</option>
                                        <option value='NV'>NV</option>
                                        <option value='NY'>NY</option>
                                        <option value='OH'>OH</option>
                                        <option value='OK'>OK</option>
                                        <option value='OR'>OR</option>
                                        <option value='PA'>PA</option>
                                        <option value='RI'>RI</option>
                                        <option value='SC'>SC</option>
                                        <option value='SD'>SD</option>
                                        <option value='TN'>TN</option>
                                        <option value='TX'>TX</option>
                                        <option value='UT'>UT</option>
                                        <option value='VA'>VA</option>
                                        <option value='VT'>VT</option>
                                        <option value='WA'>WA</option>
                                        <option value='WI'>WI</option>
                                        <option value='WV'>WV</option>
                                        <option value='WY'>WY</option>
                                        <option value='??'>OTHER</option>
                                    </select>
                                </div>
                                <div className='sep'>
                                    <span className='church-label'></span>
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
                                        value='Create Account'
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
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(RegisterUser);
