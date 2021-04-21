import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import {
    loadTempRegistration,
    clearTempRegistration,
    removeRegistration,
} from '../../redux/registrations/registrations.actions';
import PhoneInput from 'react-phone-input-2';
import './registrar.styles.scss';
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';
const Registrar = ({
    regData,
    currentUser,
    pateSystem,
    loadTempRegistration,
    clearTempRegistration,
    setSpinner,
    setAlert,
    clearSpinner,
}) => {
    const [attendeeCount, setAttendeeCount] = useState(regData?.attendeeCount);
    const [mealCount, setMealCount] = useState(
        regData?.mealCount ? regData.mealCount : 0
    );
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
    const [homeStateProv, setHomeStateProv] = useState(
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
    const handleDelete = async (e) => {
        e.preventDefault();
        setSpinner();

        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'deleteRegistration',
                    payload: {
                        Key: { uid: regData.uid },
                    },
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // const util = require('util');
                // console.log(
                //     'db data returned: \n' +
                //         util.inspect(data, {
                //             showHidden: false,
                //             depth: null,
                //         })
                // );
            });
        //-------------------------
        // reduce event numbers.
        //-------------------------
        let eventUpdate = {
            uid: regData.eid,
            adjustments: {
                registrationCount: regData.attendeeCount * -1,
            },
        };
        const mCount = parseInt(regData.mealCount, 10) * -1;
        if (mCount !== 0) {
            eventUpdate.adjustments.mealCount = mCount;
        }
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'maintainNumbers',
                    payload: eventUpdate,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log('maintainEventNumbers successful');
            });

        //remove the redux reference to the event
        await removeRegistration(regData.uid);
        //??????
        // may need to reload stateRep & stateLead redux
        //??????
        clearSpinner();
        alert('REGISTRATION CANCELLED');
        history.push('/');
    };
    const handleRegistrationUpdateRequest = async (e) => {
        e.preventDefault();
        let oldAttendanceCount = 0;
        oldAttendanceCount = parseInt(pateSystem?.registration?.attendeeCount);
        let oldMealCount = 0;
        oldMealCount = parseInt(pateSystem?.registration?.mealCount, 10);
        console.log('oldReg.mealCount: ' + oldMealCount);
        // this function pulls the data together and creates
        // an object to update database.
        //========================================
        // first make sure all the required fields are
        // not blanked out upon edit request.
        //-------------------------------------------
        let fieldMessage = {};
        let okayToProceed = true;
        if (firstName.length < 2) {
            okayToProceed = false;
            fieldMessage.First_Name = 'is required';
        }
        if (lastName.length < 2) {
            okayToProceed = false;
            fieldMessage.Last_Name = 'is required';
        }
        if (email.length < 10) {
            okayToProceed = false;
            fieldMessage.Email = 'is required';
        }
        if (phone.length < 10) {
            okayToProceed = false;
            fieldMessage.Phone = 'is required';
        }
        if (homeStreet.length < 5) {
            okayToProceed = false;
            fieldMessage.Home_Street = 'is required';
        }
        if (homeCity.length < 2) {
            okayToProceed = false;
            fieldMessage.City = 'is required';
        }
        if (homeStateProv.length < 2) {
            okayToProceed = false;
            fieldMessage.Home_State = 'is required';
        }
        if (homePostalCode.length < 5) {
            okayToProceed = false;
            fieldMessage.Postal_Code = 'is required';
        }
        if (churchName.length < 5) {
            okayToProceed = false;
            fieldMessage.Church_Name = 'is required';
        }
        if (churchCity.length < 3) {
            okayToProceed = false;
            fieldMessage.Church_City = 'is required';
        }
        if (churchStateProv.length < 2) {
            okayToProceed = false;
            fieldMessage.Church_State = 'is required';
        }
        let attendeeNumber = parseInt(attendeeCount);
        if (isNaN(attendeeNumber)) {
            okayToProceed = false;
            fieldMessage.AttendeeValue = 'value has to be a number';
        } else {
            if (attendeeCount > 10) {
                okayToProceed = false;
                fieldMessage.Attendees = 'limited to 10 per registration';
            }
        }
        let mealNumber = parseInt(mealCount);
        if (isNaN(mealNumber)) {
            okayToProceed = false;
            fieldMessage.MealsValue = 'value has to be a number';
        } else {
            if (mealCount > attendeeCount) {
                okayToProceed = false;
                fieldMessage.Meals = 'only available to attendees';
            }
        }

        if (!okayToProceed) {
            alert(
                'Please correct your request.\n' + JSON.stringify(fieldMessage)
            );
            let msg =
                'Please correct your request.\n' + JSON.stringify(fieldMessage);
            setAlert(msg, 'danger');
            return;
        }
        // now copy the original full registration record into object.

        let regPayload = {};
        regPayload = Object.assign(pateSystem?.registration);

        //update with latest data...
        regPayload.registrar.firstName = firstName;
        regPayload.registrar.lastName = lastName;
        regPayload.registrar.phone = phone;
        regPayload.registrar.email = email;
        regPayload.registrar.residence.street = homeStreet;
        regPayload.registrar.residence.city = homeCity;
        regPayload.registrar.residence.stateProv = homeStateProv;
        regPayload.registrar.residence.postalCode = homePostalCode;
        regPayload.church.name = churchName;
        regPayload.church.city = churchCity;
        regPayload.church.stateProv = churchStateProv;
        regPayload.attendeeCount = attendeeCount;
        regPayload.mealCount = mealCount;

        //check if numbers changed....
        let numberAdjustments = {};
        let numbersNeedUpdating = false;
        if (attendeeNumber !== oldAttendanceCount) {
            //determine difference
            numbersNeedUpdating = true;
            let delta = attendeeNumber - oldAttendanceCount;
            numberAdjustments.registrationCount = delta;
        }
        if (mealNumber !== oldMealCount) {
            //determine difference
            numbersNeedUpdating = true;
            let delta = mealNumber - oldMealCount;
            numberAdjustments.mealCount = delta;
        }
        if (numbersNeedUpdating) {
            /****************** 
                "request": {
                    "uid": "65ff55fb33fe4c0447b086188f2e9b1g",
                    "adjustments": {
                        "registrationCount": "2",
                        "mealCount": "2",
                        "attendance": "0",
                        "mealsServed": "0",
                    }
                }
            ********************/
            let numUpdate = {
                uid: regPayload?.eid,
                adjustments: numberAdjustments,
            };
            const util = require('util');
            console.log(
                'numUpdate: \n' +
                    util.inspect(numUpdate, { showHidden: false, depth: null })
            );
            console.log('going to update numbers');
            await fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'maintainNumbers',
                        payload: numUpdate,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log('maintainEventNumbers successful');
                });
        }
        // post the registration to API and return to /
        //====================================================
        // async function updateDb() {
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'updateRegistration',
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
                // const util = require('util');
                // console.log(
                //     'db data returned: \n' +
                //         util.inspect(data, {
                //             showHidden: false,
                //             depth: null,
                //         })
                // );
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
            case 'homeStateProv':
                setHomeStateProv(value);
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
            <div className='registration-page__wrapper'>
                <div className='registrar-component__form-box'>
                    <div className='registration-page__header'>
                        REGISTRATION
                    </div>
                    <div className='registration-page__section-header'>
                        Contact Information
                    </div>
                    <div className='registration-page__data-input-box'>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                First Name
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    name='firstName'
                                    id='firstName'
                                    value={firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                Last Name
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    onChange={handleChange}
                                    value={lastName}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                Email
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    id='email'
                                    name='email'
                                    onChange={handleChange}
                                    value={email}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                Phone
                            </div>
                            <div className='registration-page__input-control'>
                                <PhoneInput
                                    onlyCountries={['us']}
                                    country='us'
                                    placeholder='(702) 123-4567'
                                    disableCountryCode
                                    disableDropdown
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                    inputProps={{
                                        // name: 'phone',
                                        required: true,
                                        placeholder: '(XXX) XXX-XXXX',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='registration-page__section-header'>
                        Address
                    </div>
                    <div className='registration-page__data-input-box'>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                Street
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    id='homeStreet'
                                    name='homeStreet'
                                    onChange={handleChange}
                                    value={homeStreet}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                City
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    id='homeCity'
                                    name='homeCity'
                                    onChange={handleChange}
                                    value={homeCity}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                State
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    id='homeStateProv'
                                    name='homeStateProv'
                                    onChange={handleChange}
                                    value={homeStateProv}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                Zipcode
                            </div>
                            <div className='registration-page__input-control'>
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
                    </div>
                    <div className='registration-page__section-header'>
                        Your CR Info
                    </div>
                    <div className='registration-page__data-input-box'>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                Church
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    id='churchName'
                                    name='churchName'
                                    onChange={handleChange}
                                    value={churchName}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                City
                            </div>
                            <div className='registration-page__input-control'>
                                <input
                                    type='text'
                                    id='churchCity'
                                    name='churchCity'
                                    onChange={handleChange}
                                    value={churchCity}
                                    required
                                />
                            </div>
                        </div>
                        <div className='registration-page__input-line'>
                            <div className='registration-page__input-label'>
                                State
                            </div>
                            <div className='registration-page__input-control'>
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
                    </div>
                    <div className='registration-page__section-header'>
                        Attendance Info
                    </div>
                    <div className='registration-component__data-input-box'>
                        <div className='registrar-component__attendance-input-line'>
                            <div className='registrar-component__attendance-input-label'>
                                Attendance
                            </div>
                            <div className='registrar-component__attendance-input-control'>
                                <input
                                    type='number'
                                    className='attendee-count-component'
                                    id='attendeeCount'
                                    name='attendeeCount'
                                    onChange={handleChange}
                                    value={attendeeCount}
                                    min='0'
                                    step='1'
                                    max='10'
                                    required
                                />
                            </div>
                            {/*<NumericInput min='0' max='10' value={attendeeCount} size='2'/>*/}
                        </div>
                        <div className='registrar-component__attendance-input-line'>
                            <div className='registrar-component__attendance-input-label'>
                                Meal
                            </div>
                            <div className='registrar-component__attendance-input-control'>
                                <input
                                    type='number'
                                    className='meal-count-component'
                                    id='mealCount'
                                    name='mealCount'
                                    onChange={handleChange}
                                    value={mealCount}
                                    min='0'
                                    step='1'
                                    max='10'
                                    required
                                />
                            </div>
                            {/*<NumericInput min='0' max='10' value={attendeeCount} size='2'/>*/}
                        </div>
                    </div>
                    <div className='registrar-component_button-wrapper'>
                        <button
                            className='registrar-component_button-register'
                            onClick={handleRegistrationUpdateRequest}
                        >
                            Update
                        </button>
                        <button
                            className='registrar-component_button-cancel'
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        {currentUser?.stateLead ===
                            pateSystem?.registration?.location?.stateProv ||
                        currentUser?.uid ===
                            pateSystem?.rally?.coordinator?.id ? (
                            <button
                                className='registrar-component_button-delete'
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
    clearSpinner: () => dispatch(clearSpinner()),
    loadTempRegistration: (reg) => dispatch(loadTempRegistration(reg)),
    clearTempRegistration: () => dispatch(clearTempRegistration()),
    removeRegistration: (reg) => dispatch(removeRegistration(reg)),
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
