import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { updateCurrentUser } from '../../redux/user/user.actions';
import './profile.styles.scss';
const PersonalProfile = ({
    currentUser,
    setSpinner,
    updateCurrentUser,
    clearSpinner,
    pateSystem,
}) => {
    const history = useHistory();
    // variables for the form
    const [firstName, setFirstName] = useState(currentUser?.firstName);
    const [lastName, setLastName] = useState(currentUser?.lastName);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    const [homeStreet, setHomeStreet] = useState(
        currentUser?.residence?.street
    );
    const [homeCity, setHomeCity] = useState(currentUser?.residence?.city);
    const [homeState, setHomeState] = useState(
        currentUser?.residence?.stateProv
    );
    const [homePostalCode, setHomePostalCode] = useState(
        currentUser?.residence?.postalCode
    );
    const [churchName, setChurchName] = useState(currentUser?.church?.name);
    const [churchCity, setChurchCity] = useState(currentUser?.church?.city);
    const [churchState, setChurchState] = useState(
        currentUser?.church?.stateProv
    );
    useEffect(() => {
        if (!currentUser.isLoggedIn) history.push('/');
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);

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
                    const util = require('util');
                    console.log(
                        'db data returned: \n' +
                            util.inspect(data, {
                                showHidden: false,
                                depth: null,
                            })
                    );
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

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <div className='personalprofilewrapper'>
                <div className='profileform'>
                    <form>
                        <div>
                            <label htmlFor='firstName'>First name</label>
                            <input
                                type='text'
                                name='firstName'
                                id='firstName'
                                value={firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='lastName'>Last name</label>
                            <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                onChange={handleChange}
                                value={lastName}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                onChange={handleChange}
                                value={email}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='phone'>Telephone</label>
                            <input
                                type='text'
                                id='phone'
                                name='phone'
                                onChange={handleChange}
                                value={phone}
                                required
                            />
                        </div>
                        <div className='profilehomesection'>Home Address</div>
                        <div className='profileaddress'>
                            <div>
                                <label htmlFor='homeStreet'>Street</label>
                                <input
                                    type='text'
                                    id='homeStreet'
                                    name='homeStreet'
                                    onChange={handleChange}
                                    value={homeStreet}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='homeCity'>City</label>
                                <input
                                    type='text'
                                    id='homeCity'
                                    name='homeCity'
                                    onChange={handleChange}
                                    value={homeCity}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='homeState'>State</label>
                                <input
                                    type='text'
                                    id='homeState'
                                    name='homeState'
                                    onChange={handleChange}
                                    value={homeState}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='homePostalCode'>
                                    Postal Code
                                </label>
                                <input
                                    type='text'
                                    id='homePostalCode'
                                    name='homePostalCode'
                                    onChange={handleChange}
                                    value={homePostalCode}
                                    required
                                />
                            </div>
                            <div className='churchsection'>
                                CR / Church Information
                            </div>
                            <div>
                                <label htmlFor='churchName'>Name</label>
                                <input
                                    type='text'
                                    id='churchName'
                                    name='churchName'
                                    onChange={handleChange}
                                    value={churchName}
                                />
                            </div>
                            <div>
                                <label htmlFor='churchCity'>City</label>
                                <input
                                    type='text'
                                    id='churchCity'
                                    name='churchCity'
                                    onChange={handleChange}
                                    value={churchCity}
                                />
                            </div>
                            <div>
                                <label htmlFor='churchState'>State</label>
                                <input
                                    type='text'
                                    id='churchState'
                                    name='churchState'
                                    onChange={handleChange}
                                    value={churchState}
                                />
                            </div>
                        </div>
                        <div className='updatebuttonwrapper'>
                            <button
                                className='updatebutton'
                                onClick={handleSubmitClick}
                            >
                                UPDATE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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
})(PersonalProfile);
