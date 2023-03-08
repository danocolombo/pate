import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import {
    Stack,
    TextField,
    MenuItem,
    Select,
    Typography,
    TextareaAutosize,
    Box,
    Button,
    InputLabel,
    InputAdornment,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Modal from '../../components/modals/wrapper.modal';
import ConfirmDelete from '../../components/modals/serve-event/serve-event-confirm-delete.modal';
import Spinner from '../../components/spinner/Spinner';
import ModalWrapper from '../../components/modals/wrapper.modal';
import RegistrationItem from '../../components/registration-serve-list-item/registrationServeListItem.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import {
    loadEventRegistrations,
    clearEventRegistrations,
} from '../../redux/registrations/registrations.actions';
import { removeEventFromPateRallies } from '../../redux/pate/pate.actions';
import { removeEventFromCurrentUser } from '../../redux/user/user.actions';
import {
    updateStateRepRally,
    removeRallyFromRallyList,
} from '../../redux/stateRep/stateRep.actions';
import {
    updateGQLEvent,
    updateGQLEventLocation,
    insertGQLMeal,
    updateGQLMeal,
    updateGQLEventContact,
    deleteEventLocation,
    deleteEventContact,
    deleteEvent,
    deleteMeal,
} from '../../pateGraphql/pateGraphql.provider';
import EventUpdateModal from '../../components/modals/serve-event/serve-event-update.modal';
import ConfirmDeleteModal from '../../components/modals/serve-event/serve-event-confirm-delete.modal';
import { printObject, createAWSUniqueID } from '../../utils/helpers';
import { US_STATES } from '../../constants/pate';
import './serveEvent.styles.scss';
import useStyles from './serve-event.styles';
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
    removeEventFromCurrentUser,
    addEventToCurrentUser,
    pate,
}) => {
    let eventID = match?.params?.id;

    //***   rallyEvent used to store event to display   */
    const classes = useStyles();
    const [rallyEvent, setRallyEvent] = useState({});
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
    const [plannedCount, setPlannedCount] = useState('');
    const [actualCount, setActualCount] = useState('');
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
    const [contactPhoneError, setContactPhoneError] = useState('');
    const [eventStatus, setEventStatus] = useState('');
    const [eventStatusError, setEventStatusEffor] = useState('');
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

    const [modalDeleteConfirmIsVisible, setModalDeleteConfirmIsVisible] =
        useState(false);
    const [isEventUpdatedModalVisible, setIsEventUpdatedModalVisible] =
        useState(false);
    const [
        isEventDeleteConfirmModalVisible,
        setIsEventDeleteConfirmModalVisible,
    ] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const eventOptions = [];
    const history = useHistory();

    //const util = require('util');
    useEffect(() => {
        // setSpinner();
        //++++++++++++++++++++++++++++++++++++++++
        // useEffect on load
        //++++++++++++++++++++++++++++++++++++++++
        // console.log('1. ID:  ', createAWSUniqueID());
        // console.log('1. ID:  ', createAWSUniqueID());
        // console.log('1. ID:  ', createAWSUniqueID());
        // console.log('1. ID:  ', createAWSUniqueID());
        if (!currentUser?.authSession?.accessToken?.jwtToken) history.push('/');
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
                                        //save to REDUX (pate.rally)
                                        loadRally(gqlResponse.data.getEvent);
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
                loadRally();

                //todo -- load details into loadEvent()??
                // loadEvent();
                // loadRegistrations();
                // getEventRegistrations(eventID);
            }
        } else {
            // clearEventRegistrations();
        }
        // clearSpinner();
    }, []);
    useEffect(() => {
        // -------------------------------------
        // this is to scroll to the top of the
        // page when modal is displayed
        if (isEventDeleteConfirmModalVisible || isEventUpdatedModalVisible) {
            window.scrollTo(0, 0);
        }
    }, [isEventDeleteConfirmModalVisible, isEventUpdatedModalVisible]);
    //* need to set the status information
    /*
                    The state transitions are as follows
                    state               options
                    -----------------------------------------------------
                    draft               review | cancel
                    review              draft | cancel | approved
                    cancelled           draft
                    approved            draft | cancel | 
                    done                draft
                */

    switch (rallyEvent.status) {
        case 'draft':
            eventOptions.push({ id: 'draft', name: 'Draft' });
            eventOptions.push({
                id: 'review',
                name: 'Ready for Review',
            });
            eventOptions.push({ id: 'cancel', name: 'Cancel' });
            eventOptions.push({ id: 'delete', name: 'Delete' });
            break;
        case 'review':
            eventOptions.push({ id: 'review', name: 'In review' });
            eventOptions.push({
                id: 'draft',
                name: 'Return to Coordinator',
            });
            if (
                currentUser.role === 'lead' ||
                currentUser.role === 'director' ||
                currentUser.role === 'guru'
            ) {
                eventOptions.push({
                    id: 'approved',
                    name: 'Approve',
                });
            }
            eventOptions.push({ id: 'cancel', name: 'Cancel' });
            eventOptions.push({ id: 'delete', name: 'Delete' });
            break;
        case 'approved':
            eventOptions.push({ id: 'approved', name: 'Approved' });
            eventOptions.push({
                id: 'draft',
                name: 'Return to Coordinator',
            });
            eventOptions.push({
                id: 'review',
                name: 'Back to Review',
            });
            eventOptions.push({ id: 'cancel', name: 'Cancel' });
            //eventOptions.push({ id: "delete", name: "Delete" });
            break;
        case 'cancel':
            eventOptions.push({ id: 'cancel', name: 'Cancelled' });
            eventOptions.push({
                id: 'draft',
                name: 'Back to Draft',
            });
            eventOptions.push({ id: 'delete', name: 'Delete' });
            break;
        case 'delete':
            eventOptions.push({ id: 'delete', name: 'Deleted' });
            eventOptions.push({
                id: 'draft',
                name: 'Undelete to Draft',
            });
            break;

        default:
            break;
    }

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
        setSpinner();
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
        clearSpinner();
    };

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
        // 2-50 chars, apostrophe with alpha permitted
        const testRegex =
            /^(?=.{2,50}$)(?!')[A-Za-z0-9' -]+(?:[ .,!?][A-Za-z0-9' -]+)*\.?$/;
        if (!testRegex.test(street)) {
            return '2-50 characters (optional number)';
        }
        return '';
    };
    const validateCity = (city) => {
        if (!city) {
            return 'City is required';
        }
        // 2-25 chars, apostrophe with alpha permitted
        const testRegex =
            /^(?=.{3,25}$)(?!')[A-Za-z0-9' -]+(?:[ .,!?][A-Za-z0-9' -]+)*\.?$/;
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
    const validateEventStatus = (statusValue) => {
        //      =================================================
        //      validation of status to ensure required fields
        //      are provided...
        console.log(statusValue);
        if (statusValue === 'review') {
            let errorFields = [];
            // these are the required fields if trying to send for review
            if (
                churchNameError !== '' ||
                streetError !== '' ||
                cityError !== '' ||
                postalCodeError !== ''
            ) {
                return 'Please fix errors...';
            }
            if (contactFirstName.length < 2) {
                errorFields.push('Contact First Name');
            }
            if (contactLastName.length < 2) {
                errorFields.push('Contact Last Name');
            }
            if (contactLastName.length < 2) {
                errorFields.push('Contact Last Name');
            }
            if (contactPhone.length < 10) {
                errorFields.push('Contact Phone Number');
            }
            if (contactEmail.length < 1) {
                errorFields.push('Contact email is required');
            }
            if (!eventDate) {
                errorFields.push('Event Date is required');
            }
            if (!eventStart) {
                errorFields.push('Start time is require');
            }
            if (!eventEnd) {
                errorFields.push('End time is require');
            }
            if (errorFields.length > 0) {
                return 'Please complete the form';
            } else {
            }
        }

        return '';
    };
    const validateContactPhone = (contactPhone) => {
        const regex = /\d{10}/;
        if (regex.test(contactPhone) || contactPhone.length === 0) {
            return '';
        }
        return true;
    };
    const validateContactEmail = (contactEmail) => {
        if (!contactEmail) {
            return 'Email is required';
        }
        const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(contactEmail)) {
            return 'Email address not supported';
        }

        return '';
    };
    const dismissModal = () => {
        setIsEventUpdatedModalVisible(false);
        setIsEventDeleteConfirmModalVisible(false);
    };
    const handleMealCostChange = (event) => {
        setMealCost(event.target.value);
    };
    const handleSubmitClick = async (event) => {
        // check if contact has changed
        setSpinner();
        if (
            contactFirstName !== rallyEvent.contact.firstName ||
            contactLastName !== rallyEvent.contact.lastName ||
            contactEmail !== rallyEvent.contact.email ||
            contactPhone !== rallyEvent.contact.phone
        ) {
            const contactUpdates = {
                id: rallyEvent.contact.id,
                firstName: contactFirstName,
                lastName: contactLastName,
                email: contactEmail,
                phone: contactPhone,
            };
            const constactUpdateResults = await updateGQLEventContact(
                contactUpdates
            );
            switch (constactUpdateResults.statusCode) {
                case 200:
                    // success !!!
                    console.log('Event contact record updated');
                    break;
                case 401:
                    console.log(
                        'graphql completed, but unexpected results contact update'
                    );
                    printObject('data:\n', constactUpdateResults.data);
                    break;
                default:
                    console.log('try/catch error, contact update see details');
                    printObject('request payload:\n', contactUpdates);
                    printObject('data:\n', constactUpdateResults.data);
                    break;
            }
        }

        // check if location has changed
        if (
            street !== rallyEvent.location.street ||
            city !== rallyEvent.location.city ||
            stateProv !== rallyEvent.location.stateProv ||
            postalCode !== rallyEvent.location.postalCode
        ) {
            const locationUpdates = {
                id: rallyEvent.location.id,
                street: street,
                city: city,
                stateProv: stateProv,
                postalCode: postalCode,
            };
            const locationUpdateResults = await updateGQLEventLocation(
                locationUpdates
            );
            switch (locationUpdateResults.statusCode) {
                case 200:
                    // success !!!
                    console.log('Event location record updated');
                    break;
                case 401:
                    console.log(
                        'graphql completed, but unexpected results location update'
                    );
                    printObject('data:\n', locationUpdateResults.data);
                    break;
                default:
                    console.log('try/catch error, location update see details');
                    printObject('request payload:\n', locationUpdates);
                    printObject('data:\n', locationUpdateResults.data);
                    break;
            }
        }
        // check if meal has changed
        // rallyEvent.meal may be null, if so, see if any new data
        // is added, if so, update.
        // if rallyEvent.meal is NOT null, need to check the values for
        // for change
        let mealUpdates = {};
        const uniqueMealId = createAWSUniqueID();
        if (rallyEvent.meal === null) {
            if (
                mealTime !== '' ||
                mealCost !== '' ||
                mealCount !== '' ||
                mealsServed !== '' ||
                mealMessage !== '' ||
                mealDeadline !== ''
            ) {
                // this is a new insert

                mealUpdates.id = uniqueMealId;
                mealUpdates.startTime = mealTime;
                mealUpdates.cost = mealCost;
                mealUpdates.plannedCount = mealCount;
                mealUpdates.actualCount = mealsServed;
                mealUpdates.message = mealMessage;
                mealUpdates.deadline = mealDeadline;
                mealUpdates.mealEventId = rallyEvent.id;
            }
            const mealInsertResults = await insertGQLMeal(mealUpdates);
            switch (mealInsertResults.statusCode) {
                case 200:
                    // success !!!
                    console.log('Event meal record inserted');
                    break;
                case 401:
                    console.log(
                        'graphql completed, but unexpected results meal insert'
                    );
                    printObject('data:\n', mealInsertResults.data);
                    break;
                default:
                    console.log('try/catch error, meal insert see details');
                    printObject('request payload:\n', mealUpdates);
                    printObject('data:\n', mealInsertResults.data);
                    break;
            }
        } else {
            if (
                mealTime !== rallyEvent.meal.startTime ||
                mealCost !== rallyEvent.meal.cost ||
                mealCount !== rallyEvent.mealPlannedCount ||
                mealsServed !== rallyEvent.actualCount ||
                mealMessage !== rallyEvent.message ||
                mealDeadline !== rallyEvent.deadline
            ) {
                mealUpdates.id = rallyEvent.meal.id;
                mealUpdates.startTime = mealTime;
                mealUpdates.cost = mealCost;
                mealUpdates.plannedCount = mealCount;
                mealUpdates.actualCount = mealsServed;
                mealUpdates.message = mealMessage;
                mealUpdates.deadline = mealDeadline;
                mealUpdates.mealEventId = rallyEvent.id;
            }
            const mealUpdateResults = await updateGQLMeal(mealUpdates);
            switch (mealUpdateResults.statusCode) {
                case 200:
                    // success !!!
                    console.log('Event meal record updated');
                    break;
                case 401:
                    console.log(
                        'graphql completed, but unexpected results meal update'
                    );
                    printObject('data:\n', mealUpdateResults.data);
                    break;
                default:
                    console.log('try/catch error, meal update see details');
                    printObject('request payload:\n', mealUpdates);
                    printObject('data:\n', mealUpdateResults.data);
                    break;
            }
        }

        // check if event has changed
        if (
            eventStatus !== rallyEvent.status ||
            churchName !== rallyEvent.name ||
            eventDate !== rallyEvent.eventDate ||
            eventStart !== rallyEvent.startTime ||
            eventEnd !== rallyEvent.endTime ||
            graphicFileName !== rallyEvent.graphic ||
            eventMessage !== rallyEvent.message ||
            attendeeCount !== rallyEvent.actualCount ||
            registrationCount !== rallyEvent.plannedCount
        ) {
            const eventUpdates = {
                id: rallyEvent.id,
                name: churchName,
                status: eventStatus,
                eventDate: eventDate,
                startTime: eventStart,
                endTime: eventEnd,
                message: eventMessage,
                graphic: graphicFileName,
                eventMealId:
                    mealUpdates?.id != null && mealUpdates.id !== ''
                        ? mealUpdates.id
                        : rallyEvent.eventMealId,

                plannedCount: attendeeCount,
                actualCount: registrationCount,
                mealPlannedCount: mealCount,
                mealActualCount: mealsServed,
            };
            const eventUpdateResults = await updateGQLEvent(eventUpdates);
            switch (eventUpdateResults.statusCode) {
                case 200:
                    // success !!!
                    console.log('Event record updated');
                    break;
                case 401:
                    console.log('graphql completed, but unexpected results');
                    printObject('data:\n', eventUpdateResults.data);
                    break;
                default:
                    console.log('try/catch error, see details');
                    printObject('request payload:\n', eventUpdates);
                    printObject('data:\n', eventUpdateResults.data);
                    break;
            }
        }

        //todo-gql  - NEED  TO UPDATE REDUX NOW

        clearSpinner();
        setIsEventUpdatedModalVisible(true);
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
            case 'mealTime':
                setMealTime(value);
                break;
            case 'eventEnd':
                setEventEnd(value);
                break;
            case 'mealDeadline':
                setMealDeadline(value);
                break;
            default:
                break;
        }
    };
    // const handleCancelClick = () => {
    //     history.push('/serve');
    // };
    const handleDeleteRequest = () => {
        setIsEventDeleteConfirmModalVisible(true);
    };
    const handleDeleteConfirm = async () => {
        setIsEventDeleteConfirmModalVisible(false);
        setSpinner();

        //*  1. delete eventLocation
        const deleteLocationResults = await deleteEventLocation(
            rallyEvent.location.id
        );
        if (deleteLocationResults.statusCode !== 200) {
            printObject('deleteLocation failure:\n', deleteLocationResults);
        }
        //*  2. delete eventContact
        const deleteContactResults = await deleteEventContact(
            rallyEvent.contact.id
        );
        if (deleteContactResults.statusCode !== 200) {
            printObject('deleteContact failure:\n', deleteContactResults);
        }
        //*  3. Check if there is meal, if so, delete
        if (rallyEvent.meal !== null && rallyEvent?.meal?.id) {
            const deleteMealResults = await deleteMeal(rallyEvent.meal.id);
            if (deleteMealResults.statusCode !== 200) {
                printObject('deleteMealResults failure:\n', deleteMealResults);
            }
        }
        //*  4. delete event
        const deleteEventResults = await deleteEvent(rallyEvent.id);
        if (deleteEventResults.statusCode !== 200) {
            printObject('deleteEventResults failure:\n', deleteEventResults);
        }
        //*  5. remove from REDUX (currentUser.events)
        const eventItemId = currentUser.events.items.find(
            (e) => e.id === rallyEvent.id
        );
        if (eventItemId) {
            removeEventFromCurrentUser(rallyEvent.id);
        }

        //*  6. remove from REDUX (stateRep/stateLead)
        if (
            currentUser.role === 'lead' ||
            currentUser.role === 'director' ||
            currentUser.role === 'guru'
        ) {
            const leadEventId = pateSystem.rallies.find(
                (e) => e.id === rallyEvent.id
            );
            if (leadEventId) {
                removeEventFromPateRallies(rallyEvent.id);
            }
        }

        clearSpinner();
        let DANO = true;
        if (DANO) {
            history.goBack();
        }

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

    printObject('rallyEvent:\n', rallyEvent);
    const hasErrors =
        churchNameError !== '' ||
        contactFirstNameError !== '' ||
        eventStatusError !== '' ||
        contactLastNameError !== '';
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='serveevent-page__wrapper'>
                <div className='serveevent-page__form-box'>
                    <div className='serveevent-page__header'>EVENT</div>
                    <div className='serveevent-page__data-input-box'>
                        <Stack>
                            <InputLabel id='meeting-state-select-label'>
                                Event Status
                            </InputLabel>
                            <Select
                                labelId='meeting-state-select-label'
                                id='meeting-state-select'
                                style={{
                                    padding: '0px',
                                    margin: '0px',
                                    backgroundColor: eventStatusError
                                        ? 'yellow'
                                        : null,
                                }}
                                value={eventStatus}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setEventStatus(value);
                                    setEventStatusEffor(
                                        validateEventStatus(value)
                                    );
                                }}
                                sx={{
                                    '& .Mui-selected.Mui-select-approved': {
                                        color: 'green',
                                        backgroundColor: 'green',
                                    },
                                    '& .Mui-selected.Mui-select-rejected': {
                                        color: 'white',
                                        backgroundColor: 'red',
                                    },
                                }}
                            >
                                {eventOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {eventStatusError && (
                                <Typography color='error' variant='subtitle2'>
                                    {eventStatusError}
                                </Typography>
                            )}
                        </Stack>
                        <div className='serveevent-page__section-header'>
                            Location
                        </div>
                        {/* <div className='serveevent-page__grid-data-box'>
                            <EventStatusSelect
                                value={eventStatus}
                                onChange={handleEventStatusChange}
                            />
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
                        </div> */}
                        <Box
                            sx={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '5px',
                                marginX: '5px',
                                maxWidth: 'calc(100%)',
                                minWidth: 'calc(90%)',
                                margin: '0 auto',
                            }}
                        >
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
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
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
                                        setCityError(
                                            validateCity(e.target.value)
                                        );
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
                                                    e.target.value.substring(
                                                        0,
                                                        5
                                                    )
                                                )
                                            );
                                        }}
                                        error={postalCodeError !== ''}
                                        helperText={postalCodeError}
                                    />
                                </Stack>
                            </Stack>
                        </Box>
                        <div className='serveevent-page__section-header'>
                            Church Contact
                        </div>
                        <Box
                            sx={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '5px',
                                marginX: '5px',
                                maxWidth: 'calc(100%)',
                                minWidth: 'calc(90%)',
                                margin: '0 auto',
                            }}
                        >
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
                                            validateContactFirstName(
                                                e.target.value
                                            )
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
                                            validateContactLastName(
                                                e.target.value
                                            )
                                        );
                                    }}
                                    error={contactLastNameError !== ''}
                                    helperText={contactLastNameError}
                                />
                            </Stack>

                            <Stack
                                direction='column'
                                spacing={1}
                                align='center'
                                sx={{ marginTop: 1, marginBottom: 1 }}
                            >
                                <PhoneInput
                                    onlyCountries={['us']}
                                    country='us'
                                    disableCountryCode
                                    disableDropdown
                                    value={contactPhone}
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        fontSize: 14,
                                        color: 'black',
                                        backgroundColor: '#f5f5f5',
                                    }}
                                    onChange={(contactPhone) => {
                                        setContactPhone(contactPhone);
                                        setContactPhoneError(
                                            validateContactPhone(contactPhone)
                                        );
                                    }}
                                    inputStyle={{
                                        fontSize: '20px',
                                        color: 'black',
                                    }}
                                    inputProps={{
                                        padding: 0,
                                        fontSize: 24,
                                        name: 'Cell',
                                        margin: 0,
                                        required: true,
                                        placeholder: '(xxx) xxx-xxxx',
                                    }}
                                />
                                {contactPhoneError && (
                                    <span
                                        style={{
                                            color: 'red',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Valid phone required.
                                    </span>
                                )}
                            </Stack>
                            <Stack direction='row' spacing={1}>
                                <TextField
                                    label='Contact Email'
                                    type='email'
                                    variant='outlined'
                                    size='small'
                                    margin='dense'
                                    fullWidth
                                    className={classes.input}
                                    value={contactEmail}
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
                                        style: { paddingBottom: '5px' },
                                    }}
                                    onChange={(e) => {
                                        setContactEmail(e.target.value);
                                        setContactEmailError(
                                            validateContactEmail(e.target.value)
                                        );
                                    }}
                                    error={contactEmailError !== ''}
                                    helperText={contactEmailError}
                                />
                            </Stack>
                        </Box>
                        <div className='serveevent-page__section-header'>
                            Logistics
                        </div>
                        <Box
                            sx={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '5px',
                                marginX: '5px',
                                maxWidth: 'calc(100%)',
                                minWidth: 'calc(90%)',
                                margin: '0 auto',
                            }}
                        >
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.2rem',
                                        paddingRight: '5px',
                                    }}
                                >
                                    Date:
                                </div>
                                <input
                                    type='date'
                                    id='rallyDate'
                                    name='rallyDate'
                                    onChange={handleChange}
                                    value={eventDate}
                                    style={{
                                        fontSize: '1.2rem',
                                        maxWidth: '150px',
                                    }}
                                    required
                                />
                            </Stack>
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.2rem',
                                        paddingRight: '5px',
                                    }}
                                >
                                    Start Time:
                                </div>
                                <input
                                    type='time'
                                    id='eventStart'
                                    name='eventStart'
                                    onChange={handleChange}
                                    value={eventStart}
                                    required
                                    style={{
                                        fontSize: '1.2rem',
                                        maxWidth: '150px',
                                    }}
                                />
                            </Stack>

                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.2rem',
                                        paddingRight: '5px',
                                    }}
                                >
                                    End Time:
                                </div>
                                <input
                                    type='time'
                                    id='eventEnd'
                                    name='eventEnd'
                                    onChange={handleChange}
                                    value={eventEnd}
                                    required
                                    style={{
                                        fontSize: '1.2rem',
                                        maxWidth: '150px',
                                    }}
                                />
                            </Stack>
                            <Stack
                                direction='column'
                                alignItems='center'
                                sx={{ marginTop: '5px' }}
                            >
                                <label htmlFor='event-message'>
                                    Event Message
                                </label>
                                <TextareaAutosize
                                    id='event-message'
                                    aria-label='Event Message'
                                    placeholder=''
                                    minRows={2}
                                    value={eventMessage}
                                    onChange={(event) =>
                                        setEventMessage(event.target.value)
                                    }
                                    style={{
                                        width: '90%',
                                        backgroundColor: '#f5f5f5',
                                        padding: '10px',
                                        margin: '5px',
                                        fontWeight: '200',
                                        fontSize: '1.2rem',
                                    }}
                                />
                            </Stack>
                        </Box>
                        <div className='serveevent-page__section-header'>
                            Meal Details
                        </div>
                        <Box
                            sx={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '5px',
                                marginX: '5px',
                                maxWidth: 'calc(100%)',
                                minWidth: 'calc(90%)',
                                margin: '0 auto',
                            }}
                        >
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.2rem',
                                        paddingRight: '5px',
                                    }}
                                >
                                    Meal Time:
                                </div>
                                <input
                                    type='time'
                                    id='mealTime'
                                    name='mealTime'
                                    onChange={handleChange}
                                    value={mealTime}
                                    required
                                    style={{
                                        fontSize: '1.2rem',
                                        maxWidth: '150px',
                                    }}
                                />
                            </Stack>
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                }}
                            >
                                <TextField
                                    label='Cost'
                                    value={mealCost}
                                    onChange={handleMealCostChange}
                                    type='number'
                                    size='small'
                                    margin='dense'
                                    step='0.01'
                                    sx={{
                                        maxWidth: '100px',
                                        marginLeft: '10px',
                                        alignItems: 'center',
                                        backgroundColor: '#f5f5f5',
                                        justifyContent: 'center',
                                        '& input': {
                                            textAlign: 'center',
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '1.2rem',
                                            padding: '0px',
                                            margin: '0px',
                                            '&.Mui-focused': {
                                                fontSize: '1.2rem',
                                                color: 'green', // You can change this to any color you like
                                            },
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                $
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '2px',
                                }}
                            >
                                <TextField
                                    label='RSVPs'
                                    value={mealCount}
                                    type='number'
                                    size='small'
                                    margin='dense'
                                    step='1'
                                    sx={{
                                        maxWidth: '120px',
                                        marginLeft: '10px',
                                        alignItems: 'center',
                                        backgroundColor: '#f5f5f5',
                                        justifyContent: 'center',
                                        '& input': {
                                            textAlign: 'center',
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '1.2rem',
                                            padding: '0px',
                                            margin: '0px',
                                        },
                                    }}
                                />
                                <TextField
                                    label='Served'
                                    value={mealsServed}
                                    type='number'
                                    size='small'
                                    margin='dense'
                                    step='1'
                                    sx={{
                                        maxWidth: '120px',
                                        marginLeft: '10px',
                                        alignItems: 'center',
                                        backgroundColor: '#f5f5f5',
                                        justifyContent: 'center',
                                        '& input': {
                                            textAlign: 'center',
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '1.2rem',
                                            padding: '0px',
                                            margin: '0px',
                                        },
                                    }}
                                />
                            </Stack>
                            <Stack
                                direction='column'
                                alignItems='center'
                                sx={{ marginTop: '5px' }}
                            >
                                <label htmlFor='meal-message'>
                                    Meal Message
                                </label>
                                <TextareaAutosize
                                    id='meal-message'
                                    aria-label='Meal Message'
                                    placeholder=''
                                    minRows={2}
                                    value={mealMessage}
                                    onChange={(event) =>
                                        setMealMessage(event.target.value)
                                    }
                                    style={{
                                        width: '90%',
                                        backgroundColor: '#f5f5f5',
                                        padding: '10px',
                                        margin: '5px',
                                        fontWeight: '200',
                                        fontSize: '1.2rem',
                                    }}
                                />
                            </Stack>
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.2rem',
                                        paddingRight: '5px',
                                    }}
                                >
                                    Date:
                                </div>
                                <input
                                    type='date'
                                    id='mealDeadline'
                                    name='mealDeadline'
                                    onChange={handleChange}
                                    value={mealDeadline}
                                    style={{
                                        fontSize: '1.2rem',
                                        maxWidth: '150px',
                                    }}
                                    required
                                />
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '5px',
                                marginX: '5px',
                                maxWidth: 'calc(100%)',
                                minWidth: 'calc(90%)',
                                margin: '0 auto',
                            }}
                        >
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
                        </Box>

                        <div className='serveevent-page__section-header'>
                            Tally Information
                        </div>
                        <Box
                            sx={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '5px',
                                marginX: '5px',
                                maxWidth: 'calc(100%)',
                                minWidth: 'calc(90%)',
                                margin: '0 auto',
                            }}
                        >
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '2px',
                                }}
                            >
                                <TextField
                                    label='Registrations'
                                    value={registrationCount}
                                    type='number'
                                    size='small'
                                    margin='dense'
                                    step='1'
                                    sx={{
                                        maxWidth: '120px',
                                        marginLeft: '10px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f5f5f5',
                                        '& input': {
                                            textAlign: 'center',
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '1.2rem',
                                            padding: '0px',
                                            margin: '0px',
                                        },
                                    }}
                                />
                                <TextField
                                    label='Attendees'
                                    value={attendeeCount}
                                    type='number'
                                    size='small'
                                    margin='dense'
                                    step='1'
                                    sx={{
                                        maxWidth: '120px',
                                        marginLeft: '10px',
                                        alignItems: 'center',
                                        backgroundColor: '#f5f5f5',
                                        justifyContent: 'center',
                                        '& input': {
                                            textAlign: 'center',
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '1.2rem',
                                            padding: '0px',
                                            margin: '0px',
                                        },
                                    }}
                                />
                            </Stack>
                        </Box>
                        <div className={classes.registrationComponentWrapper}>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={hasErrors}
                                className={classes.button}
                                onClick={handleSubmitClick}
                            >
                                Update
                            </Button>
                            <Button
                                variant='contained'
                                sx={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    marginLeft: '10px',
                                }}
                                className={classes.button}
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </Button>
                            {rallyEvent.status !== 'approved' &&
                                rallyEvent.registrations?.items?.length < 1 && (
                                    <>
                                        <Button
                                            variant='contained'
                                            sx={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                marginLeft: '10px',
                                            }}
                                            className={classes.button}
                                            onClick={() =>
                                                handleDeleteRequest()
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
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

            <ModalWrapper isOpened={isEventDeleteConfirmModalVisible}>
                <ConfirmDeleteModal
                    onConfirm={() => handleDeleteConfirm()}
                    onClose={() => dismissModal()}
                ></ConfirmDeleteModal>
            </ModalWrapper>
            <ModalWrapper isOpened={isEventUpdatedModalVisible}>
                <EventUpdateModal
                    onClose={() => dismissModal()}
                ></EventUpdateModal>
            </ModalWrapper>
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
    removeEventFromCurrentUser: (id) =>
        dispatch(removeEventFromCurrentUser(id)),
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
