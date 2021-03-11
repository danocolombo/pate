import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import CustomButton from '../custom-button/custom-button.component';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/pate-logo-white.svg';
import { clearUser } from '../../redux/user/user.actions';

const Header = ({ currentUser, clearUser }) => {
    const logoutRequest = async () => {
        console.log('LOGOUT->LOGOUT->LOGOUT');
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
        clearUser(currentUser);
    };
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                {currentUser?.isLoggedIn ? (
                    <button onClick={logoutRequest}>Logout</button>
                ) : (
                    <Link to='/signin'>
                        <CustomButton>Login</CustomButton>
                    </Link>
                )}
            </div>
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
