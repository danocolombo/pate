import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';

import './profile.styles.scss';
const PersonalProfile = ({currentUser, setSpinner, clearSpinner, pateSystem}) => {
    // variables for the form
    const [firstName, setFirstName] = useState(currentUser?.firstName);
    const [lastName, setLastName] = useState(currentUser?.lastName);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    const [homeStreet, setHomeSteet] = useState(currentUser?.address?.street);
    const [homeCity, setHomeCity] = useState(currentUser?.address?.city);
    const [homeState, setHomeState] = useState(currentUser?.address?.state);
    const [homePostalCode, setHomePostalCode] = useState(currentUser?.address?.postalCode);
    const [churchName, setChurchName] = useState(currentUser?.church?.name);
    const [churchCity, setChurchCity] = useState(currentUser?.church?.city);
    const [churchState, setChurchState] = useState(currentUser?.address?.state);
    
    useEffect(() => {
        spinnerOn();
        console.log('LOADED ' + firstName + '\'s profile');
        
        spinnerOff();
        //need to get profile data into state variables

        // effect
        // return () => {
        //     cleanup
        // }
    }, []);
    const spinnerOn = () => {
        setSpinner();
    }
    const spinnerOff = () => {
        clearSpinner();
    }
    return (
        <>
            <div className='personalprofilewrapper'>
                <div className='profileform'>
                    <form>
                        <div>
                            <label for='first-name'>First name</label>
                            <input type='text' id='firstname' value={firstName} required />
                        </div>
                        <div>
                            <label for='last-name'>Last name</label>
                            <input type='text' id='lastname' value={lastName} required />
                        </div>
                        <div>
                            <label for='profileemail'>E-mail</label>
                            <input type='text' id='profileemail' value={email} required />
                        </div>
                        <div>
                            <label for='profilephone'>Telephone</label>
                            <input type='text' id='profilephone' value={phone} required />
                        </div>
                        <div className='profilehomesection'>Home Address</div>
                        <div className='profileaddress'>
                            <div>
                                <label for='profilestreet'>Street</label>
                                <input
                                    type='text'
                                    id='profilestreet'
                                    value={homeStreet}
                                    required
                                />
                            </div>
                            <div>
                                <label for='profilecity'>City</label>
                                <input type='text' id='profilecity' value={homeCity} required />
                            </div>
                            <div>
                                <label for='profilestate'>State</label>
                                <input type='text' id='profilestate' value={homeState} required />
                            </div>
                            <div>
                                <label for='profilepostalcode'>
                                    Postal Code
                                </label>
                                <input
                                    type='text'
                                    id='profilepostalcode'
                                    value={homePostalCode}
                                    required
                                />
                            </div>
                            <div className='churchsection'>
                                CR / Church Information
                            </div>
                            <div>
                                <label for='churchname'>Name</label>
                                <input type='text' id='churchname' value={churchName} required />
                            </div>
                            <div>
                                <label for='churchcity'>City</label>
                                <input type='text' id='churchcity' value={churchCity} required />
                            </div>
                            <div>
                                <label for='churchstate'>State</label>
                                <input type='text' id='churchstate' value={churchState} required />
                            </div>
                        </div>
                        <div className='profilebutton'>
                            <button>UPDATE</button>
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
export default 
    connect(mapStateToProps, { setSpinner, clearSpinner,mapDispatchToProps })
(PersonalProfile);

