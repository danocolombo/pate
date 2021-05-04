import React, { useEffect, useState, useRef } from 'react';
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
    // let userId = match?.params?.id;
    // const [tmpUserLoading, setTmpUserLoading] = useState(true);
    // variables for the form
    const refStateRepCheckbox = useRef(null);
    const [firstName, setFirstName] = useState(pate.tmpUser?.firstName);
    const [lastName, setLastName] = useState(pate.tmpUser?.lastName);
    const [email, setEmail] = useState(pate.tmpUser?.email);
    const [phone, setPhone] = useState(pate.tmpUser?.phone);
    const [street, setStreet] = useState(pate.tmpUser?.street);
    const [city, setCity] = useState(pate.tmpUser?.city);
    const [stateProv, setStateProv] = useState(pate.tmpUser?.stateProv);
    const [postalCode, setPostalCode] = useState(pate.tmpUser?.postalCode);
    const [churchName, setChurchName] = useState(pate.tmpUser?.churchName);
    const [churchCity, setChurchCity] = useState(pate.tmpUser?.churchCity);
    const [churchState, setChurchState] = useState(
        pate.tmpUser?.churchStateProv
    );
    const [uid, setUID] = useState(pate.tmpUser.uid);

    useEffect(() => {
        // if (!currentUser.isLoggedIn) history.push('/');
        //need to identify the selected user and define the
        //redux value to display
        console.log('component start');
        // getTmpUser();

        console.log('component end');
    }, []);
    // useEffect(() => {}, [pate.showSpinner]);
    // const getTmpUser = () => {
    //     //clear any data we might have
    //     async function clearData() {
    //         clearTmpUser();
    //     }
    //     clearData();
    //     //search pate.users for this user
    //     pate.users.forEach((user) => {
    //         if (user.uid === userId) {
    //             console.log('FOUND IT');
    //             loadTmpUser(user);
    //             setTmpUserLoading(false);
    //         }
    //     });
    // };
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
        if (churchName || churchCity || churchState) {
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
                setPostalCode(value);
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
    // return tmpUserLoading ? (
    //     <Spinner />
    // ) : (

    return (
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
                                id='street'
                                name='street'
                                onChange={handleChange}
                                value={street}
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
                                id='city'
                                name='city'
                                onChange={handleChange}
                                value={city}
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
                                id='stateProv'
                                name='stateProv'
                                onChange={handleChange}
                                value={stateProv}
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
                                id='postalCode'
                                name='postalCode'
                                onChange={handleChange}
                                value={postalCode}
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
                                className='admin-user-details-component__data-control'
                                type='text'
                                id='churchState'
                                name='churchState'
                                onChange={handleChange}
                                value={churchState}
                            />
                        </div>
                        <div className='profilehomesection'>
                            System Information
                        </div>
                        <div className='admin-user-details-component__read-only-row-sm'>
                            {pate.tmpUser.uid}
                        </div>
                        <div className='admin-user-details-component__read-only-row'>
                            login: {pate.tmpUser.login}
                        </div>
                        <div className='admin-user-details-component__read-only-row'>
                            status: {pate.tmpUser.status}
                        </div>
                        <div className='admin-user-details-component__read-only-row-sm'>
                            last modified: {pate.tmpUser.lastModifiedDate}
                        </div>
                        {/* ================== */}
                        

                        <div className='admin-user-details-component__data-row'>
                            <div></div>
                            <div className='serveevent-page__grid-data-box'>
                                <div className='admin-user-details-component__data-label'>
                                    State Rep:
                                </div>
                                <div className='admin-user-details-component__data-control'>
                                    {pate.tmpUser?.stateRep ? (
                                        //this is a rep
                                        <input
                                            type='checkbox'
                                            id='stateRep'
                                            name='stateRep'
                                            checked
                                            onClick={handleChange}
                                            onChange={() => handleChange}
                                            value='true'
                                            ref={refStateRepCheckbox}
                                        />
                                    ) : (
                                        <input
                                            type='checkbox'
                                            id='stateRep'
                                            name='stateRep'
                                            value='true'
                                            onClick={handleChange}
                                            onChange={() => handleChange}
                                            ref={refStateRepCheckbox}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>







                        {/* ================== */}
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
