import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withAuthenticator } from '@aws-amplify/ui-react';

import './profile.styles.scss';

import Header from '../../components/header/header.component';
import PersonalProfile from '../../components/profile/profile.component';
import UserRegistrationOverview from '../../components/userregistrationsoverview/userregistrationsoverview.component';

const UserProfile = ({ currentUser, pateSystem }) => {
    useEffect(() => {
        if (currentUser.isLoggedIn) {
            console.log('INININININININ');
        } else {
            console.log('NONONONONONONO');
        }
    }, []);
    // render() {
    return (
        <>
            <Header />

            <div className='profilepagewrapper'>
                <div className='pageheader'>PERSONAL PROFILE</div>
                <PersonalProfile />
                <div className='pageheader'>YOUR REGISTRATIONS</div>
                {/*<UserRegistrationOverview />*/}
            </div>
        </>
    );
    // }
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pateSystem: state.pate,
});
export default compose(
    withAuthenticator,
    withRouter,
    connect(mapStateToProps)
)(UserProfile);
