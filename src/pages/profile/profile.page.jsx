import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './profile.styles.scss';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import EventsMarquee from '../../components/profile/profile.component2';
import PersonalProfile from '../../components/profile/profile.component';
import UserRegistrationOverview from '../../components/userregistrationsoverview/userregistrationsoverview.component';

const UserProfile = ({ currentUser, pateSystem }) => {
    const history = useHistory();
    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            history.push('/');
        }
    }, []);

    // render() {
    return (
        <>
            <Header />
            {/*<EventsMarquee />*/}
            <div className='profilepagewrapper'>
                <div className='pageheader'>PERSONAL PROFILE</div>
                <PersonalProfile />
                <div className='pageheader'>YOUR REGISTRATIONS</div>
                <UserRegistrationOverview />
            </div>
            <MainFooter />
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
