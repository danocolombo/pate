import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PhoneInput from 'react-phone-input-2';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Modal from '../../components/modals/wrapper.modal';
import InputErrors from '../../components/modals/new-event/new-event-input-error.modal';
import SuccessModal from '../../components/modals/new-event/new-event-success.modal';
import SuccessMessage from '../../components/modals/new-event/new-event-success-msg.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import { updateStateRepRally } from '../../redux/stateRep/stateRep.actions';
import './newEvent.styles.scss';

const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    rallies,
    leadRallies,
    loadRally,
    updateStateRepRally,
    pate,
}) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showRegistrationSuccess, setShowRegistrationSuccess] =
        useState(false);
    let eventID = match?.params?.id;

    const [churchName, setChurchName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [stateProv, setStateProv] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [graphic, setGraphic] = useState('');
    const [isApproved, setApproved] = useState(false);

    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [eventStatus, setEventStatus] = useState('');
    const [eventMessage, setEventMessage] = useState('');
    const [repName, setRepName] = useState('');
    const [repEmail, setRepEmail] = useState('');
    const [repPhone, setRepPhone] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [mealCost, setMealCost] = useState('');
    const [mealCount, setMealCount] = useState(0);
    const [mealsServed, setMealsServed] = useState(0);
    const [mealMessage, setMealMessage] = useState('');
    const [mealDeadline, setMealDeadline] = useState('');
    const [attendeeCount, setAttendeeCount] = useState(0);
    const [registrationCount, setRegistrationCount] = useState(0);

    const history = useHistory();
    const STATUS_VALUE = [
        'Draft',
        'Pending',
        'Rejected',
        'Available',
        'Offered',
        'Archived',
    ];

    const util = require('util');
    useEffect(() => {
        //++++++++++++++++++++++++++++++++++++++++
        // useEffect on load
        //++++++++++++++++++++++++++++++++++++++++
        if (!currentUser.isLoggedIn) history.push('/');
        //get the reference to the current event and load to useState
    }, []);

    useEffect(() => {}, [pateSystem.showSpinner]);

    const setDefaultEvent = async () => {
        //this is used for creating a default event to display for add
        //create empty event object
        const emptyEvent = {
            meal: {
                startTime: '0000',
                mealCount: 0,
                cost: '0',
                message: '',
                mealsServed: 0,
                deadline: '30000101',
            },
            eventDate: '30000101',
            contact: {
                name: '',
                phone: '',
                email: '',
            },
            status: 'draft',
            message: '',
            stateProv: '',
            coordinator: {
                name: '',
                id: 0,
                phone: '',
                email: '',
            },
            uid: '',
            name: '',
            registrations: 0,
            startTime: '00:00',
            city: '',
            graphic: '',
            approved: false,
            attendees: 0,
            endTime: '00:00',
            id: '',
            postalCode: '',
            street: '',
        };

        loadRally(emptyEvent);
        //load the useState
        // need date in format mm-dd-yyyy
        let dateToday = new Date();
        // console.log(dateToday);
        let m = parseInt(dateToday.getUTCMonth() + 1);
        let d = parseInt(dateToday.getUTCDate());
        let y = parseInt(dateToday.getFullYear());
        dateToday = y + '-' + m + '-' + d;
        dateToday = '2021-12-25';
        setEventDate(dateToday);
        setChurchName('');
        setStreet('');
        setCity('');
        setStateProv('');
        setPostalCode('');
        setEventStart('');
        setEventEnd('');
        setGraphic('');
        setApproved('false');
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setEventStatus('draft');
        setEventMessage('');
        setRepName('');
        setRepEmail('');
        setRepPhone('');
        setMealTime('');
        setMealCost('');
        setMealCount(0);
        setMealsServed(0);
        setMealMessage('');
        setMealDeadline(dateToday);
        setAttendeeCount(0);
        setRegistrationCount(0);
    };

    const handleAddClick = (event) => {
        //=====================================
        // need to make sure required fields
        // are provided.
        //=====================================
        let fieldMessage = {};
        let okayToProceed = true;
        if (churchName?.length < 2) {
            okayToProceed = false;
            fieldMessage.Church_Name = 'is required';
        }
        if (street?.length < 2) {
            okayToProceed = false;
            fieldMessage.Location_Street = 'is required';
        }
        if (city?.length < 2) {
            okayToProceed = false;
            fieldMessage.Location_City = 'is required';
        }
        if (stateProv?.length < 2) {
            okayToProceed = false;
            fieldMessage.Location_State = 'is required';
        }
        if (postalCode?.length < 2) {
            okayToProceed = false;
            fieldMessage.Location_PostalCode = 'is required';
        }
        if (contactName?.length < 2) {
            okayToProceed = false;
            fieldMessage.Contact_Name = 'is required';
        }
        if (contactPhone?.length < 2) {
            okayToProceed = false;
            fieldMessage.Contact_Phone = 'is required';
        }
        if (contactEmail?.length < 2) {
            okayToProceed = false;
            fieldMessage.Contact_Email = 'is required';
        }
        if (!okayToProceed) {
            // alert(
            //     'Please correct your request.\n' + JSON.stringify(fieldMessage)
            // );
            clearSpinner();
            setModalMessage('All the fields are required');
            setModalIsVisible(true);
            // const alertPayload = {
            //     msg: 'ALL FIELDS ARE REQUIRED',
            //     alertType: 'danger',
            // };
            // setAlert(alertPayload);
            window.scrollTo(0, 0);

            return;
        }
        // event.preventDefault();
        //default rally
        const newRally = {
            meal: {
                startTime: '0000',
                mealCount: 0,
                cost: '0',
                message: '',
                mealsServed: 0,
                deadline: '30000101',
            },
            eventDate: '30000101',
            contact: {
                name: '',
                phone: '',
                email: '',
            },
            status: 'draft',
            message: '',
            stateProv: '',
            coordinator: {
                name: '',
                id: 0,
                phone: '',
                email: '',
            },
            uid: '',
            name: '',
            registrations: 0,
            startTime: '00:00',
            city: '',
            graphic: '',
            approved: false,
            attendees: 0,
            endTime: '00:00',
            id: '',
            postalCode: '',
            street: '',
        };

        //get rally object to update
        // let newRally = pateSystem?.rally;
        //now update with form values

        newRally.name = churchName;
        newRally.street = street;
        newRally.city = city;
        newRally.stateProv = stateProv;
        newRally.postalCode = postalCode;
        newRally.contact.name = contactName;
        newRally.contact.phone = contactPhone;
        newRally.contact.email = contactEmail;
        if (eventDate !== null && eventDate.length > 0) {
            newRally.eventDate = eventDate.replace(/-/g, '');
        } else {
            newRally.eventDate = '30000101';
        }
        newRally.startTime = eventStart;
        newRally.endTime = eventEnd;
        newRally.message = eventMessage;
        newRally.status = eventStatus;
        newRally.meal.startTime = mealTime;
        newRally.meal.cost = mealCost;
        newRally.meal.message = mealMessage;
        newRally.meal.deadline = mealDeadline;
        //need to add the currently logged in user as the coordinator
        newRally.coordinator.name =
            currentUser.firstName + ' ' + currentUser.lastName;
        newRally.coordinator.id = currentUser.uid;
        newRally.coordinator.phone = currentUser.phone;
        newRally.coordinator.email = currentUser.email;

        //now update redux for future use.
        // loadRally(newRally);
        //reload stateRep and stateLead
        //now save the newRally data to database
        async function updateDb() {
            await fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'createEvent',
                        payload: {
                            Item: newRally,
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
                });
        }
        //next call is to async the above update
        updateDb();
        //now update the stateRep.rally
        updateStateRepRally(newRally);
        setShowRegistrationSuccess(true);
        // history.push('/serve');
    };
    const handleChange = (e) => {
        let { value, name } = e.target;
        switch (name) {
            case 'churchName':
                setChurchName(value);
                break;
            case 'street':
                setStreet(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'stateProv':
                setStateProv(value);
                break;
            case 'postalCode':
                setPostalCode(value);
                break;
            case 'rallyDate':
                console.log('rallyDate:' + value);
                setEventDate(value);
                console.log('eventDate: ' + eventDate);
                console.log('make it?');
                break;
            case 'eventDate':
                setEventDate(value);
                break;
            case 'eventStart':
                setEventStart(value);
                break;
            case 'eventEnd':
                setEventEnd(value);
                break;
            case 'graphicFile':
                setGraphic(value);
                break;

            case 'eventStatus':
                setEventStatus(value);
                break;
            case 'contactName':
                setContactName(value);
                break;
            case 'contactEmail':
                setContactEmail(value);
                break;
            case 'contactPhone':
                setContactPhone(value);
                break;
            case 'eventMessage':
                setEventMessage(value);
                break;
            case 'repName':
                setRepName(value);
                break;
            case 'repEmail':
                setRepEmail(value);
                break;
            case 'repPhone':
                setRepPhone(value);
                break;
            case 'mealTime':
                setMealTime(value);
                break;
            case 'mealCost':
                setMealCost(value);
                break;

            case 'mealMessage':
                setMealMessage(value);
                break;
            case 'mealDeadline':
                setMealDeadline(value);
                break;
            default:
                break;
        }
    };
    const successAcknowledged = () => {
        setShowRegistrationSuccess(false);
        history.push('/serve');
    };
    const handleCancelClick = () => {
        history.push('/serve');
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='newevent-page__wrapper'>
                <div className='newevent-page__form-box'>
                    <div className='newevent-page__header'>NEW RALLY</div>
                    <div className='newevent-page__data-input-box'>
                        <div className='newevent-page__section-header'>
                            Location
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Church:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    name='churchName'
                                    id='churchName'
                                    value={churchName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Street:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    id='street'
                                    name='street'
                                    onChange={handleChange}
                                    value={street}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                City:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    id='city'
                                    name='city'
                                    onChange={handleChange}
                                    value={city}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                State:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    id='stateProv'
                                    name='stateProv'
                                    onChange={handleChange}
                                    value={stateProv}
                                    required
                                />
                            </div>
                        </div>
                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                State:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <select>
                                    <option value='AL'>Alabama</option>
                                    <option value='AK'>Alaska</option>
                                    <option value='AZ'>Arizona</option>
                                    <option value='AR'>Arkansas</option>
                                    <option value='CA'>California</option>
                                    <option value='CO'>Colorado</option>
                                    <option value='CT'>Connecticut</option>
                                    <option value='DE'>Delaware</option>
                                    <option value='DC'>
                                        District Of Columbia
                                    </option>
                                    <option value='FL'>Florida</option>
                                    <option value='GA'>Georgia</option>
                                    <option value='HI'>Hawaii</option>
                                    <option value='ID'>Idaho</option>
                                    <option value='IL'>Illinois</option>
                                    <option value='IN'>Indiana</option>
                                    <option value='IA'>Iowa</option>
                                    <option value='KS'>Kansas</option>
                                    <option value='KY'>Kentucky</option>
                                    <option value='LA'>Louisiana</option>
                                    <option value='ME'>Maine</option>
                                    <option value='MD'>Maryland</option>
                                    <option value='MA'>Massachusetts</option>
                                    <option value='MI'>Michigan</option>
                                    <option value='MN'>Minnesota</option>
                                    <option value='MS'>Mississippi</option>
                                    <option value='MO'>Missouri</option>
                                    <option value='MT'>Montana</option>
                                    <option value='NE'>Nebraska</option>
                                    <option value='NV'>Nevada</option>
                                    <option value='NH'>New Hampshire</option>
                                    <option value='NJ'>New Jersey</option>
                                    <option value='NM'>New Mexico</option>
                                    <option value='NY'>New York</option>
                                    <option value='NC'>North Carolina</option>
                                    <option value='ND'>North Dakota</option>
                                    <option value='OH'>Ohio</option>
                                    <option value='OK'>Oklahoma</option>
                                    <option value='OR'>Oregon</option>
                                    <option value='PA'>Pennsylvania</option>
                                    <option value='RI'>Rhode Island</option>
                                    <option value='SC'>South Carolina</option>
                                    <option value='SD'>South Dakota</option>
                                    <option value='TN'>Tennessee</option>
                                    <option value='TX'>Texas</option>
                                    <option value='UT'>Utah</option>
                                    <option value='VT'>Vermont</option>
                                    <option value='VA'>Virginia</option>
                                    <option value='WA'>Washington</option>
                                    <option value='WV'>West Virginia</option>
                                    <option value='WI'>Wisconsin</option>
                                    <option value='WY'>Wyoming</option>
                                </select>
                            </div>
                        </div>
                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Postal Code:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    id='postalCode'
                                    name='postalCode'
                                    onChange={handleChange}
                                    value={postalCode}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__section-header'>
                            Church Contact
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Name:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    id='contactName'
                                    name='contactName'
                                    onChange={handleChange}
                                    value={contactName}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__data-row-phone'>
                            <PhoneInput
                                onlyCountries={['us']}
                                country='us'
                                disableCountryCode
                                disableDropdown
                                value={contactPhone}
                                onChange={(contactPhone) =>
                                    setContactPhone(contactPhone)
                                }
                                inputProps={{
                                    padding: 0,
                                    name: 'Cell',
                                    margin: 0,
                                    required: true,
                                    placeholder: '(xxx) xxx-xxxx',
                                }}
                            />
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Email:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    id='contactEmail'
                                    name='contactEmail'
                                    onChange={handleChange}
                                    value={contactEmail}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__section-header'>
                            Logistics
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Date:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='date'
                                    id='rallyDate'
                                    name='rallyDate'
                                    onChange={handleChange}
                                    value={eventDate}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Start Time:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='time'
                                    id='eventStart'
                                    name='eventStart'
                                    onChange={handleChange}
                                    value={eventStart}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                End Time:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='time'
                                    id='eventEnd'
                                    name='eventEnd'
                                    onChange={handleChange}
                                    value={eventEnd}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Message:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <textarea
                                    rows='4'
                                    cols='18'
                                    name='eventMessage'
                                    id='eventMessage'
                                    onChange={handleChange}
                                    value={eventMessage}
                                ></textarea>
                                {/*
                                    <input
                                        type='memo'
                                        id='eventMessage'
                                        name='eventMessage'
                                        onChange={handleChange}
                                        value={eventMessage}
                                        required
                                    />
                                    */}
                            </div>
                        </div>

                        <div className='newevent-page__section-header'>
                            Meal Details
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Start Time:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='time'
                                    id='mealTime'
                                    name='mealTime'
                                    onChange={handleChange}
                                    value={mealTime}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Cost:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='text'
                                    id='mealCost'
                                    name='mealCost'
                                    onChange={handleChange}
                                    value={mealCost}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Message:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <textarea
                                    rows='4'
                                    cols='18'
                                    name='mealMessage'
                                    id='mealMessage'
                                    onChange={handleChange}
                                    value={mealMessage}
                                ></textarea>
                                {/*
                                <input
                                    type='memo'
                                    id='mealMessage'
                                    name='mealMessage'
                                    onChange={handleChange}
                                    value={mealMessage}
                                    required
                                />
                            */}
                            </div>
                        </div>

                        <div className='newevent-page__grid-data-box'>
                            <div className='newevent-page__grid-label'>
                                Deadline:
                            </div>
                            <div className='newevent-page__grid-control'>
                                <input
                                    type='date'
                                    id='mealDeadline'
                                    name='mealDeadline'
                                    onChange={handleChange}
                                    value={mealDeadline}
                                    required
                                />
                            </div>
                        </div>

                        <div className='newevent-page__button-wrapper'>
                            <button
                                className='newevent-page__update-button'
                                onClick={() => handleAddClick()}
                            >
                                ADD
                            </button>
                            <button
                                className='newevent-page__cancel-button'
                                onClick={() => handleCancelClick()}
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter />

            <Modal isOpened={modalIsVisible}>
                <div>
                    <InputErrors onClose={() => setModalIsVisible(false)} />
                    {/*<div>{modalMessage}</div>*/}
                </div>
            </Modal>
            <SuccessModal isOpened={showRegistrationSuccess}>
                <SuccessMessage onClose={() => successAcknowledged()} />
            </SuccessModal>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRally: (rally) => dispatch(loadRally(rally)),
    updateStateRepRally: (newRally) => dispatch(updateStateRepRally(newRally)),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    rallies: state.stateRep.rally,
    leadRallies: state.stateLead.rally,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
