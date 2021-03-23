import React, { useEffect } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import CustomButton from '../custom-button/custom-button.component';
import UserStatusBox from '../user-status-box/userStatusBox.component';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/pate-logo-white.svg';
import { clearUser } from '../../redux/user/user.actions';
import { clearRegistrations } from '../../redux/registrations/registrations.actions';

const Header = ({ currentUser, clearUser }) => {
    // useEffect(() => {
    //     checkWho();
    // }, []);
    // useEffect(() => {
    //     console.log('refresh nav');
    // }, [currentUser]);

    // const checkWho = async () => {
    //     await Auth.currentUserInfo().then((user) => {
    //         console.log('currentUser:\n' + user?.username);
    //     });
    // };
    // const logoutRequest = async () => {
    //     console.log('LOGOUT->LOGOUT->LOGOUT');
    //     try {
    //         await Auth.signOut();
    //     } catch (error) {
    //         console.log('error signing out: ', error);
    //     }
    //     clearUser(currentUser);
    // };
    const history = useHistory();
    const logoutRequest = async () => {
        console.log('LOGOUT->LOGOUT->LOGOUT');
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
        clearUser(currentUser);
        clearRegistrations();
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
    clearUser: (user) => dispatch(clearUser(user)),
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
