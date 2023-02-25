import React, { useEffect, useState, useRef } from 'react';
import { Storage } from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Stack, TextField, MenuItem } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import SelectStateProv from '../../components/state-prov/select-stateProv.component';
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
import { STATUS_VALUE } from '../../constants/pate';
import { printObject, createAWSUniqueID } from '../../utils/helpers';
import { US_STATES, NUMBER_SELECT_OPTIONS_0_10 } from '../../constants/pate';
import './serveEvent.styles.scss';
import useStyles from './serve-event.styles';
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

    //***   rallyEvent used to store event to display   */
    const classes = useStyles();
    const [rallyEvent, setRallyEvent] = useState({});
    const [modalDeleteConfirmIsVisible, setModalDeleteConfirmIsVisible] =
        useState(false);
    const refApprovalCheckbox = useRef(null);
    // const [plan, setPlan] = useState([]);
    const [churchName, setChurchName] = useState('');
    const [churchNameError, setChurchNameError] = useState('');
    const [street, setStreet] = useState('');
    const [streetError, setStreetError] = useState('');
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateProv, setStateProv] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [graphicFileName, setGraphicFileName] = useState('');
    const [graphicLocation, setGraphicLocation] = useState('');
    const [graphicFileObj, setGraphicFileObj] = useState();
    const [isApproved, setApproved] = useState(false);

    const [contactFirstName, setContactFirstName] = useState('');
    const [contactFirstNameError, setContactFirstNameError] = useState('');
    const [contactLastName, setContactLastName] = useState('');
    const [contactLastNameError, setContactLastNameError] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactEmailError, setContactEmailError] = useState('');
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
    const [displayRegistrations, setDisplayRegistrations] = useState([]);
    const history = useHistory();

    //const util = require('util');
    useEffect(() => {
        //++++++++++++++++++++++++++++++++++++++++
        // useEffect on load
        //++++++++++++++++++++++++++++++++++++++++
        console.log('1. ID:  ', createAWSUniqueID());
        console.log('1. ID:  ', createAWSUniqueID());
        console.log('1. ID:  ', createAWSUniqueID());
        console.log('1. ID:  ', createAWSUniqueID());
        if (!currentUser.isLoggedIn) history.push('/');
        //get the reference to the current event and load to useState
        if (match?.params?.id) {
            clearEventRegistrations();
            if (match.params.id === '0') {
                // this is a new event request
                setDefaultEvent();
            } else {
                // this is an edit
                async function getEventDetails() {
                    const variables = {
                        id: eventID,
                    };
                    API.graphql(
                        graphqlOperation(queries.getEventDetails, variables)
                    )
                        .then((gqlResponse) => {
                            if (gqlResponse?.data?.getEvent) {
                                // now loop through getting the ones for the lead
                                setRallyEvent(gqlResponse.data.getEvent);
                                loadEvent(gqlResponse.data.getEvent)
                                    .then(() => {
                                        console.log('loadEvent complete');
                                    })
                                    .catch((e) => {
                                        console.log('error loadingEvent');
                                    });
                            } else {
                                console.log('SEP:120--> CANNOT FIND EVENT');
                            }
                        })
                        .catch((error) => {
                            printObject(
                                'SEP:125--> error getting event from graphql',
                                error
                            );
                        });
                }
                getEventDetails();
                //todo -- load details into loadEvent()??
                // loadEvent();
                // loadRegistrations();
                // getEventRegistrations(eventID);
            }
        } else {
            // clearEventRegistrations();
        }
    }, []);

    useEffect(() => {}, [pateSystem.showSpinner]);

    // const getEventRegistrations = (eid) => {
    //   try {
    //     try {
    //       fetch(
    //         "https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations",
    //         {
    //           method: "POST",
    //           body: JSON.stringify({
    //             operation: "getEventRegistrations",
    //             payload: {
    //               eid: eid,
    //             },
    //           }),
    //           headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //           },
    //         }
    //       )
    //         .then((response) => response.json())
    //         .then((data) => {
    //           loadEventRegistrations(data.body);
    //           // setDisplayRegistrations(data.body);
    //           // console.log("SEP:140-->data:\n", data.body);
    //         });
    //     } catch (error) {
    //       console.log("Error fetching registrations \n" + error);
    //       console.err(error);
    //     }

    //     // dispatch({type: GET_EVENT_REGISTRATIONS});
    //   } catch (err) {
    //     console.log("getEventRegistrations ERR");
    //     console.error(err);
    //   }
    // };
    const setDefaultEvent = async () => {
        //todo-gql --- set default values for new project and put in RallyEvent useState object
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
            graphicFile: '',
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
        setGraphicFileName('');
        setApproved('false');
        setContactFirstName('');
        setContactLastName('');
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
    const loadEvent = async (theEvent) => {
        // load event from rallyEvent useState into valiables...
        // save the event to redux
        //loadRally(rallyEvent);
        // let ddbDate = rallyEvent.eventDate;
        // const y = ddbDate.substring(0, 4);
        // const m = ddbDate.substring(4, 6);
        // const d = ddbDate.substring(6, 8);
        // let smDate = y.toString() + '-' + m.toString() + '-' + d.toString();
        // rallyEvent.eventDate = smDate;
        // seave the event to redux
        //load the useState
        setEventDate(theEvent?.eventDate);
        setChurchName(theEvent?.name);
        setStreet(theEvent?.location?.street);
        setCity(theEvent?.location?.city);
        setStateProv(theEvent?.location?.stateProv);
        setPostalCode(theEvent?.location?.postalCode);
        setEventStart(theEvent?.startTime.substr(0, 5));
        setEventEnd(theEvent?.endTime.substr(0, 5));
        setGraphicFileName(theEvent?.graphic);
        let tmpStr = 'events/' + eventID + theEvent?.graphic;
        setGraphicLocation(tmpStr);
        //todo-gql --- DO WE USE OR NEED "approved"?
        setApproved(theEvent?.approved === 'approved' ? true : false);
        //todo-gql --- need to update UI to use first and last name for contact
        setContactFirstName(theEvent?.contact?.firstName);
        setContactLastName(theEvent?.contact?.lastName);
        setContactEmail(theEvent?.contact?.email);
        setContactPhone(theEvent?.contact?.phone);
        setEventStatus(theEvent?.status);
        setEventMessage(theEvent?.message);
        //todo-gql --- need to update UI to use first and last name for coordinator
        setRepName(theEvent?.coordinator?.firstName);
        setRepEmail(theEvent?.coordinator?.email);
        setRepPhone(theEvent?.coordinator?.phone);
        setMealTime(theEvent?.meal?.startTime.substr(0, 5));
        setMealCost(theEvent?.meal?.cost);
        setMealCount(theEvent?.meal?.plannedCount);
        setMealsServed(theEvent?.meal?.actualCount);
        setMealMessage(theEvent?.meal?.message);
        setMealDeadline(theEvent?.meal?.deadline);
        setAttendeeCount(theEvent?.actualCount);
        setRegistrationCount(theEvent?.plannedCount);
    };

    const loadEventOLD = async () => {
        //get the event reference.
        // if the eventID is not in state.stateRep.rally
        // or state.stateRep.doneRally,
        // that means that Lead is viewing. Go to the db
        // and load into pate.rally
        //????????????????????????????????????????????????
        let inRallies = false;
        let eventType = null;
        if (rallies.length > 0) {
            rallies.forEach((rallyEvent) => {
                if (rallyEvent.uid === eventID) {
                    // inRallies = true;
                    eventType = 'future';
                }
            });
        }
        if (eventID === '0') {
        }
        //check doneRallies
        if (eventType === null && doneRallies.length > 0) {
            doneRallies.forEach((rallyEvent) => {
                if (rallyEvent.uid === eventID) {
                    // inRallies = true;
                    eventType = 'historical';
                }
            });
        }
        if (eventType === null && leadRallies.length > 0) {
            leadRallies.forEach((rallyEvent) => {
                if (rallyEvent.uid === eventID) {
                    // inRallies = true;
                    eventType = 'leadFuture';
                }
            });
        }
        if (eventType === null && leadDoneRallies.length > 0) {
            leadDoneRallies.forEach((rallyEvent) => {
                if (rallyEvent.uid === eventID) {
                    // inRallies = true;
                    eventType = 'leadHistorical';
                }
            });
        }
        if (eventType === 'future' || eventType === 'historical') {
            if (eventType === 'future') {
                rallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() +
                            '-' +
                            m.toString() +
                            '-' +
                            d.toString();
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
                        setGraphicFileName(rallyEvent?.graphic);
                        let tmpStr = 'events/' + eventID + rallyEvent?.graphic;
                        setGraphicLocation(tmpStr);
                        setApproved(rallyEvent?.approved);
                        setContactFirstName(rallyEvent?.contact?.firstName);
                        setContactLastName(rallyEvent?.contact?.lastName);
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
            if (eventType === 'historical') {
                doneRallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() +
                            '-' +
                            m.toString() +
                            '-' +
                            d.toString();
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
                        setGraphicFileName(rallyEvent?.graphic);
                        let tmpStr = 'events/' + eventID + rallyEvent?.graphic;
                        setGraphicLocation(tmpStr);
                        setApproved(rallyEvent?.approved);
                        setContactFirstName(rallyEvent?.contact?.firstName);
                        setContactLastName(rallyEvent?.contact?.lastName);
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
            if (eventType === 'leadFuture') {
                leadRallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() +
                            '-' +
                            m.toString() +
                            '-' +
                            d.toString();
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
                        setGraphicFileName(rallyEvent?.graphic);
                        let tmpStr = 'events/' + eventID + rallyEvent?.graphic;
                        setGraphicLocation(tmpStr);
                        setApproved(rallyEvent?.approved);
                        setContactFirstName(rallyEvent?.contact?.firstName);
                        setContactLastName(rallyEvent?.contact?.lastName);
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
            if (eventType === 'leadHistorical') {
                leadDoneRallies.forEach((rallyEvent) => {
                    if (rallyEvent.uid === eventID) {
                        //-----------------
                        // convert the eventDate from number to date to display
                        let ddbDate = rallyEvent.eventDate;
                        const y = ddbDate.substring(0, 4);
                        const m = ddbDate.substring(4, 6);
                        const d = ddbDate.substring(6, 8);
                        let smDate =
                            y.toString() +
                            '-' +
                            m.toString() +
                            '-' +
                            d.toString();
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
                        setGraphicFileName(rallyEvent?.graphic);
                        let tmpStr = 'events/' + eventID + rallyEvent?.graphic;
                        setGraphicLocation(tmpStr);
                        setApproved(rallyEvent?.approved);
                        setContactFirstName(rallyEvent?.contact?.firstName);
                        setContactLastName(rallyEvent?.contact?.lastName);
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
    const validateChurchName = (churchName) => {
        if (churchName.length > 50) {
            return 'max length 50 characters';
        }
        if (churchName.length < 5) {
            return 'minimum length 5 characters';
        }
        if (churchName.length > 4) {
            const testRegex = /^[a-zA-Z\s-]{5,50}\d?$/;
            if (!testRegex.test(churchName)) {
                return 'letters and numbers only';
            }
        }

        return '';
    };
    const validateStreet = (street) => {
        if (!street) {
            return 'Street is required';
        }
        const testRegex = /^[a-zA-Z\d\s.#-]{2,50}$/;
        if (!testRegex.test(street)) {
            return '2-50 characters (optional number)';
        }
        return '';
    };
    const validateCity = (city) => {
        if (!city) {
            return 'City is required';
        }
        const testRegex = /^[A-Za-z\s-]{2,25}$/;
        if (!testRegex.test(city)) {
            return '2-25 characters only';
        }
        return '';
    };

    const validatePostalCode = (postalCode) => {
        const testRegex = /^\d{5}$/;

        if (!testRegex.test(postalCode)) {
            return '5 digit number';
        }

        return '';
    };
    const validateContactFirstName = (contactFirstName) => {
        if (!contactFirstName) {
            return 'First name is required';
        }
        const testRegex = /^[A-Za-z]{2,15}$/;
        if (!testRegex.test(contactFirstName)) {
            return '2-15 characters only';
        }
        return '';
    };
    const validateContactLastName = (contactLastName) => {
        if (!contactLastName) {
            return 'Last name is required';
        }
        const testRegex = /^[a-zA-Z-]{2,19}\d?$/;
        if (!testRegex.test(contactLastName)) {
            return '2-19 characters (optional number)';
        }
        return '';
    };
    const handleSubmitClick = async (event) => {
        event.preventDefault();
        setSpinner();
        //get rally object to update
        let newRally = pateSystem?.rally;
        //now update with form values

        newRally.name = churchName;
        newRally.street = street;
        newRally.city = city;
        newRally.stateProv = stateProv;
        newRally.postalCode = postalCode;
        newRally.contact.firstName = contactFirstName;
        newRally.contact.lastName = contactLastName;
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
        //=======================================
        // check if we need to load new graphics
        // --------------------------------------
        // if graphicFileObj is null, there is
        // no file to upload, keep the original.
        // Otherwise, load and record file name.
        //========================================
        if (graphicFileObj?.name) {
            const previousGraphicFile = pateSystem?.rally?.graphic;

            // we have a new graphic to upload...
            let tmpStr = 'events/' + eventID + graphicFileObj.name;
            // setGraphicLocation(tmpStr);
            const { key } = await Storage.put(tmpStr, graphicFileObj, {
                contentType: 'image/*',
            });

            //=================================
            // if new file name, need to delete
            // the old file name from S3
            //=================================
            if (graphicFileObj.name !== previousGraphicFile) {
                //delete the old file
                if (previousGraphicFile !== 'tbd.png') {
                    let fileToDelete =
                        'events/' + eventID + previousGraphicFile;
                    try {
                        await Storage.remove(fileToDelete);
                    } catch (error) {
                        console.log('ERROR: we failed to remove the old file');
                    }
                }
            }
            //=================================
            // need to save new file name
            //=================================
            newRally.graphic = graphicFileObj.name;
        } else {
            //no file selected for upload, keep
            // the current value
            newRally.graphic = graphicFileName;
        }
        // let DANOTEST = true;
        // if (DANOTEST) return;
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
        clearSpinner();
        history.push('/serve');
    };
    const handleStateChange = ({ newValue }) => {
        console.log('stateProv:', newValue);
        setStateProv(newValue);
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
            // case 'stateProv':
            //     setStateProv(value);
            //     break;
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
                setGraphicFileName(value);
                break;
            case 'isApproved':
                if (currentUser?.residence?.stateLead === stateProv) {
                    setApproved(!isApproved);
                }
                break;
            case 'eventStatus':
                setEventStatus(value);
                break;
            case 'contactFirstName':
                setContactFirstName(value);
                break;
            case 'contactLastName':
                setContactLastName(value);
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
    printObject('rallyEvent:\n', rallyEvent);
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
                        <Stack>
                            <TextField
                                label='Church Name'
                                variant='outlined'
                                size='small'
                                margin='dense'
                                fullWidth
                                className={classes.input}
                                InputProps={{
                                    style: {
                                        padding: '0px',
                                        margin: '0px',
                                        fontWeight: '200',
                                        fontSize: '1.2rem',
                                    },
                                    sx: {
                                        bgcolor: '#f5f5f5', // sets the fill color
                                        borderRadius: 1, // sets the border radius
                                    },
                                }}
                                inputlabelprops={{
                                    shrink: true,
                                    style: { paddingBottom: '0px' },
                                }}
                                value={churchName}
                                onChange={(e) => {
                                    const capitalizedStr = e.target.value
                                        .split(' ')
                                        .map(
                                            (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1).toLowerCase()
                                        )
                                        .join(' ');
                                    setChurchName(capitalizedStr);
                                    setChurchNameError(
                                        validateChurchName(e.target.value)
                                    );
                                }}
                                error={churchNameError !== ''}
                                helperText={churchNameError}
                            />
                        </Stack>
                        <Stack>
                            <TextField
                                label='Street'
                                variant='outlined'
                                size='small'
                                margin='dense'
                                fullWidth
                                InputProps={{
                                    style: {
                                        padding: '0px',
                                        margin: '0px',
                                        fontWeight: '200',
                                        fontSize: '1.2rem',
                                    },
                                    sx: {
                                        bgcolor: '#f5f5f5', // sets the fill color
                                        borderRadius: 1, // sets the border radius
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { paddingBottom: '0px' },
                                }}
                                className={classes.input}
                                value={street}
                                onChange={(e) => {
                                    setStreet(e.target.value);
                                    setStreetError(
                                        validateStreet(e.target.value)
                                    );
                                }}
                                error={streetError !== ''}
                                helperText={streetError}
                            />
                        </Stack>
                        <Stack direction='row' spacing={1}>
                            <TextField
                                label='City'
                                variant='outlined'
                                size='small'
                                margin='dense'
                                fullWidth
                                InputProps={{
                                    style: {
                                        padding: '0px',
                                        margin: '0px',
                                        fontWeight: '200',
                                        fontSize: '1.2rem',
                                    },
                                    sx: {
                                        bgcolor: '#f5f5f5', // sets the fill color
                                        borderRadius: 1, // sets the border radius
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { paddingBottom: '0px' },
                                }}
                                className={classes.input}
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    setCityError(validateCity(e.target.value));
                                }}
                                error={cityError !== ''}
                                helperText={cityError}
                            />
                        </Stack>
                        <Stack direction='row' spacing={1}>
                            <Stack>
                                <TextField
                                    label='State/Providence'
                                    size='small'
                                    margin='dense'
                                    select
                                    value={stateProv}
                                    onChange={(event) =>
                                        setStateProv(event.target.value)
                                    }
                                >
                                    {US_STATES.map((state) => (
                                        <MenuItem
                                            key={state.value}
                                            value={state.value}
                                        >
                                            {state.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Stack direction='row' spacing={1}>
                                <TextField
                                    label='Postal Code'
                                    variant='outlined'
                                    size='small'
                                    margin='dense'
                                    maxLength={5}
                                    className={classes.input}
                                    value={postalCode}
                                    InputProps={{
                                        style: {
                                            padding: '0px',
                                            margin: '0px',
                                            fontWeight: '200',
                                            fontSize: '1.2rem',
                                        },
                                        sx: {
                                            bgcolor: '#f5f5f5', // sets the fill color
                                            borderRadius: 1, // sets the border radius
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            paddingBottom: '0px',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    onChange={(e) => {
                                        setPostalCode(
                                            e.target.value.substring(0, 5)
                                        );
                                        setPostalCodeError(
                                            validatePostalCode(
                                                e.target.value.substring(0, 5)
                                            )
                                        );
                                    }}
                                    error={postalCodeError !== ''}
                                    helperText={postalCodeError}
                                />
                            </Stack>
                        </Stack>

                        <div className='serveevent-page__section-header'>
                            Church Contact
                        </div>
                        <Stack>
                            <TextField
                                label='First Name'
                                variant='outlined'
                                required
                                size='small'
                                margin='dense'
                                className={classes.input}
                                InputProps={{
                                    style: {
                                        padding: '0px',
                                        margin: '0px',
                                        fontWeight: '200',
                                        fontSize: '1.2rem',
                                    },
                                    sx: {
                                        bgcolor: '#f5f5f5', // sets the fill color
                                        borderRadius: 1, // sets the border radius
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { paddingBottom: '0px' },
                                }}
                                value={contactFirstName}
                                onChange={(e) => {
                                    setContactFirstName(e.target.value);
                                    setContactFirstNameError(
                                        validateContactFirstName(e.target.value)
                                    );
                                }}
                                error={contactFirstNameError !== ''}
                                helperText={contactFirstNameError}
                            />
                        </Stack>
                        <Stack>
                            <TextField
                                label='Last Name'
                                variant='outlined'
                                required
                                size='small'
                                margin='dense'
                                className={classes.input}
                                InputProps={{
                                    style: {
                                        padding: '0px',
                                        margin: '0px',
                                        fontWeight: '200',
                                        fontSize: '1.2rem',
                                    },
                                    sx: {
                                        bgcolor: '#f5f5f5', // sets the fill color
                                        borderRadius: 1, // sets the border radius
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { paddingBottom: '0px' },
                                }}
                                value={contactLastName}
                                onChange={(e) => {
                                    setContactLastName(e.target.value);
                                    setContactLastNameError(
                                        validateContactLastName(e.target.value)
                                    );
                                }}
                                error={contactLastNameError !== ''}
                                helperText={contactLastNameError}
                            />
                        </Stack>

                        <div className='serveevent-page__data-row-phone'>
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
                        <div className='serveevent-page__section-header'>
                            Logistics
                        </div>
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
                        <div className='serveevent-page__grid-data-box'>
                            <div className='serveevent-page__grid-label'>
                                Message:
                            </div>
                            <div className='serveevent-page__grid-control'>
                                <textarea
                                    rows='4'
                                    cols='18'
                                    name='eventMessage'
                                    id='eventMessage'
                                    onChange={handleChange}
                                    value={eventMessage}
                                ></textarea>
                            </div>
                        </div>
                        <div className='serveevent-page__grid-data-box'>
                            <div className='serveevent-page__grid-label'>
                                Approved:
                            </div>
                            <div className='serveevent-page__grid-control'>
                                {currentUser?.role === 'lead' ||
                                currentUser?.role === 'director' ? (
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
                        <div className='serveevent-page__section-header'>
                            Meal Details
                        </div>
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
                        <div className='serveevent-page__grid-data-box'>
                            <div className='serveevent-page__grid-label'>
                                Message:
                            </div>
                            <div className='serveevent-page__grid-control'>
                                <textarea
                                    rows='4'
                                    cols='18'
                                    name='mealMessage'
                                    id='mealMessage'
                                    onChange={handleChange}
                                    value={mealMessage}
                                ></textarea>
                            </div>
                        </div>
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

                        <>
                            <div className='serveevent-page__section-header'>
                                Graphic File
                            </div>
                            <div className='serveevent-page__graphic-section'>
                                <div className='serveevent-page__graphic-preview'>
                                    {graphicLocation && (
                                        <AmplifyS3Image
                                            style={{ '--width': '100%' }}
                                            imgKey={graphicLocation}
                                        />
                                    )}
                                    {graphicFileName}
                                </div>

                                <div className='serveevent-page__graphic-file-control'>
                                    <div>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            id='graphicFile'
                                            name='graphicFile'
                                            onChange={(e) =>
                                                setGraphicFileObj(
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </>

                        <div className='serveevent-page__section-header'>
                            Tally Information
                        </div>
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
                                    {rallyEvent?.registrations?.items.length >
                                    0 ? (
                                        rallyEvent.registrations.items.map(
                                            (rege) => (
                                                <RegistrationItem
                                                    key={rege.id}
                                                    regItem={rege}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div>No registrations</div>
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
