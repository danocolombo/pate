import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import {
    loadTempRegistration,
    clearTempRegistration,
} from '../../redux/registrations/registrations.actions';
const Registrar = ({
    regData,
    loadTempRegistration,
    clearTempRegistration,
    setSpinner,
    clearSpinner,
}) => {
    const [attendeeCount, setAttendeeCount] = useState(regData?.attendeeCount);
    const [mealCount, setMealCount] = useState(regData?.mealCount);
    const [firstName, setFirstName] = useState(regData?.registrar?.firstName);
    const [lastName, setLastName] = useState(regData?.registrar?.lastName);
    const [email, setEmail] = useState(regData?.registrar?.email);
    const [phone, setPhone] = useState(regData?.registrar?.phone);
    const [homeStreet, setHomeStreet] = useState(
        regData?.registrar?.residence?.street
    );
    const [homeCity, setHomeCity] = useState(
        regData?.registrar?.residence?.city
    );
    const [homeState, setHomeState] = useState(
        regData?.registrar?.residence?.stateProv
    );
    const [homePostalCode, setHomePostalCode] = useState(
        regData?.registrar?.residence?.postalCode
    );
    const [churchName, setChurchName] = useState(regData?.church?.name);
    const [churchCity, setChurchCity] = useState(regData?.church?.city);
    const [churchStateProv, setChurchStateProv] = useState(
        regData?.church?.stateProv
    );

    const history = useHistory();

    const handleCancel = (e) => {
        async function purgeTempReg() {
            clearTempRegistration();
        }
        purgeTempReg();
        history.push('/profile');
    };
    const handleRegisterRequest = async (e) => {
        e.preventDefault();
        // this function pulls the data together and creates
        // an object to update database.
        //========================================
        // check to see if he registration request is from
        // a logged in user. If not, set the rid to 0.

        let regDataOriginal = {
            eventDate: regData?.eventDate,
            startTime: regData?.startTime,
            endTime: regData?.endTime,
            eid: regData?.uid,
            location: {
                name: regData?.name,
                street: regData?.street,
                city: regData?.city,
                stateProv: regData?.stateProv,
                postalCode: regData?.postalCode,
            },
            church: {
                name: churchName,
                city: churchCity,
                stateProv: churchStateProv,
            },
            rid: regData?.registrar?.uid,
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
        // NEED TO UPDATE REDUX WITH ANY CHANGES
        history.push('/');
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
            case 'churchName':
                setChurchName(value);
                break;
            case 'churchCity':
                setChurchCity(value);
                break;
            case 'churchPostalCode':
                setChurchStateProv(value);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <div className='registrationpagewrapper'>
                <>
                    <div className='registrationdetailswrapper'>
                        <div>
                            <hr className='registerhorizontalbreak' />
                        </div>
                        <div className='formwrapper'>
                            <form>
                                <div className='registrar-data'>
                                    <div className='register-identity-wrapper'>
                                        <div className='register-contact-label'>
                                            Contact Information
                                        </div>
                                        <div className='register-contact-section'>
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
                                        <div className='register-address-label'>
                                            Address
                                        </div>
                                        <div className='register-address-section'>
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
                                        <div className='register-church-label'>
                                            Your Church/CR Information
                                        </div>
                                        <label htmlFor='churchName'>Name</label>
                                        <input
                                            type='text'
                                            id='churchName'
                                            name='churchName'
                                            onChange={handleChange}
                                            value={churchName}
                                            required
                                        />

                                        <div>
                                            <label htmlFor='churchCity'>
                                                City
                                            </label>
                                            <input
                                                type='text'
                                                id='churchCity'
                                                name='churchCity'
                                                onChange={handleChange}
                                                value={churchCity}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='churchStateProv'>
                                                State
                                            </label>
                                            <input
                                                type='text'
                                                id='churchStateProv'
                                                name='churchStateProv'
                                                onChange={handleChange}
                                                value={churchStateProv}
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
                                        <button
                                            className='register-button'
                                            onClick={handleRegisterRequest}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className='registerbutton'
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
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
    loadTempRegistration: (reg) => dispatch(loadTempRegistration(reg)),
    clearTempRegistration: () => dispatch(clearTempRegistration()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    registrations: state.registrations,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Registrar);
