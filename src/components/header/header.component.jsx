import React, { useEffect } from 'react';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { AiOutlineSetting } from 'react-icons/ai';
import { GiSecurityGate } from 'react-icons/gi';
import { FaSlideshare } from 'react-icons/fa';
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
import { clearRally, clearRegistration } from '../../redux/pate/pate.actions';
import { clearStateRep } from '../../redux/stateRep/stateRep.actions';
import { clearStateLead } from '../../redux/stateLead/stateLead.actions';

const Header = ({
    currentUser,
    clearUser,
    clearRegistrations,
    clearTempRegistration,
    clearEventRegistrations,
    clearRally,
    clearRegistration,
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
            clearRegistration();
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
                        P8 Rally
                    </Link>
                </div>
                <div className='header__nav-box'>
                    {currentUser?.isLoggedIn ? (
                        <>
                            {' '}
                            {currentUser?.login === 'guru' ? (
                                <div className='header__nav-item'>
                                    <Link
                                        to='/admin'
                                        className='header__nav-control-link'
                                    >
                                        <span className='nav-icon'>
                                            <GiSecurityGate />
                                        </span>{' '}
                                        <span className='hide-sm'>ADMIN</span>
                                    </Link>
                                </div>
                            ) : null}
                            {currentUser?.stateRep || currentUser?.stateLead ? (
                                <div className='header__nav-item'>
                                    <Link
                                        to='/serve'
                                        className='header__nav-control-link'
                                    >
                                        <span className='nav-icon'>
                                            <FaSlideshare />
                                        </span>{' '}
                                        <span className='hide-sm'>SERVE</span>
                                    </Link>
                                </div>
                            ) : null}
                            <div className='header__nav-item'>
                                <Link
                                    to='/profile'
                                    className='header__nav-control-link'
                                >
                                    <span className='nav-icon'>
                                        <AiOutlineSetting />
                                    </span>{' '}
                                    <span className='hide-sm'>PROFILE</span>
                                </Link>
                            </div>
                            <div className='header__nav-item'>
                                <Link
                                    to='#'
                                    onClick={logoutRequest}
                                    className='header__nav-control-link'
                                >
                                    <span className='nav-icon'>
                                        <BiLogOut />
                                    </span>{' '}
                                    <span className='hide-sm'>LOGOUT</span>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className='header__nav-item'>
                            <Link
                                className='header__nav-control-link'
                                to='/signin'
                            >
                                <span className='nav-icon'>
                                    <BiLogIn />
                                </span>{' '}
                                <span className='hide-sm'>Login/Sign-up</span>
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
    clearRegistration: () => dispatch(clearRegistration()),
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
