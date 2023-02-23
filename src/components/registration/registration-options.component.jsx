import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
import { MdAnnouncement } from 'react-icons/md';
import { API, graphqlOperation } from 'aws-amplify';
import PhoneInput from 'react-phone-input-2';
import * as queries from '../../pateGraphql/queries';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { updateCurrentUser } from '../../redux/user/user.actions';
import useStyles from './Registration.styles';
import { US_STATES, NUMBER_SELECT_OPTIONS_0_10 } from '../../constants/pate';
import { prettyDate, prettyTime, printObject } from '../../utils/helpers';

function RegistrationOptions({
    eventId,
    currentUser,
    setSpinner,
    updateCurrentUser,
    clearSpinner,
    pateSystem,
}) {
    const classes = useStyles();
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [street, setStreet] = useState('');
    const [streetError, setStreetError] = useState('');
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateProv, setStateProv] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [membershipName, setMembershipName] = useState('');
    const [membershipNameError, setMembershipNameError] = useState('');
    const [membershipCity, setMembershipCity] = useState('');
    const [membershipCityError, setMembershipCityError] = useState('');
    const [membershipStateProv, setMembershipStateProv] = useState('');

    const [attendance, setAttendance] = useState(0);
    const [attendanceError, setAttendanceError] = useState('');
    const [meal, setMeal] = useState(0);
    const [mealError, setMealError] = useState('');
    const [event, setEvent] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    useEffect(() => {
        if (!currentUser?.authSession?.idToken?.jwtToken) history.push('/');
        async function getEvent() {
            const variables = {
                id: eventId,
            };
            const eventData = await API.graphql(
                graphqlOperation(queries.getEvent, variables)
            );
            if (eventData.data.getEvent) {
                printObject('ROC:57-->eventData:\n', eventData.data.getEvent);
                setEvent(eventData.data.getEvent);
                setFirstName(currentUser.firstName);
                setLastName(currentUser.lastName);
                setStreet(currentUser?.residence?.street);
                setCity(currentUser?.residence?.city);
                setStateProv(currentUser?.residence?.stateProv);
                setPostalCode(currentUser?.residence?.postalCode);
                setMembershipName(currentUser.memberships?.items[0]?.name);
                setMembershipCity(currentUser.memberships?.items[0]?.city);
                setMembershipStateProv(
                    currentUser.memberships?.items[0]?.stateProv
                );
                setEmail(currentUser.email);
                setPhone(currentUser.phone);
            }
        }
        getEvent();
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
    const handleEmailInfoClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    if (!event) {
        return <div>LOADING...</div>;
    }

    const handleSubmit = () => {
        // Handle the submission here with the attendance and meal values
        setSpinner();
        const inputValues = {
            eventId: eventId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            residence: {
                street: street,
                city: city,
                stateProv: stateProv,
                postalCode: postalCode,
            },
            attendanceCount: parseInt(attendance),
            mealCount: parseInt(meal),
        };
        // membership information is not required. But only provide membership.stateProv
        // if there is name and city
        let membership = {};
        if (membershipName && membershipCity) {
            membership = {
                name: membershipName,
                city: membershipCity,
                stateProv: membershipStateProv,
            };
        } else {
            membership = {
                name: '',
                city: '',
                stateProv: '',
            };
        }
        const registrationInput = { ...inputValues, membership };
        printObject('ROC:75==>registrationInput:\n', registrationInput);
        clearSpinner();
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
    const viewOnly =
        currentUser.role !== 'rep' &&
        currentUser.role !== 'lead' &&
        currentUser.role !== 'director' &&
        currentUser.role !== 'guru';
    return (
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
                    <Typography variant='h6'>{event.name}</Typography>

                    <div>{event?.location?.street}</div>
                    <div style={{ paddingBottom: '5px' }}>
                        {event?.location?.city}, {event?.location?.stateProv}{' '}
                        {event?.location?.postalCode}
                    </div>
                    <div>
                        {prettyDate(event?.eventDate)}{' '}
                        {prettyTime(event?.startTime)}-
                        {prettyTime(event?.endTime)}
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
                                }}
                                Inputlabelprops={{
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
                                }}
                                Inputlabelprops={{
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
                        }}
                        inputlabelprops={{
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
                        >
                            {US_STATES.map((state) => (
                                <MenuItem key={state.value} value={state.value}>
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
                                setPostalCode(e.target.value.substring(0, 5));
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
                        label={
                            <InputLabel>
                                Registration Email
                                <IconButton onClick={handleEmailInfoClick}>
                                    <Icon />
                                </IconButton>
                            </InputLabel>
                        }
                        type='email'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        fullWidth
                        className={classes.input}
                        value={email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleEmailInfoClick}>
                                        <MdAnnouncement />
                                    </IconButton>
                                </InputAdornment>
                            ),
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
                            setEmail(e.target.value);
                            setEmailError(validateEmail(e.target.value));
                        }}
                        error={emailError !== ''}
                        helperText={emailError}
                    />
                    <Popper
                        open={open}
                        anchorEl={anchorEl}
                        sx={{ backgroundColor: 'yellow' }}
                    >
                        <Typography>Registration Only</Typography>
                    </Popper>
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
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1).toLowerCase()
                                        )
                                        .join(' ');
                                    setMembershipName(capitalizedStr);
                                    setMembershipNameError(
                                        validateMembershipName(e.target.value)
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
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1).toLowerCase()
                                        )
                                        .join(' ');
                                    setMembershipCity(capitalizedStr);
                                    setMembershipCityError(
                                        validateMembershipCity(e.target.value)
                                    );
                                }}
                                error={membershipCityError !== ''}
                                helperText={membershipCityError}
                            />
                            <TextField
                                label='State/Providence'
                                size='small'
                                margin='dense'
                                select
                                value={membershipStateProv}
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
                <Stack direction='row' spacing={1}>
                    <Stack>
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
                                style: { padding: '5px', marginLeft: '5px' },
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
                    </Stack>
                    <Stack>
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
                                style: { padding: '5px', marginLeft: '5px' },
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
                    </Stack>
                </Stack>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={hasErrors}
                    className={classes.button}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
}
const mapDispatchToProps = (dispatch) => ({
    updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pateSystem: state.pate,
});
export default connect(mapStateToProps, {
    setSpinner,
    clearSpinner,
    updateCurrentUser,
    mapDispatchToProps,
})(RegistrationOptions);
