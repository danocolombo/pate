import React, { useEffect } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import './header.styles.scss';
import { clearUser } from '../../redux/user/user.actions';
import {
    clearRegistrations,
    clearTempRegistration,
    clearEventRegistrations,
} from '../../redux/registrations/registrations.actions';
import { clearRally } from '../../redux/pate/pate.actions';
import { clearStateRep } from '../../redux/stateRep/stateRep.actions';
import { clearStateLead } from '../../redux/stateLead/stateLead.actions';

const Header = ({
    currentUser,
    clearUser,
    clearRegistrations,
    clearTempRegistration,
    clearEventRegistrations,
    clearRally,
    clearStateLead,
    clearStateRep,
}) => {
    const history = useHistory();
    const logoutRequest = async () => {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
        async function logoffUser() {
            clearUser();
            clearRegistrations();
            clearTempRegistration();
            clearEventRegistrations();
            clearRally();
            clearStateLead();
            clearStateRep();
        }
        logoffUser();
        history.push('/');
    };
    return (
        <>
            <header className='header__flex-container'>
                <div className='header__brand-box'>
                    <Link to='/' className='header__brand-name'>
                        PATE
                    </Link>
                </div>
                <div className='header__nav-box'>
                    {currentUser?.isLoggedIn ? (
                        <>
                            {currentUser?.stateRep || currentUser?.stateLead ? (
                                <div className='header__nav-item'>
                                    <Link
                                        to='/serve'
                                        className='header__nav-control-link'
                                    >
                                        SERVE
                                    </Link>
                                </div>
                            ) : null}
                            <div className='header__nav-item'>
                                <Link
                                    to='/profile'
                                    className='header__nav-control-link'
                                >
                                    PROFILE
                                </Link>
                            </div>
                            <div className='header__nav-item'>
                                <Link
                                    to='#'
                                    onClick={logoutRequest}
                                    className='header__nav-control-link'
                                >
                                    LOGOUT
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className='header__nav-item'>
                            <Link
                                className='header__nav-control-link'
                                to='/signin'
                            >
                                Login/Sign-up
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    clearUser: () => dispatch(clearUser()),
    clearRegistrations: () => dispatch(clearRegistrations()),
    clearTempRegistration: () => dispatch(clearTempRegistration()),
    clearEventRegistrations: () => dispatch(clearEventRegistrations()),
    clearRally: () => dispatch(clearRally()),
    clearStateRep: () => dispatch(clearStateRep()),
    clearStateLead: () => dispatch(clearStateLead()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

//this was the logout button section that worked
// <div className='options'>
//     { loggedIn ? <CustomButton onClick={onClick} >Logout</CustomButton> :
//     <Link to="/signin"><CustomButton onClick={onClick} >Login</CustomButton></Link>
//     }
// </div>
