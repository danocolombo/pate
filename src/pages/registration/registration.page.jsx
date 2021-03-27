import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import './registration.styles.scss';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import { addRegistration } from '../../redux/registrations/registrations.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
const EventRegistration = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    addRegistration,
    loadRally,
}) => {
    // const [plan, setPlan] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [attendeeCount, setAttendeeCount] = useState(1);
    const [mealCount, setMealCount] = useState(0);
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
    const [theEvent, setTheEvent] = useState({});
    const history = useHistory();
    const util = require('util');
    useEffect(() => {
        let id = match.params.id;
        //need to determine if the first 3 digits are REG, which
        //means that the request is to get a registration already
        //saved.
        let regCheck = '';

        if (id.length > 3) {
            regCheck = id.substring(0, 3);
            if (regCheck === 'REG') {
                id = id.slice(3);
                setIsEdit(true);
            }
            // const regCheck = id.subString(0,3);
            // console.log("check:" + regCheck);
            async function getTheEvent() {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getEvent',
                            payload: {
                                uid: id,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const details = data?.body?.Items[0];
                        loadRally(details);
                        setTheEvent({ ...theEvent, details });
                    });
            }
            getTheEvent();
            // async function rallyToRedux() {loadRally(theEvent);}
            // rallyToRedux();
            console.log('isEdit: ' + isEdit);
        }
    }, []);

    useEffect(() => {}, [pateSystem.showSpinner]);
    const displayDate = () => {
        // format the date and return it
        if (theEvent.length > 0) {
            let y = parseInt(theEvent?.details?.eventDate.substring(0, 4));
            let m = parseInt(theEvent?.details?.eventDate.substring(4, 6)) - 1;
            let d = parseInt(theEvent?.details?.eventDate.substring(6, 8));
            let eventDate = new Date(y, m, d);
            let theDate = eventDate.toDateString();
            return theDate;
        }
        return null;
    };
    const displayTimes = () => {
        if (theEvent?.details?.startTime) {
            let sTime = theEvent?.details?.startTime.split(':');
            let eTime = theEvent?.details?.endTime.split(':');

            let startTime = '';
            let endTime = '';
            if (parseInt(sTime[0]) < 13) {
                startTime = theEvent?.details?.startTime;
            } else {
                let newHour = parseInt(sTime[0]) - 12;

                startTime = newHour.toString() + ':' + sTime[1];
            }
            if (parseInt(eTime[0]) < 13) {
                endTime = theEvent?.details?.endTime;
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
            case 'lastName':
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
            case 'attendeeCount':
                setAttendeeCount(value);
                break;
            case 'mealCount':
                setMealCount(value);
                break;
            default:
                break;
        }
    };
    const handleLoginClick = (e) => {
        e.preventDefault();
        history.push('/signin');
    };
    const handleRegisterClick = (e) => {
        e.preventDefault();
        history.push('/register');
    };
    const handleRegisterRequest = async (e) => {
        e.preventDefault();
        // this function pulls the data together and creates
        // an object to update database.
        //========================================
        // check to see if he registration request is from
        // a logged in user. If not, set the rid to 0.
        let registrarId = '0';
        if (currentUser?.isLoggedIn) {
            registrarId = currentUser.uid;
        }

        let regData = {
            eventDate: theEvent?.details?.eventDate,
            startTime: theEvent?.details?.startTime,
            endTime: theEvent?.details?.endTime,
            eid: theEvent?.details?.uid,
            location: {
                name: theEvent?.details?.name,
                street: theEvent?.details?.street,
                city: theEvent?.details?.city,
                stateProv: theEvent?.details?.stateProv,
                postalCode: theEvent?.details?.postalCode,
            },
            rid: registrarId,
            registrar: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                residence: {
                    street: homeStreet,
                    city: homeCity,
                    stateProv: homeState,
                    postalCode: homePostalCode,
                },
            },
            attendeeCount: attendeeCount,
            mealCount: mealCount,
        };
        // const util = require('util');
        // console.log(
        //     'regData: \n' +
        //         util.inspect(regData, { showHidden: false, depth: null })
        // );

        // post the registration to API and return to /
        //====================================================
        // async function updateDb() {
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'createRegistration',
                    payload: {
                        Item: regData,
                    },
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                const util = require('util');
                console.log(
                    'db data returned: \n' +
                        util.inspect(data, {
                            showHidden: false,
                            depth: null,
                        })
                );
                // if (registrarId !== '0') {
                //     addRegistration(regData);
                // }
            });

        //=====================================
        // add the registration to redux
        //=====================================
        // if (registrarId !== '0') {
        //     await addRegistration(regData);
        // }
        if (currentUser?.isLoggedIn) {
            await addRegistration(theEvent.details);
        }
        history.push('/');
    };
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='registrationpagewrapper'>
                <div className='registration-pageheader'>REGISTRATION</div>
                <>
                    <div className='registrationdetailswrapper'>
                        <div className='event_graphics'>
                            <img
                                className='eventimage'
                                src={theEvent?.details?.graphic}
                                alt='CR P8 Rally'
                            ></img>
                        </div>
                        {/* border-box layout for date & time */}
                        {/* FLOAT LEFT */}
                        <div className='eventbox' id='eventbox-location'>
                            <div className='registrationchurchname'>
                                {theEvent?.details?.name}
                            </div>
                            <div>{theEvent?.street}</div>
                            <div>
                                {theEvent?.details?.city},
                                {theEvent?.details?.state}&nbsp;
                                {theEvent?.details?.postalCode}
                            </div>
                        </div>
                        {/* FLOAT RIGHT */}
                        <div className='eventbox' id='eventbox-datetime'>
                            <div className='eventdate'>{displayDate()}</div>
                            <div className='eventtime'>{displayTimes()}</div>
                        </div>
                        {/* end border-box layout */}
                        <div className='eventboxclear'></div>
                        <div className='registrationmessage'>
                            <div>{theEvent?.details?.message}</div>
                        </div>

                        <div>
                            <hr className='registerhorizontalbreak' />
                        </div>
                        <div className='formwrapper'>
                            <form>
                                <div className='registrar-data'>
                                    <div className='registration-instructions'>
                                        {currentUser?.isLoggedIn ? (
                                            <>
                                                <div>
                                                    You can change the
                                                    information, if you are
                                                    registering someone else.
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    You can{' '}
                                                    <button
                                                        className='loginbutton'
                                                        onClick={
                                                            handleLoginClick
                                                        }
                                                    >
                                                        LOGIN
                                                    </button>{' '}
                                                    or{' '}
                                                    <button
                                                        className='newregisterbutton'
                                                        onClick={
                                                            handleRegisterClick
                                                        }
                                                    >
                                                        SIGN-UP
                                                    </button>{' '}
                                                    an account to save your
                                                    profile for future use.
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='profilehomesection'>
                                        Contact Information
                                    </div>
                                    <div className='attendee-identity-wrapper'>
                                        <div>
                                            <label htmlFor='firstName'>
                                                First name
                                            </label>
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
                                            <label htmlFor='lastName'>
                                                Last name
                                            </label>
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
                                            <label htmlFor='email'>
                                                E-mail
                                            </label>
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
                                            <label htmlFor='phone'>
                                                Telephone
                                            </label>
                                            <input
                                                type='text'
                                                id='phone'
                                                name='phone'
                                                onChange={handleChange}
                                                value={phone}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='profilehomesection'>
                                        Address
                                    </div>

                                    <div className='attendee-address-wrapper'>
                                        <div>
                                            <label htmlFor='homeStreet'>
                                                Street
                                            </label>
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
                                            <label htmlFor='homeCity'>
                                                City
                                            </label>
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
                                            <label htmlFor='homeState'>
                                                State
                                            </label>
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
                                    </div>
                                    <div className='attendeewrapper'>
                                        <label
                                            className='attendee-label'
                                            htmlFor='attendeeCount'
                                        >
                                            Attendees
                                        </label>
                                        <input
                                            type='number'
                                            className='attendee-count-component'
                                            id='attendeeCount'
                                            name='attendeeCount'
                                            onChange={handleChange}
                                            value={attendeeCount}
                                            required
                                        />
                                        {/*<NumericInput min='0' max='10' value={attendeeCount} size='2'/>*/}
                                    </div>

                                    <div className='meal-wrapper'>
                                        <p className='meal-description-label'>
                                            This particular event offers a
                                            "free" lunch at 12 noon, please
                                            indicate how many will attend the
                                            lunch.
                                        </p>
                                        <label
                                            className='meal-count-label'
                                            htmlFor='mealCount'
                                        >
                                            Meal Guests
                                        </label>

                                        <input
                                            type='number'
                                            className='meal-count-component'
                                            id='mealCount'
                                            name='mealCount'
                                            onChange={handleChange}
                                            value={mealCount}
                                            required
                                        />
                                    </div>
                                    <div>
                                        {isEdit ? (
                                            <>
                                            <button
                                                className='registerbutton'
                                                onClick={handleRegisterRequest}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className='registerbutton'
                                                onClick={() => history.push('/profile')}
                                            >
                                                Cancel
                                            </button>
                                            </>
                                            
                                        ):(
                                            <button
                                                className='registerbutton'
                                                onClick={handleRegisterRequest}
                                            >
                                                Register
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    addRegistration: (registration) => dispatch(addRegistration(registration)),
    loadRally: (rally) => dispatch(loadRally(rally)),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EventRegistration);
