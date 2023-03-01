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
import ProfileUpdateNotification from '../../components/modals/profile-edit/profile-update-success.modal';
import ModalWrapper from '../../components/modals/wrapper.modal';
import PhoneInput from 'react-phone-input-2';
import SelectStateProv from '../../components/state-prov/select-stateProv.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import {
    updateGQLUserPersonalInfo,
    updateGQLUserResidenceInfo,
    updateGQLUserMembershipInfo,
} from '../../providers/profile.provider';
import {
    updateCurrentUser,
    updateUserPersonalInfo,
    updateUserResidenceInfo,
    updateUserMembershipInfo,
} from '../../redux/user/user.actions';
import { printObject } from '../../utils/helpers';
import { US_STATES } from '../../constants/pate';
import useStyles from './profile.styles';
import './profile2.styles.scss';
const Profile3 = ({
    currentUser,
    setSpinner,
    updateCurrentUser,
    updateUserPersonalInfo,
    updateUserResidenceInfo,
    updateUserMembershipInfo,
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
        currentUser?.memberships?.items[0]?.id || ''
    );
    const [membershipName, setMembershipName] = useState(
        currentUser?.memberships?.items[0]?.name || ''
    );
    const [membershipNameError, setMembershipNameError] = useState('');
    const [membershipCity, setMembershipCity] = useState(
        currentUser?.memberships?.items[0]?.city || ''
    );
    const [membershipCityError, setMembershipCityError] = useState('');
    const [membershipStateProv, setMembershipStateProv] = useState(
        currentUser?.memberships?.items[0]?.stateProv || ''
    );
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    useEffect(() => {
        if (!currentUser?.authSession?.idToken?.jwtToken) history.push('/');
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);

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
    // const validateEmail = (email) => {
    //     if (!email) {
    //         return 'Email is required';
    //     }
    //     const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    //     if (!emailRegex.test(email)) {
    //         return 'Email address not supported';
    //     }

    //     return '';
    // };
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

        if (multiMutate?.user?.id) {
            let returnValue = {};
            updateGQLUserPersonalInfo(multiMutate.user)
                .then((results) => {
                    const reduxResponse = updateUserPersonalInfo({
                        firstName: multiMutate.user.firstName,
                        lastName: multiMutate.user.lastName,
                        phone: multiMutate.user.phone,
                    });
                    if (reduxResponse) {
                        returnValue = {
                            status: 200,
                            data: reduxResponse,
                        };
                    } else {
                        printObject(
                            'PP:174-->error updating REDUX:\n',
                            reduxResponse
                        );
                    }
                })

                .catch((e) => {
                    console.log(e);
                });
        }
        if (multiMutate?.residence?.id) {
            let returnValue = {};
            updateGQLUserResidenceInfo(multiMutate.residence)
                .then((results) => {
                    const reduxResponse = updateUserResidenceInfo({
                        street: multiMutate.residence.street,
                        city: multiMutate.residence.city,
                        stateProv: multiMutate.residence.stateProv,
                        postalCode: multiMutate.residence.postalCode,
                    });
                    if (reduxResponse) {
                        returnValue = {
                            status: 200,
                            data: reduxResponse,
                        };
                    } else {
                        printObject(
                            'PP:275-->error updating REDUX:\n',
                            reduxResponse
                        );
                    }
                    console.log('profile updated');
                })

                .catch((e) => {
                    console.log(e);
                });
        }
        if (multiMutate?.membership?.id) {
            let returnValue = {};
            updateGQLUserMembershipInfo(multiMutate.membership)
                .then((results) => {
                    if (results?.data?.updateMembership?.id) {
                        const reduxResponse = updateUserMembershipInfo({
                            name: multiMutate.membership.name,
                            city: multiMutate.membership.city,
                            stateProv: multiMutate.membership.stateProv,
                        });
                        if (reduxResponse) {
                            returnValue = {
                                status: 200,
                                data: reduxResponse,
                            };
                        } else {
                            printObject(
                                'PP:303-->error updating REDUX:\n',
                                reduxResponse
                            );
                        }
                        console.log('profile updated');
                    } else {
                        //error updating gql
                        printObject('PC3:316-->error', results);
                    }
                })

                .catch((e) => {
                    console.log(e);
                });
        }
        //      ==================================
        //      updates complete. notify and move to /
        clearSpinner();
        setIsProfileUpdated(true);
        return;
    };
    const handleUpdateConfirmationClick = () => {
        setIsProfileUpdated(false);
        history.push('/');
    };
    let noUpdate = false;
    if (
        firstNameError ||
        lastNameError ||
        streetError ||
        phoneError ||
        postalCodeError ||
        phoneError ||
        membershipNameError ||
        membershipCityError
    ) {
        noUpdate = true;
    } else {
        noUpdate = false;
    }
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
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
                    marginTop='0px'
                    color='white'
                >
                    Personal Profile
                </Typography>
                <Card
                    sx={{
                        borderRadius: 2,
                        boxShadow: 8,
                        marginLeft: '15px',
                        marginRight: '15px',
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
                                                textTransform: 'none',
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
                                            setFirstName(
                                                e.target.value
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    e.target.value
                                                        .slice(1)
                                                        .toLowerCase()
                                            );
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
                                                textTransform: 'none',
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
                                            setLastName(
                                                e.target.value
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    e.target.value
                                                        .slice(1)
                                                        .toLowerCase()
                                            );
                                            setLastNameError(
                                                validateLastName(e.target.value)
                                            );
                                        }}
                                        error={lastNameError !== ''}
                                        helperText={lastNameError}
                                    />
                                </Stack>
                            </Stack>
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
                                            textTransform: 'none',
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
                                        setStreet(capitalizedStr);
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
                                        setCity(capitalizedStr);
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
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={noUpdate}
                                    className={classes.button}
                                    onClick={handleSubmitClick}
                                >
                                    Update
                                </Button>
                            </div>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
            <ModalWrapper isOpened={isProfileUpdated}>
                <ProfileUpdateNotification
                    onClose={() => handleUpdateConfirmationClick()}
                />
            </ModalWrapper>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    updateUserPerosnalInfo: (personalInfo) =>
        dispatch(updateUserPersonalInfo(personalInfo)),
    updateUserResidenceInfo: (personalInfo) =>
        dispatch(updateUserResidenceInfo(personalInfo)),
    updateUserMembershipInfo: (personalInfo) =>
        dispatch(updateUserMembershipInfo(personalInfo)),
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
    updateUserPersonalInfo,
    updateUserResidenceInfo,
    updateUserMembershipInfo,
    mapDispatchToProps,
})(Profile3);