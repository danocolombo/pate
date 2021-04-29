import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
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
    let eventID = match?.params?.id;
    console.log('serveEvent: ' + eventID);
    const refApprovalCheckbox = useRef(null);
    // const [plan, setPlan] = useState([]);
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
        event.preventDefault();
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
        if (eventDate !== null) {
            newRally.eventDate = eventDate.replace(/-/g, '');
        }
        newRally.startTime = eventStart;
        newRally.endTime = eventEnd;
        newRally.message = eventMessage;
        newRally.status = eventStatus;
        newRally.meal.startTime = mealTime;
        newRally.meal.cost = mealCost;
        newRally.meal.message = mealMessage;
        newRally.meal.deadline = mealDeadline;

        //now update redux for future use.
        loadRally(newRally);
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
                    // const util = require('util');
                    // console.log(
                    //     'db data returned: \n' +
                    //         util.inspect(data, {
                    //             showHidden: false,
                    //             depth: null,
                    //         })
                    // );
                });
        }
        //next call is to async the above update
        updateDb();
        //now update the stateRep.rally
        updateStateRepRally(newRally);
        history.push('/serve');
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
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__section-header'>
                            Church Contact
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
                            <div className='newevent-page__grid-data-box'>
                                <div className='newevent-page__grid-label'>
                                    Phone:
                                </div>
                                <div className='newevent-page__grid-control'>
                                    <input
                                        type='text'
                                        id='contactPhone'
                                        name='contactPhone'
                                        onChange={handleChange}
                                        value={contactPhone}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__section-header'>
                            Logistics
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
                            <div className='newevent-page__grid-data-box'>
                                <div className='newevent-page__grid-label'>
                                    Message:
                                </div>
                                <div className='newevent-page__grid-control'>
                                <textarea rows="4" cols="15" name="eventMessage" id="eventMessage" onChange={handleChange} value={eventMessage}></textarea>
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
                        </div>
                        
                        <div className='newevent-page__section-header'>
                            Meal Details
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        
                        <div className='newevent-page__grid-line'>
                            <div></div>
                            <div className='newevent-page__grid-data-box'>
                                <div className='newevent-page__grid-label'>
                                    Message:
                                </div>
                                <div className='newevent-page__grid-control'>
                                    <input
                                        type='memo'
                                        id='mealMessage'
                                        name='mealMessage'
                                        onChange={handleChange}
                                        value={mealMessage}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='newevent-page__grid-line'>
                            <div></div>
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
                        </div>
                        

                        <div className='newevent-page__button-wrapper'>
                            <button
                                className='newevent-page__update-button'
                                onClick={handleAddClick}
                            >
                                ADD
                            </button>
                            <button
                                className='newevent-page__update-button'
                                onClick=''
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter />
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
