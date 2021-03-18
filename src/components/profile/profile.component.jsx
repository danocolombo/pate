import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';

import './profile.styles.scss';
const PersonalProfile = ({
    currentUser,
    setSpinner,
    clearSpinner,
    pateSystem,
}) => {
    // variables for the form
    const [firstName, setFirstName] = useState(currentUser?.firstName);
    const [lastName, setLastName] = useState(currentUser?.lastName);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    const [homeStreet, setHomeStreet] = useState(currentUser?.address?.street);
    const [homeCity, setHomeCity] = useState(currentUser?.address?.city);
    const [homeState, setHomeState] = useState(currentUser?.address?.state);
    const [homePostalCode, setHomePostalCode] = useState(
        currentUser?.address?.postalCode
    );
    const [churchName, setChurchName] = useState(currentUser?.church?.name);
    const [churchCity, setChurchCity] = useState(currentUser?.church?.city);
    const [churchState, setChurchState] = useState(currentUser?.address?.state);

    useEffect(() => {}, [pateSystem.showSpinner]);

    const handleSubmitClick = (event) => {
        event.preventDefault();
        setSpinner();
        // build currentUser object
        //church values are optional, so we want to send empty string if undefined
        if (churchName === undefined) setChurchName('');
        if (churchCity === undefined) setChurchCity('');
        if (churchState === undefined) setChurchState('');
        const profileUpdate = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: {
                street: homeStreet,
                city: homeCity,
                state: homeState,
                postalCode: homePostalCode,
            },
            church: {
                name: churchName,
                city: churchCity,
                state: churchState,
            },
        };
        const util = require('util');
        console.log(
            'profileUpdate: ' +
                util.inspect(profileUpdate, { showHidden: false, depth: null })
        );

        clearSpinner();
    };
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastNaem':
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
                        <div className='updateButton'>
                            <button onClick={handleSubmitClick}>UPDATE</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
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
    mapDispatchToProps,
})(PersonalProfile);
