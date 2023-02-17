import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { API, graphqlOperation, input } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
import { withRouter } from 'react-router';
import { FaLock } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import SuccessModal from '../../components/modals/registration/registration-cancelled.modal';
import SuccessMessage from '../../components/modals/registration/registration-cancelled-msg.component';
import {
    loadTempRegistration,
    clearTempRegistration,
    removeRegistration,
} from '../../redux/registrations/registrations.actions';
import PhoneInput from 'react-phone-input-2';
import { printObject } from '../../utils/helpers';
import SelectStateProv from '../../components/state-prov/select-stateProv.component';
import './registrar.styles.scss';
// import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';
const Registrar = ({
    registration,
    currentUser,
    pateSystem,
    loadTempRegistration,
    clearTempRegistration,
    setSpinner,
    setAlert,
    clearSpinner,
}) => {
    printObject('RC:31=->registration:\n', registration);

    const [showRegistrationCancelled, setShowRegistrationCancelled] =
        useState(false);
    const [mealsLocked, setMealsLocked] = useState(true);
    const [attendeeCount, setAttendeeCount] = useState(
        registration?.attendanceCount || '0'
    );
    const [mealCount, setMealCount] = useState(
        registration?.mealCount ? registration.mealCount : 0
    );
    const [firstName, setFirstName] = useState(
        registration?.registrar?.firstName
    );
    const [lastName, setLastName] = useState(registration?.registrar?.lastName);
    const [email, setEmail] = useState(registration?.registrar?.email);
    const [phone, setPhone] = useState(registration?.registrar?.phone);
    const [homeStreet, setHomeStreet] = useState(
        registration?.registrar?.residence?.street
    );
    const [homeCity, setHomeCity] = useState(
        registration?.registrar?.residence?.city
    );
    const [homeStateProv, setHomeStateProv] = useState(
        registration?.registrar?.residence?.stateProv
    );
    const [homePostalCode, setHomePostalCode] = useState(
        registration?.registrar?.residence?.postalCode
    );
    const [churchName, setChurchName] = useState(registration?.church?.name);
    const [churchCity, setChurchCity] = useState(registration?.church?.city);
    const [churchStateProv, setChurchStateProv] = useState(
        registration?.church?.stateProv
    );

    const history = useHistory();
    useEffect(() => {}, []);
    // useEffect(() => {
    //     async function fetchRegistration() {
    //         const variables = {
    //             id: registrationId,
    //         };
    //         try {
    //             const gqlResponse = await API.graphql(
    //                 graphqlOperation(queries.getRegistration, variables)
    //             );
    //             if (gqlResponse.data.getRegistration) {
    //                 setRegistractionDetails(gqlResponse.data.getRegistration);
    //                 const details = gqlResponse.data.getRegistration;
    //                 printObject('RC:86-->details:\n', details);
    //             }
    //         } catch (error) {
    //             printObject('rc:85-->error gettng graphql data');
    //         }
    //     }
    //     fetchRegistration();

    //     areMealsLocked() ? setMealsLocked(true) : setMealsLocked(false);
    // }, []);
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

        // await fetch(
        //     'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             operation: 'deleteRegistration',
        //             payload: {
        //                 Key: { uid: theRegistration.event.id },
        //             },
        //         }),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // const util = require('util');
        //         // console.log(
        //         //     'db data returned: \n' +
        //         //         util.inspect(data, {
        //         //             showHidden: false,
        //         //             depth: null,
        //         //         })
        //         // );
        //     });
        //-------------------------
        // reduce event numbers.
        //-------------------------
        // let eventUpdate = {
        //     uid: theRegistration.eid,
        //     adjustments: {
        //         registrationCount: theRegistration.attendanceCount * -1,
        //     },
        // };
        // const mCount = parseInt(theRegistration.mealCount, 10) * -1;
        // if (mCount !== 0) {
        //     eventUpdate.adjustments.mealCount = mCount;
        // }
        // await fetch(
        //     'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             operation: 'maintainNumbers',
        //             payload: eventUpdate,
        //         }),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('maintainEventNumbers successful');
        //     });

        // //remove the redux reference to the event
        // await removeRegistration(regData.uid);
        // //??????
        // // may need to reload stateRep & stateLead redux
        // //??????
        clearSpinner();
        setShowRegistrationCancelled(true);
    };
    const handleCancelledAcknowledgement = () => {
        setShowRegistrationCancelled(false);
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
        // if (homeStateProv.length < 2) {
        //     okayToProceed = false;
        //     fieldMessage.Home_State = 'is required';
        // }
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
        // if (churchStateProv.length < 2) {
        //     okayToProceed = false;
        //     fieldMessage.Church_State = 'is required';
        // }
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
        var homeState = document.getElementById('homeStateProv');
        regPayload.registrar.residence.stateProv = homeState.value;
        regPayload.registrar.residence.postalCode = homePostalCode;
        regPayload.church.name = churchName;
        regPayload.church.city = churchCity;
        var churchState = document.getElementById('churchStateProv');
        regPayload.church.stateProv = churchState.value;
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
                        Item: registration,
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
    const handleHomeStateChange = ({ newValue }) => {
        console.log('stateProv:', newValue);
        setHomeStateProv(newValue);
    };
    const handleChurchStateChange = ({ newValue }) => {
        setChurchStateProv(newValue);
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
            // case 'homeStateProv':
            //     setHomeStateProv(value);
            //     break;
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
            // case 'churchPostalCode':
            //     setChurchStateProv(value);
            //     break;
            default:
                break;
        }
    };
    const areMealsLocked = () => {
        //--------------------------------------------------------------------
        //for the meal deadline we need to get the redux value and add 1 day
        //for calculation purposes to include 'today'.
        //--------------------------------------------------------------------
        let dbDate = pateSystem?.rally?.meal?.deadline;
        // let dbDate = pateSystem?.rally?.body?.Items[0]?.meal?.deadline;
        let convertedDBDate = Date.parse(dbDate);
        let deadlineTestDate = new Date(convertedDBDate);
        deadlineTestDate.setDate(deadlineTestDate.getDate() + 1);
        var today = new Date();
        if (today.getTime() < deadlineTestDate.getTime()) {
            return false;
        } else {
            return true;
        }
    };
    return (
        <>
            <div className='registration-page__wrapper'>
                <div className='registrar-component__form-box'>
                    <div className='registrar-component__header'>
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

                        <div className='registrar-component__phone-input-line'>
                            <PhoneInput
                                onlyCountries={['us']}
                                country='us'
                                disableCountryCode
                                disableDropdown
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                inputProps={{
                                    padding: 0,
                                    name: 'Cell',
                                    margin: 0,
                                    required: true,
                                    placeholder: '(xxx) xxx-xxxx',
                                }}
                            />
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
                                {/*<input
                                    type='text'
                                    id='homeStateProv'
                                    name='homeStateProv'
                                    onChange={handleChange}
                                    value={homeStateProv}
                                    required
                                />*/}
                                <SelectStateProv
                                    controlName='homeStateProv'
                                    initialValue={homeStateProv}
                                    doChange={handleHomeStateChange}
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
                                {/*<input
                                    type='text'
                                    id='churchStateProv'
                                    name='churchStateProv'
                                    onChange={handleChange}
                                    value={churchStateProv}
                                    required
                                />*/}
                                <SelectStateProv
                                    controlName='churchStateProv'
                                    initialValue={churchStateProv}
                                    doChange={handleChurchStateChange}
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
                                    className='registrar-attendee-count-component'
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
                            <div className='registrar-component__meal-input-control'>
                                <input
                                    type='number'
                                    className='registrar-meal-count-component'
                                    id='mealCount'
                                    name='mealCount'
                                    onChange={handleChange}
                                    value={mealCount}
                                    min='0'
                                    step='1'
                                    max='10'
                                    disabled={mealsLocked}
                                    required
                                />
                                {mealsLocked ? (
                                    <span className='registrar-component__meals-lock'>
                                        {' '}
                                        <FaLock />
                                    </span>
                                ) : null}
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
            <SuccessModal isOpened={showRegistrationCancelled}>
                <SuccessMessage
                    onClose={() => handleCancelledAcknowledgement()}
                />
            </SuccessModal>
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
