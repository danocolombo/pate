import React, { useEffect } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { clearUser } from '../../redux/user/user.actions';
import { clearRegistrations } from '../../redux/registrations/registrations.actions';
import './userStatusBox.styles.scss';
const UserStatusBox = ({ currentUser, clearUser, clearRegistrations }) => {
    useEffect(() => {}, [currentUser]);
    const history = useHistory();
    const profileRequest = async () => {
        history.push('/profile');
    };
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
        <div className='control-box-wrapper'>
            {currentUser?.isLoggedIn ? (
                <>
                    <p onClick={profileRequest} className='login-icon'>
                        <CgProfile />
                    </p>
                    <p onClick={logoutRequest} className='login-icon'>
                        <BiLogOutCircle />
                        &nbsp;Logout
                    </p>
                </>
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
    clearRegistrations: () => dispatch(clearRegistrations()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserStatusBox);
