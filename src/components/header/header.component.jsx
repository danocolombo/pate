import React, { useEffect } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import './header.styles.scss';
import { clearUser } from '../../redux/user/user.actions';
import { clearRegistrations } from '../../redux/registrations/registrations.actions';
import { clearRally } from '../../redux/pate/pate.actions';
import { clearStateRep } from '../../redux/stateRep/stateRep.actions';
import { clearStateLead } from '../../redux/stateLead/stateLead.actions';

const Header = ({
    currentUser,
    clearUser,
    clearRegistrations,
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
        clearUser();
        clearRegistrations();
        clearRally();
        clearStateLead();
        clearStateRep();
        history.push('/');
    };
    return (
        <>
            <header className='main-header'>
                <div>
                    <Link to='/' className='brand-name'>
                        PATE
                    </Link>
                </div>
                <nav className='main-nav'>
                    {currentUser?.isLoggedIn ? (
                        <ul className='main-nav__items'>
                            {currentUser?.stateRep || currentUser?.stateLead ? (
                                <li className='main-nav__item'>
                                    <Link to='/serve'>SERVE</Link>
                                </li>
                            ) : null}
                            <li className='main-nav__item'>
                                <Link to='/profile'>PROFILE</Link>
                            </li>
                            <li className='main-nav__item'>
                                <Link onClick={logoutRequest}>LOGOUT</Link>
                            </li>
                        </ul>
                    ) : (
                        <li className='main-nav__item'>
                            {/*<a href='/signin'>Login/Sign-up</a>*/}
                            <li className='main-nav__item'>
                                <Link to='/signin'>Login/Sign-up</Link>
                            </li>
                        </li>
                    )}
                </nav>
            </header>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    clearUser: () => dispatch(clearUser()),
    clearRegistrations: () => dispatch(clearRegistrations()),
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
