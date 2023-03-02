import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PhoneInput from 'react-phone-input-2';
import {
    Stack,
    TextField,
    MenuItem,
    Typography,
    TextareaAutosize,
    Box,
    Button,
    InputAdornment,
} from '@mui/material';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Modal from '../../components/modals/wrapper.modal';
import InputErrors from '../../components/modals/new-event/new-event-input-error.modal';
import SuccessModal from '../../components/modals/new-event/new-event-success.modal';
import SuccessMessage from '../../components/modals/new-event/new-event-success-msg.component';
import { US_STATES } from '../../constants/pate';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import { updateStateRepRally } from '../../redux/stateRep/stateRep.actions';
import './newEvent.styles.scss';
import useStyles from './new-event.styles';
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
    const classes = useStyles();
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [showRegistrationSuccess, setShowRegistrationSuccess] =
        useState(false);
    const [affiliate, setAffiliate] = useState('CRP8');
    const [churchName, setChurchName] = useState('');
    const [churchNameError, setChurchNameError] = useState('');
    const [street, setStreet] = useState('');
    const [streetError, setStreetError] = useState('');
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateProv, setStateProv] = useState(
        currentUser?.residence.stateProv
    );
    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');

    const [contactName, setContactName] = useState('');
    const [contactFirstName, setContactFirstName] = useState('');
    const [contactFirstNameError, setContactFirstNameError] = useState('');
    const [contactLastName, setContactLastName] = useState('');
    const [contactLastNameError, setContactLastNameError] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactEmailError, setContactEmailError] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactPhoneError, setContactPhoneError] = useState('');

    const [eventStatus, setEventStatus] = useState('');
    const [eventMessage, setEventMessage] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [mealCost, setMealCost] = useState('');
    const [mealMessage, setMealMessage] = useState('');
    const [mealDeadline, setMealDeadline] = useState('');

    const history = useHistory();

    useEffect(() => {
        //++++++++++++++++++++++++++++++++++++++++
        // useEffect on load
        //++++++++++++++++++++++++++++++++++++++++
        if (!currentUser.isLoggedIn) history.push('/');
        //get the reference to the current event and load to useState
    }, []);

    useEffect(() => {}, [pateSystem.showSpinner]);

    //    =============================
    //    VALIDATIONS
    //    -----------------------------
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

    //    =======================================
    //    handles...
    //    ---------------------------------------
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
        // if (stateProv?.length < 2) {
        //     okayToProceed = false;
        //     fieldMessage.Location_State = 'is required';
        // }
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
            affiliate: affiliate,
            eventCompKey: '',
            eventRegion: '',
            geolocation: {
                lat: '',
                lng: '',
            },
            region: '',
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
        newRally.affiliate = affiliate;
        newRally.eventRegion = 'east';
        newRally.region = 'us#east';

        newRally.geolocation.lat = '';
        newRally.geolocation.lng = '';
        var e = document.getElementById('stateProv');
        newRally.stateProv = e.value;
        newRally.eventCompKey =
            eventDate.slice(0, 4) +
            '#' +
            eventDate.slice(4, 6) +
            '#' +
            eventDate.slice(6, 8) +
            '#' +
            e.value +
            '#' +
            currentUser.uid +
            '#TBD';
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
            window.alert('DYNAMO CALL NOT IMPLEMENTED (NEP:344)');

            // await fetch(
            //     'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            //     {
            //         method: 'POST',
            //         body: JSON.stringify({
            //             operation: 'createEvent',
            //             payload: {
            //                 Item: newRally,
            //             },
            //         }),
            //         headers: {
            //             'Content-type': 'application/json; charset=UTF-8',
            //         },
            //     }
            // )
            //     .then((response) => response.json())
            //     .then((data) => {
            //         const util = require('util');
            //         console.log(
            //             'db data returned: \n' +
            //                 util.inspect(data, {
            //                     showHidden: false,
            //                     depth: null,
            //                 })
            //         );
            //     });
        }
        //next call is to async the above update
        updateDb();
        //now update the stateRep.rally
        updateStateRepRally(newRally);
        setShowRegistrationSuccess(true);
        // history.push('/serve');
    };
    const handleMealCostChange = (event) => {
        setMealCost(event.target.value);
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

    const hasErrors =
        churchNameError !== '' ||
        streetError !== '' ||
        cityError !== '' ||
        postalCodeError !== '' ||
        contactFirstNameError !== '' ||
        contactLastNameError !== '' ||
        contactPhoneError !== '' ||
        contactEmailError !== '';
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='newevent-page__wrapper'>
                <div className='newevent-page__form-box'>
                    <div className='newevent-page__header'>NEW RALLY</div>
                    <div className='newevent-page__data-input-box'>
                        <Stack direction='row' justifyContent='center'>
                            <Typography variant='h5'>Location</Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='center'>
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
                                inputLabelProps={{
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
                                inputLabelProps={{
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
                        <Stack
                            direction='row'
                            spacing={1}
                            justifyContent='center'
                        >
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
                                    inputLabelProps={{
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
                        <Stack direction='row' justifyContent='center'>
                            <Typography variant='h5'>Church Contact</Typography>
                        </Stack>
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
                                    inputLabelProps={{
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
                                    inputLabelProps={{
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

                        <Stack direction='row' justifyContent='center'>
                            <Typography variant='h5'>Logistics</Typography>
                        </Stack>
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
                        <Stack direction='row' justifyContent='center'>
                            <Typography variant='h5'>
                                Meal/Food Information
                            </Typography>
                        </Stack>
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
                            <Stack direction='row' justifyContent='center'>
                                <Typography variant='h6'>
                                    Desired RSVP Deadline
                                </Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
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

                        <div className='newevent-page__button-wrapper'>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={hasErrors}
                                className={classes.button}
                                onClick={handleAddClick}
                            >
                                Add
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
