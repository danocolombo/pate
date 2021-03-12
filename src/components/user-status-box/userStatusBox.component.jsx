import React, { useEffect } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { clearUser } from '../../redux/user/user.actions';
import './userStatusBox.styles.scss';
const UserStatusBox = ({ currentUser, clearUser }) => {
    useEffect(() => {
    }, [currentUser]);
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
        <div className='control-box-wrapper'>
            {currentUser?.isLoggedIn ? (
                <p onClick={logoutRequest} className='login-icon'>
                    <BiLogOutCircle />
                    &nbsp;Logout
                </p>
            ) : (
                <Link to='/signin' className='login-icon'>
                    <BiLogInCircle />
                    &nbsp;Login
                </Link>
            )}
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    clearUser: (user) => dispatch(clearUser(user)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserStatusBox);
