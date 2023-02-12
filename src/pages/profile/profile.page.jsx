import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './profile.styles.scss';
import ModalWrapper from '../../components/modals/wrapper.modal';
import ProfileNotification from '../../components/modals/profile-reminder/profile-reminder.component';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Profile2 from '../../components/profile/profile.component2';
import PersonalProfile from '../../components/profile/profile.component';
import UserRegistrationOverview from '../../components/userregistrationsoverview/userregistrationsoverview.component';
import { loadRegistrations } from '../../redux/registrations/registrations.actions';
const UserProfile = ({
    currentUser,
    pateSystem,
    loadRegistrations,
    setSpinner,
    clearSpinner,
}) => {
    const history = useHistory();
    const [isCompleteProfileModalVisible, setIsCompleteProfileModalVisible] =
        useState(false);
    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            history.push('/');
        }
        if (!currentUser?.residence) {
            setIsCompleteProfileModalVisible(true);
        } else {
            setIsCompleteProfileModalVisible(false);
        }
        // getRegistrations();
    }, []);

    const dismissProfileReminderModal = () => {
        setIsCompleteProfileModalVisible(false);
    };
    // render() {
    return (
        <>
            <Header />

            <div className='profilepagewrapper'>
                {/*<div className='pageheader'>PERSONAL PROFILE</div>*/}
                <Profile2 />
                {/*<PersonalProfile />*/}
                {/*<div className='profile-page__'>YOUR REGISTRATIONS</div>*/}
                {currentUser.registrations.items.length > 0 && (
                    <UserRegistrationOverview />
                )}
            </div>
            <MainFooter />
            <ModalWrapper isOpened={isCompleteProfileModalVisible}>
                <ProfileNotification
                    onClose={() => dismissProfileReminderModal()}
                />
            </ModalWrapper>
        </>
    );
    // }
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRegistrations: (registrations) =>
        dispatch(loadRegistrations(registrations)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pateSystem: state.pate,
});
export default compose(
    withAuthenticator,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserProfile);
