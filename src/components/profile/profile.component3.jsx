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
    const [homeStreet, setHomeStreet] = useState(
        currentUser?.residence?.street
    );
    const [homeStreetError, setHomeStreetError] = useState('');
    const [homeCity, setHomeCity] = useState(currentUser?.residence?.city);
    const [homeCityError, setHomeCityError] = useState('');
    const [homeStateProv, setHomeStateProv] = useState(
        currentUser?.residence?.stateProv
    );
    const [homePostalCode, setHomePostalCode] = useState(
        currentUser?.residence?.postalCode
    );
    const [homePostalCodeError, setHomePostalCodeError] = useState('');
    const [originalMembership, setOriginalMembership] = useState({});
    const [membershipId, setMembershipId] = useState('');
    const [churchName, setChurchName] = useState('');
    const [churchNameError, setChurchNameError] = useState('');
    const [churchCity, setChurchCity] = useState('');
    const [churchCityError, setChurchCityError] = useState('');
    const [churchStateProv, setChurchStateProv] = useState('');
    useEffect(() => {
        if (!currentUser.isLoggedIn) history.push('/');
        async function clarifyMembership() {
            // need to get membership info based on division
            if (currentUser?.memberships.items.length > 0) {
                let membership = currentUser.memberships.items.find(
                    (m) => m.division.id === currentUser.defaultDivision.id
                );
                if (membership) {
                    printObject('PC:72-->membership:\n', membership);
                    setOriginalMembership({
                        id: membership.id,
                        name: membership.name,
                        city: membership.city,
                        stateProv: membership.stateProv,
                    });
                    setMembershipId(membership.id);
                    setChurchName(membership.name);
                    setChurchCity(membership.city);
                    setChurchStateProv(membership.stateProv);
                } else {
                    console.log(
                        'PC:52--> MEMBERSHIP NOT FOUND IN MEMBERSHIP ARRAY'
                    );
                }
            } else {
                console.log('PC:46--> MEMBERSHIPS NOT IDENTIFIED');
            }
        }
        clarifyMembership();
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);

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
            (currentUser.residence.street !== homeStreet,
            currentUser.residence.city !== homeCity,
            currentUser.residence.stateProv !== homeStateProv,
            currentUser.residence.postalCode !== homePostalCode)
        ) {
            residenceInput = {
                id: currentUser.residence.id,
                street: homeStreet,
                city: homeCity,
                stateProv: homeStateProv,
                postalCode: homePostalCode,
            };
        }
        //      make the membership object
        membershipInput = {
            id: membershipId,
            name: churchName,
            city: churchCity,
            stateProv: churchStateProv,
        };
        //      check if changes were made, if no change, empty array.
        if (
            JSON.stringify(membershipInput) !==
            JSON.stringify(originalMembership)
        ) {
            membershipInput = {};
        }
        const multiMutate = {
            user: userInput,
            residence: residenceInput,
            membership: membershipInput,
        };
        //todo-gql  need to update graphql as needed with multiMutate
        //todo-gql  need to update currentUser in redux
        let DANO = true;
        if (DANO) {
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
        if (homeStreet || homeCity || homeStateProv || homePostalCode) {
            // let address = {};
            // profileUpdate.address = {};
            if (homeStreet !== undefined && homeStreet !== '') {
                residence.street = homeStreet;
            }
            if (homeCity !== undefined && homeCity !== '') {
                residence.city = homeCity;
            }
            var homeStateProv = document.getElementById('homeStateProv');
            residence.stateProv = homeStateProv.value;
            // if (homeState !== undefined && homeState !== '') {
            //     residence.stateProv = homeState;
            // }
            if (homePostalCode !== undefined && homePostalCode !== '') {
                residence.postalCode = homePostalCode;
            }
            // profileUpdate.address = address;
        }

        //church values are optional, so we want to send empty string if undefined
        let church = {};
        if (churchName || churchCity || churchStateProv) {
            // let church = {};
            // profileUpdate.church = {};
            if (churchName !== undefined && churchName !== '') {
                church.name = churchName;
            }
            if (churchCity !== undefined && churchCity !== '') {
                church.city = churchCity;
            }
            var churchStateProv = document.getElementById('churchStateProv');
            church.stateProv = churchStateProv.value;
            // if (churchState !== undefined && churchState !== '')
            //     church.stateProv = churchState;
            // profileUpdate.church = church;
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
        if (church?.name || church?.city || church?.stateProv) {
            newCurrentUser = { ...newCurrentUser, church };
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
    const handleHomeStateChange = ({ newValue }) => {
        console.log('stateProv:', newValue);
        setHomeStateProv(newValue);
    };
    const handleChurchStateChange = ({ newValue }) => {
        setChurchStateProv(newValue);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'homeStreet':
                setHomeStreet(value);
                break;
            case 'homeCity':
                setHomeCity(value);
                break;
            // case 'homeState':
            //     setHomeState(value);
            //     break;
            case 'homePostalCode':
                setHomePostalCode(value);
                break;
            case 'churchName':
                setChurchName(value);
                break;
            case 'churchCity':
                setChurchCity(value);
                break;
            // case 'churchState':
            //     setChurchState(value);
            //     break;
            default:
                break;
        }
    };
    const validateFirstName = (firstName) => {
        if (!firstName) {
            return 'First name is required';
        }
        if (firstName.length < 2 || firstName.length > 15) {
            return 'length 2-15 characters';
        }
        return '';
    };
    const validateLastName = (lastName) => {
        if (!lastName) {
            return 'Last name is required';
        }
        if (lastName.length < 2 || lastName.length > 15) {
            return 'length 2-15 characters';
        }
        return '';
    };
    const validateStreet = (homeStreet) => {
        if (!homeStreet) {
            return 'Street is required';
        }
        if (homeStreet.length < 2 || homeStreet.length > 50) {
            return 'length 10-50 characters';
        }
        return '';
    };
    const validateCity = (homeCity) => {
        if (!homeCity) {
            return 'City is required';
        }
        if (homeCity.length < 2 || homeCity.length > 50) {
            return 'length 10-50 characters';
        }
        return '';
    };
    const validatePostalCode = (homePostalCode) => {
        if (!homePostalCode) {
            return 'Postal code is required';
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
        if (!phone) {
            return 'Phone is required';
        }
        return '';
    };
    const validateChurchName = (churchName) => {
        if (churchName.length > 50) {
            return 'max length 50 characters';
        }
        return '';
    };
    const validateChurchCity = (churchCity) => {
        if (churchCity.length > 25) {
            return 'max length 50 characters';
        }
        return '';
    };
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
                                        Inputlabelprops={{
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
                            <Stack direction='row' spacing={1}>
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
                            </Stack>
                            <Stack direction='row' spacing={1}>
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
                                        setPhone(e.target.value);
                                        setPhoneError(
                                            validatePhone(e.target.value)
                                        );
                                    }}
                                    error={phoneError !== ''}
                                    helperText={phoneError}
                                />
                            </Stack>
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
                                    value={homeStreet}
                                    onChange={(e) => {
                                        setHomeStreet(e.target.value);
                                        setHomeStreetError(
                                            validateStreet(e.target.value)
                                        );
                                    }}
                                    error={homeStreetError !== ''}
                                    helperText={homeStreetError}
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
                                    value={homeCity}
                                    onChange={(e) => {
                                        setHomeCity(e.target.value);
                                        setHomeCityError(
                                            validateCity(e.target.value)
                                        );
                                    }}
                                    error={homeCityError !== ''}
                                    helperText={homeCityError}
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
                                        value={homeStateProv}
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
                                        value={homePostalCode}
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
                                            setHomePostalCode(e.target.value);
                                            setHomePostalCodeError(
                                                validatePostalCode(
                                                    e.target.value
                                                )
                                            );
                                        }}
                                        error={homePostalCodeError !== ''}
                                        helperText={homePostalCodeError}
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
                                    value={churchName}
                                    onChange={(e) => {
                                        setChurchName(e.target.value);
                                        setChurchNameError(
                                            validateChurchName(e.target.value)
                                        );
                                    }}
                                    error={churchNameError !== ''}
                                    helperText={churchNameError}
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
                                    value={churchCity}
                                    onChange={(e) => {
                                        setChurchCity(e.target.value);
                                        setChurchCityError(
                                            validateChurchCity(e.target.value)
                                        );
                                    }}
                                    error={churchCityError !== ''}
                                    helperText={churchCityError}
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
                                    value={churchStateProv}
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
