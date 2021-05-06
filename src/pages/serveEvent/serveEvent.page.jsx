import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Modal from '../../components/modals/wrapper.modal';
import ConfirmDelete from '../../components/modals/serve-event/serve-event-confirm-delete.modal';
import Spinner from '../../components/spinner/Spinner';
import RegistrationItem from '../../components/registration-serve-list-item/registrationServeListItem.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import {
    loadEventRegistrations,
    clearEventRegistrations,
} from '../../redux/registrations/registrations.actions';
import {
    updateStateRepRally,
    removeRallyFromRallyList,
} from '../../redux/stateRep/stateRep.actions';
import './serveEvent.styles.scss';
// import { getEventRegistrations } from './server-event.actions';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    rallies,
    doneRallies,
    registrations,
    leadRallies,
    leadDoneRallies,
    loadRally,
    loadEventRegistrations,
    clearEventRegistrations,
    updateStateRepRally,
    removeRallyFromRallyList,
    pate,
}) => {
    let eventID = match?.params?.id;
    console.log('serveEvent: ' + eventID);
    const [
        modalDeleteConfirmIsVisible,
        setModalDeleteConfirmIsVisible,
    ] = useState(false);
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
        if (match?.params?.id) {
            clearEventRegistrations();
            if (match.params.id === '0') {
                // this is a new event request
                setDefaultEvent();
            } else {
                // this is an edit
                loadEvent();
                // loadRegistrations();
                getEventRegistrations(eventID);
            }
        } else {
            // clearEventRegistrations();
        }
    }, []);

    useEffect(() => {}, [pateSystem.showSpinner]);

    const getEventRegistrations = (eid) => {
        try {
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
            console.log('getEventRegistrations :: eid (' + eid + ')');
            try {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getRegistrationsForEventOrdered',
                            payload: {
                                eid: eid,
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
                        //     'registrations-data:\n' +
                        //         util.inspect(data.body, {
                        //             showHidden: false,
                        //             depth: null,
                        //         })
                        // );
                        loadEventRegistrations(data?.body?.Items);
                    });
            } catch (error) {
                console.log('Error fetching registrations \n' + error);
                console.err(error);
            }

            // dispatch({type: GET_EVENT_REGISTRATIONS});
        } catch (err) {
            console.log('getEventRegistrations ERR');
            console.error(err);
        }
    };
    const setDefaultEvent = async () => {
        //this is used for creating a default event to display for add
        //create empty event object
        const emptyEvent = {
            meal: {
                startTime: '1200',
                mealCount: 0,
                cost: '0',
                message: '',
                mealsServed: 0,
                deadline: '20211225',
            },
            eventDate: '20211225',
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
            uid: 'sdfijvapofiha;jlrav',
            name: '',
            registrations: 0,
            startTime: '13:00',
            city: '',
            graphic: '',
            approved: false,
            attendees: '0',
            endTime: '13:00',
            attendance: 0,
            id: 'agfwspgswrioja',
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
    const loadEvent = async () => {
        //get the event reference.
        // if the eventID is not in state.stateRep.rally
        // or state.stateRep.doneRally,
        // that means that Lead is viewing. Go to the db
        // and load into pate.rally
        //????????????????????????????????????????????????
        let inRallies = false;
        let eventType = null;
        rallies.forEach((rallyEvent) => {
            if (rallyEvent.uid === eventID) {
                // inRallies = true;
                eventType = 'future';
            }
        });
        //check doneRallies
        doneRallies.forEach((rallyEvent) => {
            if (rallyEvent.uid === eventID) {
                // inRallies = true;
                eventType = 'historical';
            }
        });
        leadRallies.forEach((rallyEvent) => {
            if (rallyEvent.uid === eventID) {
                // inRallies = true;
                eventType = 'leadFuture';
            }
        });
        leadDoneRallies.forEach((rallyEvent) => {
            if (rallyEvent.uid === eventID) {
                // inRallies = true;
                eventType = 'leadHistorical';
            }
        });
        if (eventType === 'future' || eventType === 'historical') {
            if(eventType === 'future'){
                rallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() + '-' + m.toString() + '-' + d.toString();
                        rallyEvent.eventDate = smDate;
                        // save the event to redux
                        loadRally(rallyEvent);
                        //load the useState
                        setEventDate(rallyEvent?.eventDate);
                        setChurchName(rallyEvent?.name);
                        setStreet(rallyEvent?.street);
                        setCity(rallyEvent?.city);
                        setStateProv(rallyEvent?.stateProv);
                        setPostalCode(rallyEvent?.postalCode);
                        setEventStart(rallyEvent?.startTime);
                        setEventEnd(rallyEvent?.endTime);
                        setGraphic(rallyEvent?.graphic);
                        setApproved(rallyEvent?.approved);
                        setContactName(rallyEvent?.contact?.name);
                        setContactEmail(rallyEvent?.contact?.email);
                        setContactPhone(rallyEvent?.contact?.phone);
                        setEventStatus(rallyEvent?.status);
                        setEventMessage(rallyEvent?.message);
                        setRepName(rallyEvent?.coordinator?.name);
                        setRepEmail(rallyEvent?.coordinator?.email);
                        setRepPhone(rallyEvent?.coordinator?.phone);
                        setMealTime(rallyEvent?.meal?.startTime);
                        setMealCost(rallyEvent?.meal?.cost);
                        setMealCount(rallyEvent?.meal?.mealCount);
                        setMealsServed(rallyEvent?.meal?.mealsServed);
                        setMealMessage(rallyEvent?.meal?.message);
                        setMealDeadline(rallyEvent?.meal?.deadline);
                        setAttendeeCount(rallyEvent?.attendees);
                        setRegistrationCount(rallyEvent?.registrations);
                    }
                });
            }
            if(eventType === 'historical'){
                doneRallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() + '-' + m.toString() + '-' + d.toString();
                        rallyEvent.eventDate = smDate;
                        // save the event to redux
                        loadRally(rallyEvent);
                        //load the useState
                        setEventDate(rallyEvent?.eventDate);
                        setChurchName(rallyEvent?.name);
                        setStreet(rallyEvent?.street);
                        setCity(rallyEvent?.city);
                        setStateProv(rallyEvent?.stateProv);
                        setPostalCode(rallyEvent?.postalCode);
                        setEventStart(rallyEvent?.startTime);
                        setEventEnd(rallyEvent?.endTime);
                        setGraphic(rallyEvent?.graphic);
                        setApproved(rallyEvent?.approved);
                        setContactName(rallyEvent?.contact?.name);
                        setContactEmail(rallyEvent?.contact?.email);
                        setContactPhone(rallyEvent?.contact?.phone);
                        setEventStatus(rallyEvent?.status);
                        setEventMessage(rallyEvent?.message);
                        setRepName(rallyEvent?.coordinator?.name);
                        setRepEmail(rallyEvent?.coordinator?.email);
                        setRepPhone(rallyEvent?.coordinator?.phone);
                        setMealTime(rallyEvent?.meal?.startTime);
                        setMealCost(rallyEvent?.meal?.cost);
                        setMealCount(rallyEvent?.meal?.mealCount);
                        setMealsServed(rallyEvent?.meal?.mealsServed);
                        setMealMessage(rallyEvent?.meal?.message);
                        setMealDeadline(rallyEvent?.meal?.deadline);
                        setAttendeeCount(rallyEvent?.attendees);
                        setRegistrationCount(rallyEvent?.registrations);
                    }
                });
            }
        } else {
            // go get the rally from staterep leadRallies
            if(eventType === 'leadFuture'){
                leadRallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() + '-' + m.toString() + '-' + d.toString();
                        rallyEvent.eventDate = smDate;
                        // seave the event to redux
                        loadRally(rallyEvent);
                        //load the useState
                        setEventDate(rallyEvent?.eventDate);
                        setChurchName(rallyEvent?.name);
                        setStreet(rallyEvent?.street);
                        setCity(rallyEvent?.city);
                        setStateProv(rallyEvent?.stateProv);
                        setPostalCode(rallyEvent?.postalCode);
                        setEventStart(rallyEvent?.startTime);
                        setEventEnd(rallyEvent?.endTime);
                        setGraphic(rallyEvent?.graphic);
                        setApproved(rallyEvent?.approved);
                        setContactName(rallyEvent?.contact?.name);
                        setContactEmail(rallyEvent?.contact?.email);
                        setContactPhone(rallyEvent?.contact?.phone);
                        setEventStatus(rallyEvent?.status);
                        setEventMessage(rallyEvent?.message);
                        setRepName(rallyEvent?.coordinator?.name);
                        setRepEmail(rallyEvent?.coordinator?.email);
                        setRepPhone(rallyEvent?.coordinator?.phone);
                        setMealTime(rallyEvent?.meal?.startTime);
                        setMealCost(rallyEvent?.meal?.cost);
                        setMealCount(rallyEvent?.meal?.mealCount);
                        setMealsServed(rallyEvent?.meal?.mealsServed);
                        setMealMessage(rallyEvent?.meal?.message);
                        setMealDeadline(rallyEvent?.meal?.deadline);
                        setAttendeeCount(rallyEvent?.attendees);
                        setRegistrationCount(rallyEvent?.registrations);
                    }
                });
            }
            if(eventType === 'leadHistorical'){
                leadDoneRallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() + '-' + m.toString() + '-' + d.toString();
                        rallyEvent.eventDate = smDate;
                        // seave the event to redux
                        loadRally(rallyEvent);
                        //load the useState
                        setEventDate(rallyEvent?.eventDate);
                        setChurchName(rallyEvent?.name);
                        setStreet(rallyEvent?.street);
                        setCity(rallyEvent?.city);
                        setStateProv(rallyEvent?.stateProv);
                        setPostalCode(rallyEvent?.postalCode);
                        setEventStart(rallyEvent?.startTime);
                        setEventEnd(rallyEvent?.endTime);
                        setGraphic(rallyEvent?.graphic);
                        setApproved(rallyEvent?.approved);
                        setContactName(rallyEvent?.contact?.name);
                        setContactEmail(rallyEvent?.contact?.email);
                        setContactPhone(rallyEvent?.contact?.phone);
                        setEventStatus(rallyEvent?.status);
                        setEventMessage(rallyEvent?.message);
                        setRepName(rallyEvent?.coordinator?.name);
                        setRepEmail(rallyEvent?.coordinator?.email);
                        setRepPhone(rallyEvent?.coordinator?.phone);
                        setMealTime(rallyEvent?.meal?.startTime);
                        setMealCost(rallyEvent?.meal?.cost);
                        setMealCount(rallyEvent?.meal?.mealCount);
                        setMealsServed(rallyEvent?.meal?.mealsServed);
                        setMealMessage(rallyEvent?.meal?.message);
                        setMealDeadline(rallyEvent?.meal?.deadline);
                        setAttendeeCount(rallyEvent?.attendees);
                        setRegistrationCount(rallyEvent?.registrations);
                    }
                });
            }
        }
    };
    // const loadRegistrations = async () => {
    //     //---------------------------------------------------
    //     //this function gets the registratoins for an event
    //     //and loads the instances into redux
    //     //---------------------------------------------------
    //     // {
    //     //     "operation": "getRegistrationsForEvent",
    //     //     "payload": {
    //     //       "eid": "65ff55fb33fe4c0447b086188f2e9b1f"
    //     //     }
    //     // }
    //     async function getEventRegistrations() {
    //         try {
    //             fetch(
    //                 'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
    //                 {
    //                     method: 'POST',
    //                     body: JSON.stringify({
    //                         operation: 'getRegistrationsForEvent',
    //                         payload: {
    //                             eid: match?.params?.id,
    //                         },
    //                     }),
    //                     headers: {
    //                         'Content-type': 'application/json; charset=UTF-8',
    //                     },
    //                 }
    //             )
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     const util = require('util');
    //                     console.log(
    //                         'registrations-data:\n' +
    //                             util.inspect(data.body, {
    //                                 showHidden: false,
    //                                 depth: null,
    //                             })
    //                     );
    //                     loadEventRegistrations(data?.body?.Items);
    //                 });
    //         } catch (error) {
    //             clearSpinner();
    //             console.log('Error fetching registrations \n' + error);
    //         }
    //     }
    //     await getEventRegistrations();
    // };
    const handleSubmitClick = (event) => {
        event.preventDefault();

        //get rally object to update
        let newRally = pateSystem?.rally;
        //now update with form values

        newRally.name = churchName;
        newRally.street = street;
        newRally.city = city;
        newRally.stateProv = stateProv;
        newRally.postalCode = postalCode;
        newRally.contact.name = contactName;
        newRally.contact.phone = contactPhone;
        newRally.contact.email = contactEmail;
        newRally.eventDate = eventDate.replace(/-/g, '');
        newRally.startTime = eventStart;
        newRally.endTime = eventEnd;
        newRally.message = eventMessage;
        newRally.approved = isApproved;
        newRally.status = eventStatus;
        newRally.meal.startTime = mealTime;
        newRally.meal.cost = mealCost;
        newRally.meal.mealCount = mealCount;
        newRally.meal.mealsServed = mealsServed;
        newRally.meal.message = mealMessage;
        newRally.meal.deadline = mealDeadline;
        newRally.registrations = registrationCount;
        newRally.attendees = attendeeCount;

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
                        operation: 'updateEvent',
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
        // let value = null;
        // let name = null;
        // if (e?.target?.name === 'checkbox') {
        //     console.log('checkbox - ignore');
        //     name = 'ignore';
        //     value = null;
        // } else {
        //     value = e.target.value;
        //     name = e.target.name;
        // }
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
            case 'isApproved':
                if (currentUser?.stateLead === stateProv) {
                    setApproved(!isApproved);
                }
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
            case 'mealCount':
                setMealCount(value);
                break;
            case 'mealsServed':
                setMealsServed(value);
                break;
            case 'mealMessage':
                setMealMessage(value);
                break;
            case 'mealDeadline':
                setMealDeadline(value);
                break;
            case 'attendanceCount':
                setAttendeeCount(value);
                break;
            case 'registrationCount':
                setRegistrationCount(value);
                break;
            default:
                break;
        }
    };
    const handleCancelClick = () => {
        history.push('/serve');
    };
    const handleDeleteRequest = () => {
        setModalDeleteConfirmIsVisible(true);
    };
    const handleDeleteConfirm = () => {
        setModalDeleteConfirmIsVisible(false);
        //remove the rally from the database...
        async function updateDb() {
            await fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'deleteEvent',
                        payload: {
                            Key: {
                                uid: eventID,
                            },
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
                    removeRallyFromRallyList(eventID);
                });
        }
        //next call is to async the above update
        updateDb();

        history.push('/serve');
    };
    const handleDeleteDecline = () => {
        //cancelling delete request
        setModalDeleteConfirmIsVisible(false);
        return;
    };
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='serveevent-page__wrapper'>
                <div className='serveevent-page__form-box'>
                    <div className='serveevent-page__header'>EVENT</div>
                    <div className='serveevent-page__data-input-box'>
                        <div className='serveevent-page__section-header'>
                            Location
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Church:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Street:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    City:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    State:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Postal Code:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__section-header'>
                            Church Contact
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Name:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Phone:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Email:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__section-header'>
                            Logistics
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Date:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Start Time:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    End Time:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Message:
                                </div>
                                <div className='serveevent-page__grid-control'>
                                    <input
                                        type='memo'
                                        id='eventMessage'
                                        name='eventMessage'
                                        onChange={handleChange}
                                        value={eventMessage}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Approved:
                                </div>
                                <div className='serveevent-page__grid-control'>
                                    {currentUser?.stateLead ? (
                                        //this is LEAD
                                        isApproved ? (
                                            <input
                                                type='checkbox'
                                                id='isApproved'
                                                name='isApproved'
                                                checked
                                                onClick={handleChange}
                                                onChange={() => handleChange}
                                                value='true'
                                                ref={refApprovalCheckbox}
                                            />
                                        ) : (
                                            <input
                                                type='checkbox'
                                                id='isApproved'
                                                name='isApproved'
                                                value='true'
                                                onClick={handleChange}
                                                onChange={() => handleChange}
                                                ref={refApprovalCheckbox}
                                            />
                                        )
                                    ) : //this is REP
                                    isApproved ? (
                                        <span className='serve-event-page__approval-true'>
                                            TRUE
                                        </span>
                                    ) : (
                                        <span className='serve-event-page__approval-false'>
                                            FALSE
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='serveevent-page__section-header'>
                            Meal Details
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Start Time:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Cost:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Planned:
                                </div>
                                <div className='serveevent-page__grid-control'>
                                    <input
                                        type='number'
                                        id='mealCount'
                                        name='mealCount'
                                        onChange={handleChange}
                                        value={mealCount}
                                        readOnly
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Served:
                                </div>
                                <div className='serveevent-page__grid-control'>
                                    <input
                                        type='number'
                                        id='mealsServed'
                                        name='mealsServed'
                                        onChange={handleChange}
                                        value={mealsServed}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Message:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Deadline:
                                </div>
                                <div className='serveevent-page__grid-control'>
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
                        <div className='serveevent-page__section-header'>
                            Tally Information
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Registrations:
                                </div>
                                <div className='serveevent-page__grid-control'>
                                    <input
                                        type='number'
                                        id='registrations'
                                        name='registrations'
                                        onChange={handleChange}
                                        value={registrationCount}
                                        required
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='serveevent-page__grid-line'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='serveevent-page__grid-label'>
                                    Attendees:
                                </div>
                                <div className='serveevent-page__grid-control'>
                                    <input
                                        type='number'
                                        id='attendees'
                                        name='attendees'
                                        onChange={handleChange}
                                        value={attendeeCount}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='serveevent-page__button-wrapper'>
                            <button
                                className='serveevent-page__update-button'
                                onClick={handleSubmitClick}
                            >
                                Update
                            </button>
                            <button
                                className='serveevent-page__cancel-button'
                                onClick={() => handleCancelClick()}
                            >
                                Cancel
                            </button>
                            <button
                                className='serveevent-page__delete-button'
                                onClick={() => handleDeleteRequest()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className='serveevent-page__registration-list-box'>
                        {match.params.id !== '0' ? (
                            <>
                                <div className='serveevent-page__registration-list-header'>
                                    REGISTRATIONS
                                </div>
                                <div className='serveevent-page__registration-data-box'>
                                    {registrations?.eventRegistrations ? (
                                        registrations.eventRegistrations.map(
                                            (rege) => (
                                                <RegistrationItem
                                                    key={rege.uid}
                                                    regItem={rege}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div>NO</div>
                                    )}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <MainFooter />
            <Modal isOpened={modalDeleteConfirmIsVisible}>
                <div>
                    <ConfirmDelete
                        confirmDelete={() => handleDeleteConfirm()}
                        declineDelete={() => handleDeleteDecline()}
                    />
                </div>
            </Modal>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRally: (rally) => dispatch(loadRally(rally)),
    loadEventRegistrations: (registrations) =>
        dispatch(loadEventRegistrations(registrations)),
    clearEventRegistrations: () => dispatch(clearEventRegistrations()),
    updateStateRepRally: (newRally) => dispatch(updateStateRepRally(newRally)),
    removeRallyFromRallyList: (rally) =>
        dispatch(removeRallyFromRallyList(rally)),
});
// Serve.propTypes = {
//     getEventRegistrations: PropTypes.func.isRequired,
// }
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    rallies: state.stateRep.rally,
    doneRallies: state.stateRep.doneRally,
    leadRallies: state.stateLead.rally,
    leadDoneRallies: state.stateLead.doneRally,
    registrations: state.registrations,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
