import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input-reg.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Header from '../../components/header/header.component';
//----- actions needed -------
import { setCurrentUser } from '../../redux/user/user.actions';
import './registerUser.styles.scss';

const RegisterUser = ({ setCurrentUser }) => {
    const [userFullName, setUserFullName] = useState('');
    const [userGivenName, setUserGivenName] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userStreet, setUserStreet] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userState, setUserState] = useState('');
    const [userPostalCode, setUserPostalCode] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userChurchName, setUserChurchName] = useState('');
    const [userChurchCity, setUserChurchCity] = useState('');
    const [userChurchState, setUserChurchState] = useState('');

    const history = useHistory();

    const register = () => {
        console.log('stubbed registration');
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'userGivenName':
                setUserGivenName(value);
                break;
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
            case 'userPassword':
                setUserPassword(value);
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
                    <div className='register-page-title'>Registration Form</div>
                </div>
                <div className='register-wrapper'>
                    <div className='main'>
                        <div className='two'>
                            <div className='register'>
                                <h3>Create your account</h3>
                                <form id='reg-form1'>
                                    <div>
                                        <label htmlFor='userGivenName'>
                                            Name
                                        </label>
                                        <FormInput
                                            name='userGivenName'
                                            id='userGivenName'
                                            className='form-reg-input'
                                            type='userGivenName'
                                            handleChange={handleChange}
                                            value={userGivenName}
                                            size='30'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='userFullName'>
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            id='userFullName'
                                            spellCheck='false'
                                            placeholder=''
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='userEmail'>Email</label>
                                        <input
                                            type='text'
                                            id='userEmail'
                                            spellCheck='false'
                                            placeholder=''
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='userPhone'>Phone</label>
                                        <input
                                            type='text'
                                            id='userPhone'
                                            spellCheck='false'
                                            placeholder=''
                                        />
                                    </div>
                                    <div className='sep'>
                                        <span className='residence-label'>
                                            Residence
                                        </span>
                                    </div>
                                    <div>
                                        <label htmlFor='userStreet'>
                                            Street
                                        </label>
                                        <input
                                            type='text'
                                            id='userStreet'
                                            spellCheck='false'
                                            placeholder=''
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='userCity'>City</label>
                                        <input
                                            type='text'
                                            id='userCity'
                                            spellCheck='false'
                                            placeholder=''
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
                                        <input
                                            type='text'
                                            id='userPostalCode'
                                            spellCheck='false'
                                            placeholder=''
                                        />
                                    </div>
                                    <div className='sep'>
                                        <span className='church-label'>
                                            Church
                                        </span>
                                    </div>
                                    <div>
                                        <label htmlFor='userChurchName'>
                                            Church Name
                                        </label>
                                        <input
                                            type='text'
                                            id='userChurchName'
                                            spellCheck='false'
                                            placeholder=''
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='userChurchCity'>
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            id='userChurchCity'
                                            spellCheck='false'
                                            placeholder=''
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
                                        <input
                                            type='password'
                                            id='userPassword1'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='userPassword2'>
                                            Password Again
                                        </label>
                                        <input
                                            type='password'
                                            id='userPassword2'
                                        />
                                    </div>
                                    <div className='register-btn-wrapper'>
                                        <label></label>
                                        <input
                                            type='submit'
                                            value='Create Account'
                                            id='create-account-btn'
                                            className='button'
                                        />
                                    </div>
                                </form>
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
