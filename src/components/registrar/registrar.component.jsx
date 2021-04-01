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
    currentUser,
    pateSystem,
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
    const handleRegistrationUpdateRequest = async (e) => {
        e.preventDefault();
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
        if (attendeeCount > 10) {
            okayToProceed = false;
            fieldMessage.Attendees = 'limited to 10 per registration';
        }
        if (mealCount > attendeeCount) {
            okayToProceed = false;
            fieldMessage.Meals = 'only available to attendees';
        }

        if (!okayToProceed) {
            alert(
                'Please correct your request.\n' + JSON.stringify(fieldMessage)
            );
            return;
        }
        // now copy the original full registration record into object.

        let regPayload = pateSystem?.registration;
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

        //check if there was an edit done. If not, go back
        if (regPayload === pateSystem.registration) {
            //if this was registrar, go back to profile
            if (currentUser.uid === regPayload.rid) {
                history.push('/profile');
            } else {
                history.push('/serve');
            }
        }
        //check if numbers changed....
        let numberAdjustments = {};
        if (
            regPayload?.attendeeCount !== pateSystem?.registration?.attendeeCount
        ) {
            //determine difference
            let delta =
                regPayload.attendeeCount -
                pateSystem.registration.attendeeCount;
            numberAdjustments.registrationCount = delta.toString();
        }
        if (
            regPayload?.meal?.mealCount !==
            pateSystem?.registration?.meal?.mealCount
        ) {
            //determine difference
            let delta =
                regPayload.meal.mealCount -
                pateSystem.registration.meal.mealCount;
            numberAdjustments.mealCount = delta.toString();
        }
        if (regPayload?.attendance !== pateSystem?.registration?.attendance) {
            let delta =
                regPayload.attendance - pateSystem.registration.attendance;
            numberAdjustments.attendance = delta.toString();
        }
        if (
            regPayload?.meal?.mealsServed !==
            pateSystem?.registration?.meal?.mealsServed
        ) {
            let delta =
                regPayload.meal.mealsServed -
                pateSystem.registration.meal.mealsServed;
            numberAdjustments.mealsServed = delta.toString();
        }
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
                                                <label htmlFor='homeStateProv'>
                                                    State
                                                </label>
                                                <input
                                                    type='text'
                                                    id='homeStateProv'
                                                    name='homeStateProv'
                                                    onChange={handleChange}
                                                    value={homeStateProv}
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
                                            onClick={
                                                handleRegistrationUpdateRequest
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className='registerbutton'
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                        {currentUser?.stateLead ===
                                            pateSystem?.registration?.location
                                                ?.stateProv ||
                                        currentUser.uid ===
                                            pateSystem?.rally?.coordinator
                                                ?.id ? (
                                            <button className='registration-registrar__delete-button'>
                                                DELETE
                                            </button>
                                        ) : null}
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
