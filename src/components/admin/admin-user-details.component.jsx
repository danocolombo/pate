import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import PhoneInput from 'react-phone-input-2';
import {
    setSpinner,
    clearSpinner,
    clearTmpUser,
    loadTmpUser,
} from '../../redux/pate/pate.actions';
// import { updateCurrentUser } from '../../redux/user/user.actions';
import './admin-user-details-component.styles.scss';
const UserDetailsForm = ({
    currentUser,
    tmpUser,
    setSpinner,
    clearTmpUser,
    loadTmpUser,
    // updateCurrentUser,
    clearSpinner,
    pate,
    match,
}) => {
    const history = useHistory();
    let userId = match?.params?.id;
    const [tmpUserLoading, setTmpUserLoading] = useState(true);
    // variables for the form
    const [firstName, setFirstName] = useState(pate.tmpUser?.firstName);
    const [lastName, setLastName] = useState(pate.tmpUser?.lastName);
    const [email, setEmail] = useState(pate.tmpUser?.email);
    const [phone, setPhone] = useState(pate.tmpUser?.phone);
    const [homeStreet, setHomeStreet] = useState(
        pate.tmpUser?.residence?.street
    );
    const [homeCity, setHomeCity] = useState(pate.tmpUser?.residence?.city);
    const [homeState, setHomeState] = useState(
        pate.tmpUser?.residence?.stateProv
    );
    const [homePostalCode, setHomePostalCode] = useState(
        pate.tmpUser?.residence?.postalCode
    );
    const [churchName, setChurchName] = useState(pate.tmpUser?.church?.name);
    const [churchCity, setChurchCity] = useState(pate.tmpUser?.church?.city);
    const [churchState, setChurchState] = useState(
        pate.tmpUser?.church?.stateProv
    );

    useEffect(() => {
        // if (!currentUser.isLoggedIn) history.push('/');
        //need to identify the selected user and define the
        //redux value to display

        getTmpUser();
    }, []);
    useEffect(() => {}, [pate.showSpinner]);
    const getTmpUser = () => {
        //clear any data we might have
        async function clearData() {
            clearTmpUser();
        }
        clearData();
        //search pate.users for this user
        pate.users.forEach((user) => {
            if (user.uid === userId) {
                console.log('FOUND IT');
                loadTmpUser(user);
                setTmpUserLoading(false);
            }
        });
    };
    const handleCancelClick = () => {
        history.push('/administer/registeredusers');
    };
    const handleSubmitClick = (event) => {
        event.preventDefault();
        setSpinner();
        // build currentUser object
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
        if (homeStreet || homeCity || homeState || homePostalCode) {
            // let address = {};
            // profileUpdate.address = {};
            if (homeStreet !== undefined && homeStreet !== '') {
                residence.street = homeStreet;
            }
            if (homeCity !== undefined && homeCity !== '') {
                residence.city = homeCity;
            }
            if (homeState !== undefined && homeState !== '') {
                residence.stateProv = homeState;
            }
            if (homePostalCode !== undefined && homePostalCode !== '') {
                residence.postalCode = homePostalCode;
            }
            // profileUpdate.address = address;
        }

        //church values are optional, so we want to send empty string if undefined
        let church = {};
        if (churchName || churchCity || churchState) {
            // let church = {};
            // profileUpdate.church = {};
            if (churchName !== undefined && churchName !== '') {
                church.name = churchName;
            }
            if (churchCity !== undefined && churchCity !== '') {
                church.city = churchCity;
            }
            if (churchState !== undefined && churchState !== '')
                church.stateProv = churchState;
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
            // updateCurrentUser(newCurrentUser);
            console.log('updateRedux function.............................');
        }
        updateRedux();

        history.push('/');

        history.push('/');
        clearSpinner();
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
            case 'homeState':
                setHomeState(value);
                break;
            case 'homePostalCode':
                setHomePostalCode(value);
                break;
            case 'churchName':
                setChurchName(value);
                break;
            case 'churchCity':
                setChurchCity(value);
                break;
            case 'churchState':
                setChurchState(value);
                break;
            default:
                break;
        }
    };
    return tmpUserLoading ? (
        <Spinner />
    ) : (
        <>
            <div className='admin-user-details-component__wrapper'>
                <div className='admin-user-details-component__events-box'>
                    <div className='admin-user-details-component__page-title'>
                        USER DETAILS
                    </div>
                    <div className='admin-user-details-component__event-box'>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                First name
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                name='firstName'
                                id='firstName'
                                value={firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                Last Name
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='lastName'
                                name='lastName'
                                onChange={handleChange}
                                value={lastName}
                                required
                            />
                        </div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                E-mail
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='email'
                                name='email'
                                onChange={handleChange}
                                value={email}
                                required
                            />
                        </div>
                        <div className='admin-user-details-component__data-row-phone'>
                            <PhoneInput
                                onlyCountries={['us']}
                                country='us'
                                disableCountryCode
                                disableDropdown
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                inputProps={{
                                    padding: 0,
                                    name: 'Cell',
                                    margin: 0,
                                    required: true,
                                    placeholder: '(xxx) xxx-xxxx',
                                }}
                            />
                            {/*
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='phone'
                                name='phone'
                                onChange={handleChange}
                                value={phone}
                                required
                            />
                            */}
                        </div>
                        <div className='profilehomesection'>Home Address</div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                Street
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='homeStreet'
                                name='homeStreet'
                                onChange={handleChange}
                                value={homeStreet}
                                required
                            />
                        </div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                City
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='homeCity'
                                name='homeCity'
                                onChange={handleChange}
                                value={homeCity}
                                required
                            />
                        </div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                State
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='homeState'
                                name='homeState'
                                onChange={handleChange}
                                value={homeState}
                                required
                            />
                        </div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                Zipcode
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='homePostalCode'
                                name='homePostalCode'
                                onChange={handleChange}
                                value={homePostalCode}
                                required
                            />
                        </div>
                        <div className='profilehomesection'>CR/Church Info</div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                Name
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='churchName'
                                name='churchName'
                                onChange={handleChange}
                                value={churchName}
                            />
                        </div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                City
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='churchCity'
                                name='churchCity'
                                onChange={handleChange}
                                value={churchCity}
                            />
                        </div>
                        <div className='admin-user-details-component__data-row'>
                            <div className='admin-user-details-component__data-label'>
                                State
                            </div>
                            <input
                                className='admin-user-details-component__date-control'
                                type='text'
                                id='churchState'
                                name='churchState'
                                onChange={handleChange}
                                value={churchState}
                            />
                        </div>
                        <div className='admin-user-details-component__button-wrapper'>
                            <button
                                className='admin-user-details-component__update-button'
                                // onClick={handleSubmitClick}
                            >
                                UPDATE
                            </button>
                            <button
                                className='admin-user-details-component__cancel-button'
                                onClick={handleCancelClick}
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadTmpUser: (user) => dispatch(loadTmpUser(user)),
    clearTmpUser: () => dispatch(clearTmpUser()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    tmpUser: state.pate.tmpUser,
    pate: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps, {
        setSpinner,
        clearSpinner,
        clearTmpUser,
        loadTmpUser,
        mapDispatchToProps,
    })
)(UserDetailsForm);

// export default connect(mapStateToProps, {
//     setSpinner,
//     clearSpinner,
//     updateCurrentUser,
//     mapDispatchToProps,
// })(UserDetailsForm);