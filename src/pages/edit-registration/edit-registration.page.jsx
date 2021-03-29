import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
// import { withAuthenticator } from '@aws-amplify/ui-react';

import './edit-registration.styles.scss';

import Header from '../../components/header/header.component';
import EventInfo from '../../components/event-info/event-info.component';
import Registrar from '../../components/registrar/registrar.component';
const UserProfile = ({ currentUser, pate, registrations, match }) => {
    const history = useHistory();
    const eventReference = match.params.eid;
    const registrationReference = match.params.rid;

    const regInfo = registrations.tempRegistration;
    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            history.push('/');
        }
    }, []);

    return (
        <>
            <Header />
            <EventInfo eventInfo={pate.rally} />
            <Registrar regData={regInfo} />
        </>
    );
    // }
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pate: state.pate,
    registrations: state.registrations,
});
export default compose(
    // withAuthenticator,
    withRouter,
    connect(mapStateToProps)
)(UserProfile);
