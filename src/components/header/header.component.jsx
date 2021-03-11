import React, { useEffect } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import CustomButton from '../custom-button/custom-button.component';
import UserStatusBox from '../user-status-box/userStatusBox.component';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/pate-logo-white.svg';
import { clearUser } from '../../redux/user/user.actions';

const Header = ({ currentUser, clearUser }) => {
    // useEffect(() => {
    //     console.log('refresh nav');
    // }, [currentUser]);
    // const logoutRequest = async () => {
    //     console.log('LOGOUT->LOGOUT->LOGOUT');
    //     try {
    //         await Auth.signOut();
    //     } catch (error) {
    //         console.log('error signing out: ', error);
    //     }
    //     clearUser(currentUser);
    // };
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <UserStatusBox />
        </div>
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
