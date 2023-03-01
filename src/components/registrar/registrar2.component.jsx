import { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import * as mutations from '../../pateGraphql/mutations';
import { withRouter } from 'react-router';
import {
    Card,
    CardContent,
    Typography,
    Paper,
    Stack,
    Box,
    MenuItem,
    CardHeader,
    TextField,
    Button,
    Popper,
    Icon,
    InputLabel,
    InputAdornment,
    IconButton,
    Grid,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import Spinner from '../spinner/Spinner';
import { removeRegistrationFromCurrentUser } from '../../redux/user/user.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import {
    updateCurrentUser,
    addRegistrationToCurrentUser,
    updateRegistrationAndEventNumbersForCurrentUser,
} from '../../redux/user/user.actions';
import { removePateRallyRegistration } from '../../redux/pate/pate.actions';
import { deleteRegistrationProvider } from '../../providers/registrations.provider';
import useStyles from './registrar.styles';
import ModalWrapper from '../../components/modals/wrapper.modal';
import ContactChangedModal from '../../components/modals/registration/registration-contact-changed.modal';
import RegistrationCompleteModal from '../modals/registration/registration-complete.modal';
import RegistrationGuestCompleteModal from '../modals/registration/registration-guest-complete.modal';
import ProfileRequiredToRegister from '../modals/registration/registration-profile-required.modal';
import RegistrationExpired from '../modals/registration/registation-expired.modal';
import RegistrationUpdated from '../modals/registration/registation-updated.modal';
import NotifyRegistrar from '../modals/registration/registation-delete-notify-registrar.modal';
import { US_STATES, NUMBER_SELECT_OPTIONS_0_10 } from '../../constants/pate';
import {
    createNewRegistration,
    updateEventNumbers,
    updateMealNumbers,
} from '../../pateGraphql/pateGraphql.provider';
import { prettyDate, prettyTime, printObject } from '../../utils/helpers';

function Registrar({
    registration,
    eventId,
    currentUser,
    setSpinner,
    updateCurrentUser,
    addRegistrationToCurrentUser,
    updateRegistrationAndEventNumbersForCurrentUser,
    removePateRallyRegistration,
    clearSpinner,
    pateSystem,
}) {
    //printObject('registration:\n', registration);
    const classes = useStyles();
    const history = useHistory();
    const [firstName, setFirstName] = useState(registration.attendeeFirstName);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState(registration.attendeeLastName);
    const [lastNameError, setLastNameError] = useState('');
    const [email, setEmail] = useState(registration.attendeeEmail);
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState(registration.attendeePhone);
    const [phoneError, setPhoneError] = useState('');
    const [street, setStreet] = useState(registration.attendeeStreet);
    const [streetError, setStreetError] = useState('');
    const [city, setCity] = useState(registration.attendeeCity);
    const [cityError, setCityError] = useState('');
    const [stateProv, setStateProv] = useState(registration.attendeeStateProv);
    const [postalCode, setPostalCode] = useState(
        registration.attendeePostalCode
    );
    const [postalCodeError, setPostalCodeError] = useState('');
    const [membershipName, setMembershipName] = useState(
        registration.membershipName
    );
    const [membershipNameError, setMembershipNameError] = useState('');
    const [membershipCity, setMembershipCity] = useState(
        registration.membershipCity
    );
    const [membershipCityError, setMembershipCityError] = useState('');
    const [membershipStateProv, setMembershipStateProv] = useState(
        registration.membershipStateProv
    );

    const [attendance, setAttendance] = useState(registration.attendanceCount);
    const [attendanceError, setAttendanceError] = useState('');
    const [meal, setMeal] = useState(registration.mealCount);
    const [mealError, setMealError] = useState('');
    const [event, setEvent] = useState({});
    const [blockEdit, setBlockEdit] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isContactChangeModalVisible, setIsContactChangeModalVisible] =
        useState(false);
    const [
        isRegistrationCompleteModalVisible,
        setIsRegistrationCompleteModalVisible,
    ] = useState(false);
    const [isUpdateSuccessModalVisible, setIsUpdateSuccessModalVisible] =
        useState(false);
    const [
        isProfileNotificationModalVisible,
        setIsProfileNotificationModalVisible,
    ] = useState(false);
    const [
        isRegistrationExpiredModalVisible,
        setIsRegistrationExpiredModalVisible,
    ] = useState();
    const [isNotifyRegistrarModalVisible, setIsNotifyRegistrarModalVisible] =
        useState(false);
    useEffect(() => {
        if (!currentUser?.authSession?.idToken?.jwtToken) history.push('/');
        async function confirmProfile() {
            // check if uesr has profile filled out, if not throw
            // modal and direct to profile.
            if (
                !currentUser.firstName ||
                !currentUser.lastName ||
                !currentUser?.residence?.street ||
                !currentUser?.residence?.city
            ) {
                setIsProfileNotificationModalVisible(true);
            }
        }
        confirmProfile();
    }, []);
    useEffect(() => {
        // only enable updating of regisration if the event date is > than today
        const today = new Date();
        const date = new Date(registration.event.eventDate);
        // const date = new Date('2023-02-10');  // used to check view-only feature
        if (date.getTime() <= today.getTime()) {
            setIsRegistrationExpiredModalVisible(true);
            setBlockEdit(true);
        } else {
            setIsRegistrationExpiredModalVisible(false);
            setBlockEdit(false);
        }
    }, []);
    const validateFirstName = (firstName) => {
        if (!firstName) {
            return 'First name is required';
        }
        const testRegex = /^[A-Za-z]{2,15}$/;
        if (!testRegex.test(firstName)) {
            return '2-15 characters only';
        }
        return '';
    };
    const validateLastName = (lastName) => {
        if (!lastName) {
            return 'Last name is required';
        }
        const testRegex = /^[a-zA-Z-]{2,19}\d?$/;
        if (!testRegex.test(lastName)) {
            return '2-19 characters (optional number)';
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
    const validateEmail = (email) => {
        if (!email) {
            return 'Email is required';
        }
        const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return 'Email address not supported';
        }

        return '';
    };
    const validatePhone = (phone) => {
        const regex = /\d{10}/;
        console.log('length:', phone.length);
        if (regex.test(phone) || phone.length === 0) {
            return '';
        }
        return true;
    };
    const validateAttendance = (attendance) => {
        if (!attendance) {
            return 'Attendance is required';
        }
        if (parseInt(attendance > 10)) {
            return 'Registration is limited to 10 per request';
        }
        if (parseInt(attendance) < parseInt(meal)) {
            setMeal(attendance);
        }
        return '';
    };
    const validateMeal = (meal) => {
        if (parseInt(meal) > parseInt(attendance)) {
            setMeal(attendance);
        }
        if (parseInt(meal) > parseInt(attendance)) {
            return 'meal <= attendance';
        }
        return '';
    };
    const validateMembershipName = (membershipName) => {
        if (membershipName.length > 50) {
            return 'max length 50 characters';
        }
        if (membershipName.length > 0 && membershipName.length < 5) {
            return 'minimum length 5 characters';
        }
        if (membershipName.length > 4) {
            const testRegex = /^[a-zA-Z\s-]{5,50}\d?$/;
            if (!testRegex.test(membershipName)) {
                return 'letters and numbers only';
            }
        }
        if (membershipName.length === 0) {
            setMembershipCity('');
        }
        return '';
    };
    const validateMembershipCity = (membershipCity) => {
        if (membershipCity.length > 25) {
            return 'max length 25 characters';
        }
        if (membershipCity.length > 0 && membershipCity.length < 3) {
            return 'minimum length 3 characters';
        }
        if (membershipCity.length < 1 && membershipName.length > 0) {
            return 'city required when providing church name';
        }
        return '';
    };
    const dismissModal = () => {
        setIsRegistrationExpiredModalVisible(false);
        setIsUpdateSuccessModalVisible(false);
        setIsNotifyRegistrarModalVisible(false);
    };

    const handleConfirmCancelClick = async () => {
        setIsContactChangeModalVisible(false);
    };
    // const handleRegistraitonCompleteConfirm = async () => {
    //     setIsRegistrationCompleteModalVisible(false);
    //     history.push('/');
    // };
    // const handleProfileConfirm = async () => {
    //     setIsProfileNotificationModalVisible(false);
    //     history.push('/profile');
    // };
    // const handleRegistraitonGuestCompleteConfirm = async () => {
    //     setIsRegistrationGuestCompleteModalVisible(false);
    //     history.push('/');
    // };
    // const handleEmailInfoClick = (event) => {
    //     setAnchorEl(anchorEl ? null : event.currentTarget);
    // };
    // const open = Boolean(anchorEl);

    // const buildRegistration = async ({ incorporated }) => {
    //     console.log('incorporated:', incorporated);
    //     console.log('type:', typeof incorporated);
    //     let inputValues = {
    //         eventRegistrationsId: eventId,
    //         attendeeId: currentUser.id,
    //         attendeeFirstName: firstName,
    //         attendeeLastName: lastName,
    //         attendeeEmail: email,
    //         attendeePhone: phone,
    //         attendeeStreet: street,
    //         attendeeCity: city,
    //         attendeeStateProv: stateProv,
    //         attendeePostalCode: postalCode,
    //         membershipName: membershipName || '',
    //         membershipCity: membershipCity || '',
    //         membershipStateProv: membershipStateProv,
    //         attendanceCount: parseInt(attendance),
    //         mealCount: parseInt(meal),
    //         userRegistrationsId: currentUser.id,
    //     };
    //     if (!incorporated) {
    //         inputValues.attendeeId = '0';
    //     }
    //     return inputValues;
    // };
    const handleDelete = async () => {
        // this is used to delete the registration from the event.
        // this can be done by r/l/d/g from serve event or
        // of the registrar from the profille page
        setIsNotifyRegistrarModalVisible(true);
    };

    const handleDeleteConfirmation = async () => {
        setSpinner();
        //      handle all gql updates...
        const deleteResults = await deleteRegistrationProvider(registration);
        if (deleteResults.statusCode === 200) {
            if (currentUser.if === registration.attendeeId) {
                removeRegistrationFromCurrentUser(registration.id);
            }
        }
        //=====================================
        //      update REDUX....
        //  1. reduce pate.rally.plannedCount
        //  2. recuce pate.rally.plannedMealCount (if applicable)
        //  3. reduct pate.rally.meal.plannedCount (if applicable);
        //  4. remove registration from pate.rally.registrations.items[]
        removePateRallyRegistration(registration);
        clearSpinner();
        setIsNotifyRegistrarModalVisible(false);
        history.goBack();
    };
    const handleSubmit = async () => {
        setSpinner();
        // check if attendee info and currentUser are different
        let updatedRegistration = {};
        const didValuesChange = async () => {
            // origininal object

            updatedRegistration = {
                id: registration.id,
                attendanceCount: attendance,
                mealCount: meal,
                attendeeFirstName: firstName,
                attendeeLastName: lastName,
                attendeeEmail: email,
                attendeePhone: phone,
                attendeeStreet: street,
                attendeeCity: city,
                attendeeStateProv: stateProv,
                attendeePostalCode: postalCode,
                membershipName: membershipName,
                membershipCity: membershipCity,
                membershipStateProv: membershipStateProv,
            };
            const changes = async (updatedRegistration) => {
                // Check attendeeFirstName attribute
                if (
                    updatedRegistration.attendeeFirstName !==
                    registration.attendeeFirstName
                ) {
                    return 1;
                }
                // Check attendeeLastName attribute
                if (
                    updatedRegistration.attendeeLastName !==
                    registration.attendeeLastName
                ) {
                    return 2;
                }
                // Check attendeeEmail attribute
                if (
                    updatedRegistration.attendeeEmail !==
                    registration.attendeeEmail
                ) {
                    return 3;
                }
                // Check attendeePhone attribute
                if (
                    updatedRegistration.attendeePhone !==
                    registration.attendeePhone
                ) {
                    return 4;
                }
                // Check attendeeStreet attribute
                if (
                    updatedRegistration.attendeeStreet !==
                    registration.attendeeStreet
                ) {
                    return 5;
                }
                // Check attendeeCity attribute
                if (
                    updatedRegistration.attendeeCity !==
                    registration.attendeeCity
                ) {
                    return 6;
                }
                // Check attendeeStateProv attribute
                if (
                    updatedRegistration.attendeeStateProv !==
                    registration.attendeeStateProv
                ) {
                    return 7;
                }
                // Check attendeePostalCode attribute
                if (
                    updatedRegistration.attendeePostalCode !==
                    registration.attendeePostalCode
                ) {
                    return 8;
                }
                // Check membershipName attribute
                if (
                    updatedRegistration.membershipName !==
                    registration.membershipName
                ) {
                    return 9;
                }
                // Check membershipCity attribute
                if (
                    updatedRegistration.membershipCity !==
                    registration.membershipCity
                ) {
                    return 10;
                }
                // Check membershipStateProv attribute
                if (
                    updatedRegistration.membershipStateProv !==
                    registration.membershipStateProv
                ) {
                    return 11;
                }
                // Check attendanceCount attribute
                if (
                    updatedRegistration.attendanceCount !==
                    registration.attendanceCount
                ) {
                    return 12;
                }
                // Check mealCount attribute
                if (updatedRegistration.mealCount !== registration.mealCount) {
                    return 13;
                }

                // If no errors were logged, the test passed
                return 0;
            };
            let updateNeeded = await changes(updatedRegistration);
            if (updateNeeded > 0) {
                return true;
            }
            // need to update registration
        };
        let updateNeeded = await didValuesChange();
        if (!updateNeeded) {
            clearSpinner();
            return;
        } else {
            try {
                let eventAttendance;
                let eventMeal;
                let updateRegistrationResults = await API.graphql({
                    query: mutations.updateRegistration,
                    variables: { input: updatedRegistration },
                });
                if (updateRegistrationResults?.data?.updateRegistration?.id) {
                    //----------------------------------
                    // check if numbers....
                    if (
                        registration.mealCount !==
                            updatedRegistration.mealCount ||
                        registration.attendanceCount !==
                            updatedRegistration.attendanceCount
                    ) {
                        eventAttendance = registration?.event?.plannedCount;
                        eventMeal = registration?.event?.mealPlannedCount;
                        const orgAttendance = registration.attendanceCount;
                        const orgMeal = registration.mealCount;
                        let newAttendance = orgAttendance;
                        let newMeal = orgMeal;
                        //* meal check
                        if (updatedRegistration.mealCount !== orgMeal) {
                            //* update meal
                            if (updatedRegistration.mealCount > orgMeal) {
                                //* increase newMeal
                                const delta =
                                    updatedRegistration.mealCount - orgMeal;
                                newMeal = orgMeal + delta;
                                eventMeal = eventMeal + delta;
                            } else {
                                //* decrease newMeal
                                const delta =
                                    orgMeal - updatedRegistration.mealCount;
                                newMeal = orgMeal - delta;
                                eventMeal = eventMeal - delta;
                            }
                        }
                        //* attendance check
                        if (
                            updatedRegistration.attendanceCount !==
                            orgAttendance
                        ) {
                            //* update attendance
                            if (
                                updatedRegistration.attendanceCount >
                                orgAttendance
                            ) {
                                //* increase newAttendance
                                const delta =
                                    updatedRegistration.attendanceCount -
                                    orgAttendance;
                                newAttendance = orgAttendance + delta;
                                eventAttendance = eventAttendance + delta;
                            } else {
                                //* decrease newAttendance
                                const delta =
                                    orgAttendance -
                                    updatedRegistration.attendanceCount;
                                newAttendance = orgAttendance - delta;
                                eventAttendance = eventAttendance - delta;
                            }
                        }
                        try {
                            const inputVariables = {
                                id: registration.event.id,
                                plannedCount: eventAttendance,
                                mealPlannedCount: eventMeal,
                            };
                            const eventResults = await API.graphql({
                                query: mutations.updateEvent,
                                variables: { input: inputVariables },
                            });
                            if (!eventResults?.data?.updateEvent?.id) {
                                // if we cannot update event, don't update meal
                                clearSpinner();
                                return;
                            } else {
                                // event updated now udate the meal
                                const inputVariables = {
                                    id: registration.event.meal.id,
                                    plannedCount: eventMeal,
                                };
                                const mealResults = await API.graphql({
                                    query: mutations.updateMeal,
                                    variables: { input: inputVariables },
                                });
                                if (!mealResults?.data?.updateMeal?.id) {
                                    // if we cannot update event, don't update meal
                                    clearSpinner();
                                    return;
                                }
                            }
                        } catch (error) {
                            printObject(
                                'try failure updating numbers in gql\n:',
                                error
                            );
                            clearSpinner();
                            return;
                        }
                    }
                }
                //*  NEED TO UPDATE THE updateRegistrationResults
                //*  AND SAVE TO REDUX
                const payload = {
                    regId: registration.id,
                    eventId: registration.event.id,
                    regAttendance: updatedRegistration.attendanceCount,
                    regMeal: updatedRegistration.mealCount,
                    eventAttendance: eventAttendance,
                    eventMeal: eventMeal,
                };
                updateRegistrationAndEventNumbersForCurrentUser(payload);
            } catch (err) {
                printObject('ERROR updating registration\n', err);
            }

            clearSpinner();
            setIsUpdateSuccessModalVisible(true);
        }
    };

    const hasErrors =
        firstNameError !== '' ||
        lastNameError !== '' ||
        streetError !== '' ||
        cityError !== '' ||
        postalCodeError !== '' ||
        emailError !== '' ||
        attendanceError !== '' ||
        membershipNameError !== '' ||
        membershipCityError !== '' ||
        mealError !== '' ||
        attendance < 1;
    if (!event) {
        return <Spinner />;
    }
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Card className={classes.card}>
                {event && (
                    <Paper
                        elevation={8}
                        style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                            paddingLeft: '20px',
                            paddingBottom: '10px',
                        }}
                    >
                        <Typography variant='h4' className={classes.header}>
                            Event Registration
                        </Typography>
                        <Typography variant='h6'>
                            {registration.event.name}
                        </Typography>

                        <div>{registration.event?.location?.street}</div>
                        <div style={{ paddingBottom: '5px' }}>
                            {registration.event?.location?.city},{' '}
                            {registration.event?.location?.stateProv}{' '}
                            {registration.event?.location?.postalCode}
                        </div>
                        <div>
                            {prettyDate(registration.event?.eventDate)}{' '}
                            {prettyTime(registration.event?.startTime)}-
                            {prettyTime(registration.event?.endTime)}
                        </div>
                    </Paper>
                )}
                <CardContent>
                    <Stack direction='column' spacing={1}>
                        <Stack direction='row' spacing={2}>
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
                                        readOnly: blockEdit,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { paddingBottom: '0px' },
                                    }}
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                        setFirstNameError(
                                            validateFirstName(e.target.value)
                                        );
                                    }}
                                    error={firstNameError !== ''}
                                    helperText={firstNameError}
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
                                        readOnly: blockEdit,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { paddingBottom: '0px' },
                                    }}
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        setLastNameError(
                                            validateLastName(e.target.value)
                                        );
                                    }}
                                    error={lastNameError !== ''}
                                    helperText={lastNameError}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={1}>
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
                                readOnly: blockEdit,
                            }}
                            InputLabelProps={{
                                shrink: true,
                                style: { paddingBottom: '0px' },
                            }}
                            className={classes.input}
                            value={street}
                            onChange={(e) => {
                                setStreet(e.target.value);
                                setStreetError(validateStreet(e.target.value));
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
                                readOnly: blockEdit,
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
                                InputProps={{ readOnly: blockEdit }}
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
                                    readOnly: blockEdit,
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

                    <Stack direction='row' spacing={1}>
                        <TextField
                            label='Registration Email'
                            type='email'
                            variant='outlined'
                            size='small'
                            margin='dense'
                            fullWidth
                            className={classes.input}
                            value={email}
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
                                readOnly: blockEdit,
                            }}
                            inputlabelprops={{
                                shrink: true,
                                style: { paddingBottom: '5px' },
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(validateEmail(e.target.value));
                            }}
                            error={emailError !== ''}
                            helperText={emailError}
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
                            autocomplete='off' // or "new-password"
                            autofill='off'
                            style={{
                                margin: 0,
                                padding: 0,
                                fontSize: 14,
                                color: 'black',
                            }}
                            placeholder=''
                            disableCountryCode
                            disableDropdown
                            value={phone}
                            onChange={(contactPhone) => {
                                setPhone(contactPhone);
                                setPhoneError(validatePhone(contactPhone));
                            }}
                            inputStyle={{
                                fontSize: '20px',
                                color: 'black',
                            }}
                            inputProps={{
                                padding: 0,
                                fontSize: 24,
                                readOnly: blockEdit,
                                name: 'Cell',
                                margin: 0,
                                required: true,
                                placeholder: '(xxx) xxx-xxxx',
                            }}
                        />
                        {phoneError && (
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
                    <Stack>
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
                            <Stack direction='column' spacing={1}>
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
                                        readOnly: blockEdit,
                                    }}
                                    inputlabelprops={{
                                        shrink: true,
                                        style: { paddingBottom: '0px' },
                                    }}
                                    value={membershipName}
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
                                        setMembershipName(capitalizedStr);
                                        setMembershipNameError(
                                            validateMembershipName(
                                                e.target.value
                                            )
                                        );
                                    }}
                                    error={membershipNameError !== ''}
                                    helperText={membershipNameError}
                                />
                                <TextField
                                    label='Church City'
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
                                        readOnly: blockEdit,
                                    }}
                                    inputlabelprops={{
                                        shrink: true,
                                        style: { paddingBottom: '0px' },
                                    }}
                                    value={membershipCity}
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
                                        setMembershipCity(capitalizedStr);
                                        setMembershipCityError(
                                            validateMembershipCity(
                                                e.target.value
                                            )
                                        );
                                    }}
                                    error={membershipCityError !== ''}
                                    helperText={membershipCityError}
                                />
                                <TextField
                                    label='State'
                                    size='small'
                                    margin='dense'
                                    select
                                    value={membershipStateProv}
                                    InputProps={{
                                        readOnly: blockEdit,
                                    }}
                                    onChange={(event) =>
                                        setMembershipStateProv(
                                            event.target.value
                                        )
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
                        </Box>
                    </Stack>
                    <div className='profile-component__button-wrapper'>
                        <TextField
                            label='Attendees'
                            type='number'
                            size='small'
                            margin='dense'
                            inputProps={{ max: 10, min: 0 }}
                            variant='outlined'
                            select
                            style={{ width: '100px', marginRight: '16px' }}
                            value={attendance}
                            inputlabelprops={{
                                shrink: true,
                                style: { paddingBottom: '1px' },
                            }}
                            inputprops={{
                                shrink: true,
                                style: {
                                    padding: '5px',
                                    marginLeft: '5px',
                                },
                            }}
                            onChange={(e) => {
                                setAttendance(e.target.value);
                                setAttendanceError(
                                    validateAttendance(e.target.value)
                                );
                            }}
                            error={attendanceError !== ''}
                            helperText={attendanceError}
                        >
                            {NUMBER_SELECT_OPTIONS_0_10.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label='Meal'
                            type='number'
                            size='small'
                            margin='dense'
                            inputProps={{ max: 2, min: 0 }}
                            variant='outlined'
                            style={{ width: '80px', marginRight: '16px' }}
                            value={meal}
                            select
                            inputlabelprops={{
                                shrink: true,
                                style: { paddingBottom: '1px' },
                            }}
                            inputprops={{
                                shrink: true,
                                style: {
                                    padding: '5px',
                                    marginLeft: '5px',
                                },
                            }}
                            onChange={(e) => {
                                setMeal(e.target.value);
                                setMealError(validateMeal(e.target.value));
                            }}
                            error={mealError !== ''}
                            helperText={mealError}
                        >
                            {NUMBER_SELECT_OPTIONS_0_10.map((option) => {
                                if (
                                    parseInt(option.value) <=
                                    parseInt(attendance)
                                ) {
                                    return (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.value}
                                        </MenuItem>
                                    );
                                }
                            })}
                        </TextField>
                    </div>
                    <div className='profile-component__button-wrapper'>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={hasErrors || blockEdit}
                            className={classes.button}
                            sx={{ marginRight: '10px' }}
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                        <Button
                            variant='contained'
                            disabled={hasErrors}
                            className={classes.button}
                            sx={{
                                backgroundColor: 'yellow',
                                color: 'black',
                                marginLeft: '10px',
                                marginRight: '10px',
                            }}
                            onClick={() => history.goBack()}
                        >
                            Back
                        </Button>
                        <Button
                            variant='contained'
                            disabled={hasErrors || blockEdit}
                            className={classes.button}
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                marginLeft: '10px',
                            }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {/* <ModalWrapper isOpened={isContactChangeModalVisible}>
                <ContactChangedModal
                    handleChange={() => handleConfirmGuestRegistrationClick()}
                    handleCancel={() => handleConfirmCancelClick()}
                />
            </ModalWrapper> */}
            {/* <ModalWrapper isOpened={isRegistrationCompleteModalVisible}>
                <RegistrationCompleteModal
                    handleConfirm={() => handleRegistraitonCompleteConfirm()}
                />
            </ModalWrapper>
            <ModalWrapper isOpened={isProfileNotificationModalVisible}>
                <ProfileRequiredToRegister
                    handleConfirm={() => handleProfileConfirm()}
                />
            </ModalWrapper> */}

            <ModalWrapper isOpened={isRegistrationExpiredModalVisible}>
                <RegistrationExpired onClose={() => dismissModal()}>
                    <p>This registration cannot be changed.</p>
                </RegistrationExpired>
            </ModalWrapper>
            <ModalWrapper isOpened={isUpdateSuccessModalVisible}>
                <RegistrationUpdated onClose={() => dismissModal()}>
                    <p></p>
                </RegistrationUpdated>
            </ModalWrapper>
            <ModalWrapper isOpened={isNotifyRegistrarModalVisible}>
                <NotifyRegistrar
                    onCancel={() => dismissModal()}
                    onConfirm={() => handleDeleteConfirmation()}
                >
                    <p>
                        {firstName} {lastName}
                    </p>
                    <p>{email}</p>
                    <p>{phone}</p>
                </NotifyRegistrar>
            </ModalWrapper>
        </>
    );
}
const mapDispatchToProps = (dispatch) => ({
    updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    addRegistrationToCurrentUser: (registration) =>
        dispatch(addRegistrationToCurrentUser(registration)),
    updateRegistrationAndEventNumbersForCurrentUser: (payload) =>
        dispatch(updateRegistrationAndEventNumbersForCurrentUser(payload)),
    removePateRallyRegistration: (payload) =>
        dispatch(removePateRallyRegistration(payload)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pateSystem: state.pate,
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Registrar);
