import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import {
    clearRegistration,
    loadRegistration,
} from '../../redux/pate/pate.actions';
import './edit-registration.styles.scss';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import EventInfo from '../../components/event-info/event-info.component';
import EventDetails from '../../components/event-details/event-component2';
import Registrar from '../../components/registrar/registrar.component';
import { loadRally } from '../../redux/pate/pate.actions';
const UserProfile = ({
    currentUser,
    pate,
    registrations,
    match,
    loadRegistration,
    clearRegistration,
    loadRally,
}) => {
    const history = useHistory();
    let theRegistration = {};
    const registrationReference = match.params.rid;
    const registrationId = match.params.id;
    const rallyReference = match.params.eid;
    //const regInfo = registrations.tempRegistration;
    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            history.push('/');
        }
        getRegistrationForUser();
        getRallyForRegistration();
    }, []);

    const getRegistrationForUser = async () => {
        try {
            async function clearIt() {
                clearRegistration();
            }
            clearIt();
            async function getIt() {
                //todo-gql   get registration to edit
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getRegistration',
                            payload: {
                                uid: registrationReference,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        theRegistration = data?.body?.Items[0];
                        if (theRegistration) {
                            clearRegistration();
                            loadRegistration(theRegistration);
                        }
                    });
            }
            getIt();
        } catch (error) {
            console.log('Error fetching registrations \n' + error);
        }
    };
    const getRallyForRegistration = async () => {
        // this takes the eid from the registration and loads the rally in
        // redux pate.rally
        try {
            async function fetchEvent() {
                //todo-gql  get event AGAIN!!!
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getEvent',
                            payload: {
                                uid: rallyReference,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // this.setState({ plan: data });
                        loadRally(data?.body?.Items[0]);
                    });
            }
            fetchEvent();
        } catch (error) {
            console.log('Error fetching rally \n' + error);
        }
    };
    return (
        <>
            <Header />
            {/*<EventInfo eventInfo={pate.rally} />*/}
            {pate?.rally ? <EventDetails theEvent={pate.rally} /> : null}
            {pate?.registration ? (
                <>
                    <Registrar regData={pate.registration} />
                </>
            ) : null}
            <MainFooter />
        </>
    );
    // }
};
const mapDispatchToProps = (dispatch) => ({
    loadRegistration: (reg) => dispatch(loadRegistration(reg)),
    clearRegistration: () => dispatch(clearRegistration()),
    loadRally: (rally) => dispatch(loadRally(rally)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pate: state.pate,
    registrations: state.registrations,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserProfile);
