import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import './serveEvent.styles.scss';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    rallies,
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
    const [isApproved, setApproval] = useState(false);

    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [status, setStatus] = useState('');
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
                setApproval(rallyEvent?.approved);
                setContactName(rallyEvent?.contact?.name);
                setContactEmail(rallyEvent?.contact?.email);
                setContactPhone(rallyEvent?.contact?.phone);
                setStatus(rallyEvent?.status);
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
            case 'approval':
                setApproval(value);
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
            case 'status':
                setStatus(value);
                break;
            case 'message':
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
