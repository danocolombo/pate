import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Stack,
    Box,
    Card,
    Typography,
    TextField,
    MenuItem,
    CardContent,
    Button,
} from '@mui/material';
import { alpha } from '@mui/system';
import Spinner from '../../components/spinner/Spinner';
import PhoneInput from 'react-phone-input-2';
import SelectStateProv from '../../components/state-prov/select-stateProv.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { updateCurrentUser } from '../../redux/user/user.actions';
import { printObject } from '../../utils/helpers';
import { US_STATES } from '../../constants/pate';
import useStyles from './profile.styles';
import './profile2.styles.scss';
const Profile3 = ({
    currentUser,
    setSpinner,
    updateCurrentUser,
    clearSpinner,
    pateSystem,
}) => {
    const history = useHistory();
    // variables for the form
    const classes = useStyles();
    const [multiplier, setMultiplier] = useState(1);
    const [firstName, setFirstName] = useState(currentUser?.firstName);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState(currentUser?.lastName);
    const [lastNameError, setLastNameError] = useState('');
    const [email, setEmail] = useState(currentUser?.email);
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState(currentUser?.phone);
    const [phoneError, setPhoneError] = useState('');
    const [street, setStreet] = useState(currentUser?.residence?.street);
    const [streetError, setStreetError] = useState('');
    const [city, setCity] = useState(currentUser?.residence?.city);
    const [cityError, setCityError] = useState('');
    const [stateProv, setStateProv] = useState(
        currentUser?.residence?.stateProv || ''
    );
    const [postalCode, setPostalCode] = useState(
        currentUser?.residence?.postalCode
    );
    const [postalCodeError, setPostalCodeError] = useState('');
    const [originalMembership, setOriginalMembership] = useState({});
    const [membershipId, setMembershipId] = useState(
        currentUser?.memberships?.items[0].id || ''
    );
    const [membershipName, setMembershipName] = useState(
        currentUser?.memberships?.items[0].name || ''
    );
    const [membershipNameError, setMembershipNameError] = useState('');
    const [membershipCity, setMembershipCity] = useState(
        currentUser?.memberships?.items[0].city || ''
    );
    const [membershipCityError, setMembershipCityError] = useState('');
    const [membershipStateProv, setMembershipStateProv] = useState(
        currentUser?.memberships?.items[0]?.stateProv || ''
    );
    useEffect(() => {
        if (!currentUser.isLoggedIn) history.push('/');
        async function clarifyMembership() {
            // need to get membership info based on division
            // if (currentUser?.memberships.items.length > 0) {
            //     let membership = currentUser.memberships.items.find(
            //         (m) => m.division.id === currentUser.defaultDivision.id
            //     );
            //     if (membership) {
            //         setOriginalMembership({
            //             id: membership.id,
            //             name: membership.name,
            //             city: membership.city,
            //             stateProv: membership.stateProv,
            //         });
            //         setMembershipId(membership.id);
            //         setChurchName(membership.name);
            //         setChurchCity(membership.city);
            //         setChurchStateProv(membership.stateProv);
            //     } else {
            //         console.log(
            //             'PC:52--> MEMBERSHIP NOT FOUND IN MEMBERSHIP ARRAY'
            //         );
            //     }
            // } else {
            //     console.log('PC:46--> MEMBERSHIPS NOT IDENTIFIED');
            // }
        }
        clarifyMembership();
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);

    const validateFirstName = (firstName) => {
        if (!firstName) {
            return 'First name is required';
        }
        const emailRegex = /^[A-Za-z]{2,15}$/;
        if (!emailRegex.test(firstName)) {
            return '2-15 characters only';
        }
        return '';
    };
    const validateLastName = (lastName) => {
        if (!lastName) {
            return 'Last name is required';
        }
        const emailRegex = /^[a-zA-Z]{2,19}\d?$/;
        if (!emailRegex.test(lastName)) {
            return '2-19 characters (optional number)';
        }
        return '';
    };
    const validateStreet = (street) => {
        if (!street) {
            return 'Street is required';
        }
        const emailRegex = /^[a-zA-Z\d\s\#]{2,19}$/;
        if (!emailRegex.test(street)) {
            return '2-19 characters (optional number)';
        }
        return '';
    };
    const validateCity = (city) => {
        if (!city) {
            return 'City is required';
        }
        const emailRegex = /^[A-Za-z]{2,15}$/;
        if (!emailRegex.test(city)) {
            return '2-15 characters only';
        }
        return '';
    };
    const validatePostalCode = (postalCode) => {
        const emailRegex = / ^\d{5}$/;
        if (!emailRegex.test(postalCode)) {
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
    const validateMembershipName = (membershipName) => {
        if (membershipName.length > 50) {
            return 'max length 50 characters';
        }
        return '';
    };
    const validateMembershipCity = (membershipCity) => {
        if (membershipCity.length > 25) {
            return 'max length 25 characters';
        }
        return '';
    };
    const handleSubmitClick = (event) => {
        event.preventDefault();
        setSpinner();
        //      ***********************************
        //      WE HAVE MULTIPLE UPDATES TO MAKE
        //      1. User
        //      2. Residence
        //      3. Memberships
        //*   ONLY UPDATE IF CHANGES WERE MADE
        //
        //*   Build input objects
        let userInput = {};
        let residenceInput = {};
        let membershipInput = {};
        if (
            currentUser.firstName !== firstName ||
            currentUser.lastName !== lastName ||
            currentUser.email !== email ||
            currentUser.phone !== phone
        ) {
            userInput = {
                id: currentUser.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
            };
        }
        if (
            currentUser.residence.street !== street ||
            currentUser.residence.city !== city ||
            currentUser.residence.stateProv !== stateProv ||
            currentUser.residence.postalCode !== postalCode
        ) {
            residenceInput = {
                id: currentUser.residence.id,
                street: street,
                city: city,
                stateProv: stateProv,
                postalCode: postalCode,
            };
        }
        //      make the membership object
        if (
            currentUser?.memberships?.items[0]?.name !== membershipName ||
            currentUser?.memberships?.items[0]?.city !== membershipCity ||
            currentUser?.memberships?.items[0]?.stateProv !==
                membershipStateProv
        ) {
            membershipInput = {
                id: membershipId,
                name: membershipName,
                city: membershipCity,
                stateProv: membershipStateProv,
            };
        }

        const multiMutate = {
            user: userInput,
            residence: residenceInput,
            membership: membershipInput,
        };
        printObject('PC:157-->multiMutate:\n', multiMutate);
        //todo-gql  need to update graphql as needed with multiMutate
        //todo-gql  need to update currentUser in redux
        let DANO = true;
        if (DANO) {
            if (multiMutate?.user?.id) {
                console.log('update user');
            }
            if (multiMutate?.residence?.id) {
                console.log('update residence');
            }
            if (multiMutate?.membership?.id) {
                console.log('update membership');
            }

            return;
        }
        let coreUser = {
            uid: currentUser.uid,
            isLoggedIn: currentUser.isLoggedIn,
            loading: currentUser.loading,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
        };
        //need to add stateRep & stateLead if set...
        if (currentUser?.stateRep) {
            coreUser.stateRep = currentUser.stateRep;
        }
        if (currentUser.stateLead) {
            coreUser.stateLead = currentUser.stateLead;
        }
        //add staterep and or statelead
        if (currentUser?.stateRep) {
            coreUser.stateRep = currentUser.stateRep;
        }
        //add staterep and or statelead
        if (currentUser?.stateLead) {
            coreUser.stateLead = currentUser.stateLead;
        }

        //section for address....
        let residence = {};
        if (street || city || stateProv || postalCode) {
            // let address = {};
            // profileUpdate.address = {};
            if (street !== undefined && street !== '') {
                residence.street = street;
            }
            if (city !== undefined && city !== '') {
                residence.city = city;
            }
            if (stateProv !== undefined && stateProv !== '') {
                residence.stateProv = stateProv;
            }

            if (postalCode !== undefined && postalCode !== '') {
                residence.postalCode = postalCode;
            }
            // profileUpdate.address = address;
        }

        //church values are optional, so we want to send empty string if undefined
        let membership = {};
        if (membershipName || membershipCity || membershipStateProv) {
            // let church = {};
            // profileUpdate.church = {};
            if (membershipName !== undefined && membershipName !== '') {
                membership.name = membershipName;
            }
            if (membershipCity !== undefined && membershipCity !== '') {
                membership.city = membershipCity;
            }
            if (
                membershipStateProv !== undefined &&
                membershipStateProv !== ''
            ) {
                membership.stateProv = membershipStateProv;
            }
        }

        //profileUpdate.dateUpdated = '2021-03-18T09:09';
        // now save the information to the pate db
        // 1. add the uid to the data to update database.
        //profileUpdate.uid = currentUser.uid;

        // 2. save the object to the pate db
        const util = require('util');
        console.log(
            'residence \n' +
                util.inspect(residence, {
                    showHidden: false,
                    depth: null,
                })
        );
        let newCurrentUser = {};
        newCurrentUser = coreUser;

        if (
            residence?.street ||
            residence?.city ||
            residence?.stateProv ||
            residence?.postalCode
        ) {
            newCurrentUser = { ...newCurrentUser, residence };
        }
        if (membership?.name || membership?.city || membership?.stateProv) {
            newCurrentUser = { ...newCurrentUser, membership };
        }
        //======================================
        // 1. update database
        // 2. add JWt to object
        // 3. update Redux
        //======================================
        //====== 1. update database
        async function updateDb() {
            fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'updateUser',
                        payload: {
                            Item: newCurrentUser,
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

        //====== 2. add JWT to object
        newCurrentUser.jwt = currentUser.jwt;
        //====== 3. update redux
        async function updateRedux() {
            updateCurrentUser(newCurrentUser);
            console.log('updateRedux function.............................');
        }
        updateRedux();

        history.push('/');
        clearSpinner();
    };
    const noUpdate =
        firstNameError ||
        lastNameError ||
        streetError ||
        phoneError ||
        postalCodeError ||
        phoneError ||
        membershipNameError ||
        membershipCityError;
    return (
        <>
            <Box
                className='MyBox-root'
                sx={{
                    position: 'relative',
                    background: 'linear-gradient(to bottom, #384ea3, #ced8e8)',
                    borderRadius: 2,
                    minHeight: `${20 * multiplier}px`,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'top',
                    alignContent: 'center',
                    maxWidth: 400,
                    width: '100%',
                    margin: '0 auto',
                }}
            >
                <Typography
                    variant='h5'
                    align='center'
                    marginTop='10px'
                    color='white'
                >
                    Personal Profile
                </Typography>
                <Card
                    sx={{
                        borderRadius: 2,
                        boxShadow: 8,
                        margin: '15px',
                        marginBottom: '20px',
                        minWidth: '300px',
                        bgcolor: '#FAFAFA',
                    }}
                >
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
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { paddingBottom: '0px' },
                                        }}
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            setFirstNameError(
                                                validateFirstName(
                                                    e.target.value
                                                )
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
                            {/* <Stack direction='row' spacing={1}>
                                <TextField
                                    label='Email'
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
                                    }}
                                    inputlabelprops={{
                                        shrink: true,
                                        style: { paddingBottom: '5px' },
                                    }}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError(
                                            validateEmail(e.target.value)
                                        );
                                    }}
                                    error={emailError !== ''}
                                    helperText={emailError}
                                />
                            </Stack> */}

                            <Stack
                                direction='column'
                                spacing={1}
                                align='center'
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
                                        setPhoneError(
                                            validatePhone(contactPhone)
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
                            {/* <Stack direction='row' spacing={1}>
                                <TextField
                                    label='Phone'
                                    type='phone'
                                    variant='outlined'
                                    size='small'
                                    margin='dense'
                                    fullWidth
                                    className={classes.input}
                                    value={phone}
                                    InputProps={{
                                        style: {
                                            padding: '0px',
                                            margin: '0px',
                                            fontWeight: '200',
                                            fontSize: '1.5rem',
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
                                        setPhone(e.target.value);
                                        setPhoneError(
                                            validatePhone(e.target.value)
                                        );
                                    }}
                                    error={phoneError !== ''}
                                    helperText={phoneError}
                                />
                            </Stack> */}
                            <div className='profilehomesection'>
                                Home Address
                            </div>
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
                                    inputlabelprops={{
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
                                        InputProps={{
                                            sx: {
                                                bgcolor: '#f5f5f5', // sets the fill color
                                                borderRadius: 1, // sets the border radius
                                            },
                                        }}
                                        value={stateProv}
                                        onChange={(event) => {
                                            console.log(event.target.value); // Add this line to check the selected value
                                            setStateProv(event.target.value);
                                        }}
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
                                            setPostalCode(e.target.value);
                                            setPostalCodeError(
                                                validatePostalCode(
                                                    e.target.value
                                                )
                                            );
                                        }}
                                        error={postalCodeError !== ''}
                                        helperText={postalCodeError}
                                    />
                                </Stack>
                            </Stack>

                            <div className='profilehomesection'>
                                CR/Church Info
                            </div>
                            <Stack direction='row' spacing={1}>
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
                                        setMembershipName(e.target.value);
                                        setMembershipNameError(
                                            validateMembershipName(
                                                e.target.value
                                            )
                                        );
                                    }}
                                    error={membershipNameError !== ''}
                                    helperText={membershipNameError}
                                />
                            </Stack>
                            <Stack direction='row' spacing={1}>
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
                                        setMembershipCity(e.target.value);
                                        setMembershipCityError(
                                            validateMembershipCity(
                                                e.target.value
                                            )
                                        );
                                    }}
                                    error={membershipCityError !== ''}
                                    helperText={membershipCityError}
                                />
                            </Stack>
                            <Stack>
                                <TextField
                                    label='Church State/Providence'
                                    size='small'
                                    margin='dense'
                                    select
                                    InputProps={{
                                        sx: {
                                            bgcolor: '#f5f5f5', // sets the fill color
                                            borderRadius: 1, // sets the border radius
                                        },
                                    }}
                                    value={membershipStateProv}
                                    onChange={(event) => {
                                        console.log(event.target.value); // Add this line to check the selected value
                                        setMembershipStateProv(
                                            event.target.value
                                        );
                                    }}
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

                            <div className='profile-component__button-wrapper'>
                                <button
                                    className='profile-component__update-button'
                                    disabled={noUpdate}
                                    onClick={handleSubmitClick}
                                >
                                    UPDATE
                                </button>
                            </div>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};
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
})(Profile3);
