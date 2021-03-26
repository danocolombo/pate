import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import './serveEvent.styles.scss';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    rallies,
    loadRally,
}) => {
    let eventID = match.params.id;
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
    const [mealMessage, setMealMessage] = useState('');
    const [mealCount, setMealCount] = useState(0);
    const [attendees, setAttendees] = useState(0);
    const [registrations, setRegistrations] = useState(0);

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
        //get the reference to the current event and load to useState
        loadEvent();
    }, []);

    useEffect(() => {}, [pateSystem.showSpinner]);

    const loadEvent = async () => {
        //get the event reference
        rallies.forEach((rallyEvent) => {
            if (rallyEvent.uid === eventID) {
                //-----------------
                // seave the event to redux
                loadRally(rallyEvent);
                //load the useState
                setEventDate(rallyEvent?.eventDate);
                setChurchName(rallyEvent?.location?.name);
                setStreet(rallyEvent?.location?.street);
                setCity(rallyEvent?.location?.city);
                setStateProv(rallyEvent?.location?.stateProv);
                setPostalCode(rallyEvent?.location.postalCode);
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
                setMealCount(rallyEvent?.meal?.count);
                setMealMessage(rallyEvent?.meal?.message);
                setAttendees(rallyEvent?.attendees);
                setRegistrations(rallyEvent?.registrations);
            }
        });
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();
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
                setStateProv(value);
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
                setAttendees(value);
                break;
            case 'registrationCount':
                setRegistrations(value);
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
            <div className='servepagewrapper'>
                <div className='serve-pageheader'>SERVE</div>
                <>
                    <>
                        <div className='registeruserwrapper'>
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
                                            value={registrations}
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
                                            value={attendees}
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
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRally: (rally) => dispatch(loadRally(rally)),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    rallies: state.stateRep.rally,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
