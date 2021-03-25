import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import './serve.styles.scss';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
}) => {
    // const [plan, setPlan] = useState([]);
    const [churchName, setChurchName] = useState("");
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [stateProv, setStateProv] = useState('');
    const [postalCode, setPostalCode] = useState('');;
    const [eventDate, setEventDate] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [graphicFile, setGraphicFile] = useState('');
    const [approval, setApproval] = useState(false);
    
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [repName, setRepName] = useState('');
    const [repEmail, setRepEmail] = useState('');
    const [repPhone, setRepPhone] = useState('');
    const [repID, setRepID] = useState("");
    const [mealTime, setMealTime] = useState('');
    const [mealCost, setMealCost] = useState('');
    const [mealCount, setMealCount] = useState(0);
    const [attendanceCount, setAttendanceCount] = useState(0);
    const history = useHistory();



    const util = require('util');
    useEffect(() => {}, []);

    useEffect(() => {}, [pateSystem.showSpinner]);
    const handleSubmitClick = (event) => {
        event.preventDefault();
    }
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
                setGraphicFile(value);
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
                setMessage(value);
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
            case 'repID':
                setRepID(value);
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
            case 'attendanceCount':
                setAttendanceCount(value);
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
                                <label htmlFor='churchName'>Church</label>
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
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
