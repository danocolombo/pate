import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import RegistrationItem from '../../components/registration-serve-list-item/registrationServeListItem.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import {
    loadEventRegistrations,
    clearEventRegistrations,
} from '../../redux/registrations/registrations.actions';
import EventRegistrations from '../../components/event-registrations/event-registrations.component';
// import ServeEvent from '../../components/serve-event/serve-event.component';
import './serveEvent.styles.scss';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pate,
    currentUser,
    repRallies,
    leadRallies,
    loadRally,
    eventRegistrations,
    loadEventRegistrations,
    clearEventRegistrations,
}) => {
    let eventID = match?.params?.id;
    console.log('serveEvent: ' + eventID);
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
    const [mealMessage, setMealMessage] = useState('');
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
    let theEventIs = {};
    useEffect(() => {
        if (!currentUser.isLoggedIn) history.push('/');
        //get the reference to the current event and load to useState

        loadEvent();
        //     loadRegistrations();
        // } else {
        //     clearEventRegistrations();
        // }
    }, []);

    // useEffect(() => {}, [pate.showSpinner]);

    const loadEvent = async () => {
        //get the event reference.
        // if the eventID is not in our currentUserRallies,
        // that means that Lead is viewing. Go to the db
        // and load into pate.rally
        //????????????????????????????????????????????????
        repRallies.forEach((rallyEvent) => {
            if (rallyEvent.uid === eventID) {
                //-----------------
                // seave the event to redux
                async function loadRallyToPate() {
                    loadRally(rallyEvent);
                    theEventIs = rallyEvent;
                }
                loadRallyToPate();
                // //load the useState
                // //pate.rally, should be the current rally now...
                // setEventDate(theEventIs.eventDate);
                // setChurchName(rallyEvent.name);
                // setStreet(rallyEvent?.street);
                // setCity(rallyEvent?.city);
                // setStateProv(rallyEvent?.stateProv);
                // setPostalCode(rallyEvent?.postalCode);
                // setEventStart(rallyEvent?.startTime);
                // setEventEnd(rallyEvent?.endTime);
                // setGraphic(rallyEvent?.graphic);
                // setApproved(rallyEvent?.approved);
                // setContactName(rallyEvent?.contact?.name);
                // setContactEmail(rallyEvent?.contact?.email);
                // setContactPhone(rallyEvent?.contact?.phone);
                // setEventStatus(rallyEvent?.status);
                // setEventMessage(rallyEvent?.message);
                // setRepName(rallyEvent?.coordinator?.name);
                // setRepEmail(rallyEvent?.coordinator?.email);
                // setRepPhone(rallyEvent?.coordinator?.phone);
                // setMealTime(rallyEvent?.meal?.startTime);
                // setMealCost(rallyEvent?.meal?.cost);
                // setMealCount(rallyEvent?.meal?.count);
                // setMealMessage(rallyEvent?.meal?.message);
                // setAttendeeCount(rallyEvent?.attendees);
                // setRegistrationCount(rallyEvent?.registrations);
            }
        });
        console.log('DONE WITH MAPPING DATA');
    };
    const loadRegistrations = async () => {
        //---------------------------------------------------
        //this function gets the registratoins for an event
        //and loads the instances into redux
        //---------------------------------------------------
        // {
        //     "operation": "getRegistrationsForEvent",
        //     "payload": {
        //       "eid": "65ff55fb33fe4c0447b086188f2e9b1f"
        //     }
        // }
        async function getEventRegistrations() {
            try {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getRegistrationsForEvent',
                            payload: {
                                eid: match?.params?.id,
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
                            'registrations-data:\n' +
                                util.inspect(data.body, {
                                    showHidden: false,
                                    depth: null,
                                })
                        );
                        loadEventRegistrations(data?.body?.Items);
                    });
            } catch (error) {
                clearSpinner();
                console.log('Error fetching registrations \n' + error);
            }
        }
        await getEventRegistrations();
    };
    const handleSubmitClick = (event) => {
        event.preventDefault();
        console.log('SAVE-SAVE-SAVE');
        //get rally object to update
        let newRally = pate?.rally;
        //now update with form values

        newRally.name = churchName;
        newRally.street = street;
        newRally.city = city;
        newRally.stateProv = stateProv;
        newRally.postalCode = postalCode;
        newRally.contact.name = contactName;
        newRally.contact.phone = contactPhone;
        newRally.contact.email = contactEmail;
        newRally.eventDate = eventDate;
        newRally.startTime = eventStart;
        newRally.endTime = eventEnd;
        newRally.message = eventMessage;
        newRally.approved = isApproved;
        newRally.status = eventStatus;
        newRally.meal.startTime = mealTime;
        newRally.meal.cost = mealCost;
        newRally.meal.count = mealCount;
        newRally.meal.message = mealMessage;
        newRally.registrations = registrationCount;
        newRally.attendees = attendeeCount;

        //now update redux for future use.
        loadRally(newRally);
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
        history.push('/serve');
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
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
                setApproved(!isApproved);
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
            case 'mealMessage':
                setMealMessage(value);
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
    return pate.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='servepagewrapper'>
                <div className='serve-pageheader'>EVENT</div>
                <>
                    <>
                        <div className='serve-event-content-wrapper'>
                            <div className='registerform'>
                                <form>
                                    <div>
                                        <label htmlFor='churchName'>
                                            Church
                                        </label>
                                        <input
                                            type='text'
                                            name='churchName'
                                            id='churchName'
                                            value={churchName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='street'>Street</label>
                                        <input
                                            type='text'
                                            id='street'
                                            name='street'
                                            onChange={handleChange}
                                            value={street}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='city'>City</label>
                                        <input
                                            type='text'
                                            id='city'
                                            name='city'
                                            onChange={handleChange}
                                            value={city}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='stateProv'>State</label>
                                        <input
                                            type='text'
                                            id='stateProv'
                                            name='stateProv'
                                            onChange={handleChange}
                                            value={stateProv}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='postalCode'>
                                            Postal Code
                                        </label>
                                        <input
                                            type='text'
                                            id='postalCode'
                                            name='postalCode'
                                            onChange={handleChange}
                                            value={postalCode}
                                            required
                                        />
                                    </div>
                                    {/** church contact info */}
                                    <div className='church-contact-header'>
                                        Church Contact
                                    </div>
                                    <div>
                                        <label htmlFor='contactName'>
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            id='contactName'
                                            name='contactName'
                                            onChange={handleChange}
                                            value={contactName}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='contactPhone'>
                                            Phone
                                        </label>
                                        <input
                                            type='text'
                                            id='contactPhone'
                                            name='contactPhone'
                                            onChange={handleChange}
                                            value={contactPhone}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='contactEmail'>
                                            Email
                                        </label>
                                        <input
                                            type='text'
                                            id='contactEmail'
                                            name='contactEmail'
                                            onChange={handleChange}
                                            value={contactEmail}
                                            required
                                        />
                                    </div>
                                    {/** logisitics info */}
                                    <div className='logistics-header'>
                                        Logistics
                                    </div>
                                    <div>
                                        <label htmlFor='eventDate'>Date</label>
                                        <input
                                            type='text'
                                            id='eventDate'
                                            name='eventDate'
                                            onChange={handleChange}
                                            value={eventDate}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='eventStart'>
                                            Start Time
                                        </label>
                                        <input
                                            type='text'
                                            id='eventStart'
                                            name='eventStart'
                                            onChange={handleChange}
                                            value={eventStart}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='eventEnd'>
                                            End Time
                                        </label>
                                        <input
                                            type='text'
                                            id='eventEnd'
                                            name='eventEnd'
                                            onChange={handleChange}
                                            value={eventEnd}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='eventMessage'>
                                            Message
                                        </label>
                                        <input
                                            type='memo'
                                            id='eventMessage'
                                            name='eventMessage'
                                            onChange={handleChange}
                                            value={eventMessage}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='isApproved'>
                                            Approved
                                        </label>
                                        {currentUser?.stateLead ? (
                                            //this is LEAD
                                            isApproved ? (
                                                <input
                                                    type='checkbox'
                                                    id='isApproved'
                                                    name='isApproved'
                                                    checked
                                                    onClick={handleChange}
                                                    value='true'
                                                />
                                            ) : (
                                                <input
                                                    type='checkbox'
                                                    id='isApproved'
                                                    name='isApproved'
                                                    value='true'
                                                    onClick={handleChange}
                                                />
                                            )
                                        ) : //this is REP
                                        isApproved ? (
                                            <input
                                                type='checkbox'
                                                id='isApproved'
                                                name='isApproved'
                                                checked
                                                value='true'
                                                readOnly='true'
                                            />
                                        ) : (
                                            <input
                                                type='checkbox'
                                                id='isApproved'
                                                name='isApproved'
                                                value='true'
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='eventStatus'
                                            className='sr-event-status-label'
                                        >
                                            Status
                                            <span className='sr-event-status-tooltip'>
                                                Contact your lead for changes
                                            </span>
                                        </label>

                                        <select
                                            type='text'
                                            id='eventStatus'
                                            name='eventStatus'
                                            value={eventStatus}
                                            onChange={handleChange}
                                        >
                                            <option value='draft'>
                                                {STATUS_VALUE[0]}
                                            </option>
                                            <option value='pending'>
                                                {STATUS_VALUE[1]}
                                            </option>
                                            <option value='rejected'>
                                                {STATUS_VALUE[2]}
                                            </option>
                                            <option value='available'>
                                                {STATUS_VALUE[3]}
                                            </option>
                                            <option value='offered'>
                                                {STATUS_VALUE[4]}
                                            </option>
                                            <option value='archived'>
                                                {STATUS_VALUE[5]}
                                            </option>
                                        </select>
                                    </div>
                                    {/** meal info */}
                                    <div className='meal-header'>
                                        Meal Details
                                    </div>
                                    <div>
                                        <label htmlFor='mealTime'>
                                            Start Time
                                        </label>
                                        <input
                                            type='text'
                                            id='mealTime'
                                            name='mealTime'
                                            onChange={handleChange}
                                            value={mealTime}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='mealCost'>Cost</label>
                                        <input
                                            type='text'
                                            id='mealCost'
                                            name='mealCost'
                                            onChange={handleChange}
                                            value={mealCost}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='mealCount'>
                                            Attendees
                                        </label>
                                        <input
                                            type='number'
                                            id='mealCount'
                                            name='mealCount'
                                            onChange={handleChange}
                                            value={mealCount}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='mealMessage'>
                                            Message
                                        </label>
                                        <input
                                            type='memo'
                                            id='mealMessage'
                                            name='mealMessage'
                                            onChange={handleChange}
                                            value={mealMessage}
                                            required
                                        />
                                    </div>
                                    {/** logisitics info */}
                                    <div className='tally-header'>
                                        Tally Information
                                    </div>
                                    <div>
                                        <label htmlFor='registrations'>
                                            Registrations
                                        </label>
                                        <input
                                            type='number'
                                            id='registrations'
                                            name='registrations'
                                            onChange={handleChange}
                                            value={registrationCount}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='attendees'>
                                            Attendees
                                        </label>
                                        <input
                                            type='number'
                                            id='attendees'
                                            name='attendees'
                                            onChange={handleChange}
                                            value={attendeeCount}
                                            required
                                        />
                                    </div>
                                    <div className='submitButton'>
                                        <button onClick={handleSubmitClick}>
                                            SUBMIT
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                </>
                <div className='serve-pageheader'>REGISTRATIONS</div>
                <div className='serve-event-content-wrapper'>
                    {/* 
                        {Object.keys(eventRegistrations).length > 0 ? (
                                eventRegistrations?.map((reg) => (
                                    <RegistrationItem
                                        key={reg.uid}
                                        regItem={reg}
                                        regEvent={pate.rally}
                                    />
                                ))
                            ) : (
                                <div className='serve-item-none-to-report-message'>
                                    None to report
                                </div>
                            )}
                    */}
                </div>
            </div>
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
});
const mapStateToProps = (state) => ({
    pate: state.pate,
    currentUser: state.user.currentUser,
    eventRegistrations: state.registrations.eventRegistrations,
    leadRallies: state.stateLead.rally,
    repRallies: state.stateRep.rally,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
