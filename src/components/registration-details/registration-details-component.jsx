import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './registration-details.styles.scss';
import NumericInput from 'react-numeric-input';
const RegistrationDetails = ({ theEvent,currentUser,
    setSpinner,
    clearSpinner,
    pateSystem }) => {
    const [attendeeCount, setAttendeeCount] = useState('1');
    const util = require('util');
    const [firstName, setFirstName] = useState(currentUser?.firstName);
    const [lastName, setLastName] = useState(currentUser?.lastName);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    const [homeStreet, setHomeStreet] = useState(
        currentUser?.residence?.street
    );
    const [homeCity, setHomeCity] = useState(currentUser?.residence?.city);
    const [homeState, setHomeState] = useState(
        currentUser?.residence?.stateProv
    );
    const [homePostalCode, setHomePostalCode] = useState(
        currentUser?.residence?.postalCode
    );
    const history = useHistory();
    useEffect(() => {}, [pateSystem.showSpinner]);

    //get data ready to display
    const displayThis = theEvent?.body?.Items[0];
    console.log(
        'component.dislayThis: \n' +
            util.inspect(displayThis, { showHidden: false, depth: null })
    );
    const displayDate = () => {
        // format the date and return it
        let y = parseInt(displayThis?.eventDate.substring(0, 4));
        let m = parseInt(displayThis?.eventDate.substring(4, 6)) - 1;
        let d = parseInt(displayThis?.eventDate.substring(6, 8));
        let eventDate = new Date(y, m, d);
        let theDate = eventDate.toDateString();

        return theDate;
    };
    const displayTimes = () => {
        if (displayThis?.startTime) {
            let sTime = displayThis?.startTime.split(':');
            let eTime = displayThis?.endTime.split(':');

            let startTime = '';
            let endTime = '';
            if (parseInt(sTime[0]) < 13) {
                startTime = displayThis?.startTime;
            } else {
                let newHour = parseInt(sTime[0]) - 12;

                startTime = newHour.toString() + ':' + sTime[1];
            }
            if (parseInt(eTime[0]) < 13) {
                endTime = displayThis.endTime;
            } else {
                let newHour = parseInt(eTime[0]) - 12;
                endTime = newHour.toString() + ':' + eTime[1];
            }
            let returnValue = startTime + ' - ' + endTime;
            return returnValue;
        } else {
            return null;
        }
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastNaem':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'homeStreet':
                setHomeStreet(value);
                break;
            case 'homeCity':
                setHomeCity(value);
                break;
            case 'homeState':
                setHomeState(value);
                break;
            case 'homePostalCode':
                setHomePostalCode(value);
                break;
            default:
                break;
        }
    };
    const handleLoginClick = (e) => {
        e.preventDefault();
        history.push('/signin');
    }
    const handleRegisterClick = (e) => {
        e.preventDefault();
        history.push('/register');
    }
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <div className='eventdetailswrapper'>
                <div className='event_graphics'>
                    <img
                        className='event_image'
                        src={displayThis?.graphic}
                        alt='CR P8 Rally'
                    ></img>
                </div>
                <div className='church_info'>
                    <div className='church_name'>
                        {displayThis?.location?.name}
                    </div>
                    <div>{displayThis?.location?.street}</div>
                    <div>
                        {displayThis?.location?.city},
                        {displayThis?.location?.state}&nbsp;
                        {displayThis?.location?.postalCode}
                    </div>
                </div>
                <div className='eventdatewrapper'>
                    <div className='eventdate'>{displayDate()}</div>
                    <div className='eventdate'>{displayTimes()}</div>
                </div>
                <div className='eventmessage'>
                    <div>{displayThis?.message}</div>
                </div>
            
            <div><hr className='registerhorizontalbreak'/></div>
            <div className='formwrapper'>
                <form>
                    <div className='eventmessage'>
                        <div className='registrationoffermessage'>
                        {(currentUser.isLoggedIn) ? 
                            <>
                            <div>You can change the information, if you are registering someone else.
                            </div>
                            </>
                            :
                            <>
                            <div>You can <button className="loginbutton" onClick={handleLoginClick}>LOGIN</button> or <button className="newregisterbutton" onClick={handleRegisterClick}>SIGN-UP</button> an account to save your profile for future use.
                            </div>
                            
                            </>
                        
                        }
                    </div>
                        <div>
                            <label htmlFor='firstName'>First name</label>
                            <input
                                type='text'
                                name='firstName'
                                id='firstName'
                                value={firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='lastName'>Last name</label>
                            <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                onChange={handleChange}
                                value={lastName}
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
                        <div>
                            <label htmlFor='phone'>Telephone</label>
                            <input
                                type='text'
                                id='phone'
                                name='phone'
                                onChange={handleChange}
                                value={phone}
                                required
                            />
                        </div>
                        <div className='profilehomesection'>Address</div>
                        
                        <div className='profileaddress'>
                            <div>
                                <label htmlFor='homeStreet'>Street</label>
                                <input
                                    type='text'
                                    id='homeStreet'
                                    name='homeStreet'
                                    onChange={handleChange}
                                    value={homeStreet}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='homeCity'>City</label>
                                <input
                                    type='text'
                                    id='homeCity'
                                    name='homeCity'
                                    onChange={handleChange}
                                    value={homeCity}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='homeState'>State</label>
                                <input
                                    type='text'
                                    id='homeState'
                                    name='homeState'
                                    onChange={handleChange}
                                    value={homeState}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='homePostalCode'>
                                    Postal Code
                                </label>
                                <input
                                    type='text'
                                    id='homePostalCode'
                                    name='homePostalCode'
                                    onChange={handleChange}
                                    value={homePostalCode}
                                    required
                                />
                            </div>
                            <div className="attendeewrapper">
                                <label htmlFor='attendeeCount'>Attendees</label>
                                
                                <NumericInput min='0' max='10' value={attendeeCount} size='2'/>
                            </div>
                            <div>
                                <button className="registerbutton">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pateSystem: state.pate,
});
export default connect(mapStateToProps, {
    setSpinner,
    clearSpinner,
    
    mapDispatchToProps,
})(RegistrationDetails);
