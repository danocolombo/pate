import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import './serveEvent.styles.scss';
import Header from '../../components/header/header.component';
// import Spinner from '../../components/spinner/Spinner';
// import RegistrationItem from '../../components/registration-serve-list-item/registrationServeListItem.component';
// import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import { loadTempRegistration } from '../../redux/registrations/registrations.actions';
// import {
//     loadEventRegistrations,
//     clearEventRegistrations,
// } from '../../redux/registrations/registrations.actions';
import ServeEvent from '../../components/serve-event/serve-event.component';
import EventInfo from '../../components/event-info/event-info.component';
import { loadEventRegistrations } from '../../redux/registrations/registrations.actions';
import EventRegistrations from '../../components/event-registrations/event-registrations.component';
const Serve = ({
    match,
    pate,
    stateRepRally,
    loadRally,
    loadEventRegistrations,
    eventRegistrations,
}) => {
    const [regID, setregID] = useState(0);
    useEffect(() => {
        loadRegistrationsToPate();
        loadEventToPate();
    }, []);
    const loadRegistrationsToPate = async () => {
        async function getEventRegistrations() {
            try {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getRegistrationsForEvent',
                            payload: {
                                eid: match?.params?.id,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const util = require('util');
                        console.log(
                            'registrations-data:\n' +
                                util.inspect(data.body, {
                                    showHidden: false,
                                    depth: null,
                                })
                        );
                        loadEventRegistrations(data?.body?.Items);
                    });
            } catch (error) {
                // clearSpinner();
                console.log('Error fetching registrations \n' + error);
            }
        }
        await getEventRegistrations();
    };

    const loadEventToPate = async () => {
        console.log('event is ' + match.params.id);

        let cnt = 0;
        stateRepRally.forEach((rallyEvent) => {
            if (rallyEvent.uid === match.params.id) {
                //-----------------
                // seave the event to redux
                async function rallyToRedux() {
                    loadRally(rallyEvent);
                }
                rallyToRedux();
                setregID(cnt);
                //loadTempRegistration(stateRepRally[cnt]);
                // console.log('stateRep.rally[' + cnt + ']');
            }
            cnt = cnt + 1;
        });
    };

    return (
        <>
            <Header />
            <EventInfo eventInfo={pate.rally} />
            <ServeEvent eData={pate.rally} eCnt={regID} />
            <EventRegistrations />
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    loadRally: (rally) => dispatch(loadRally(rally)),
    // loadTempRegistration: (rEvent) => dispatch(loadTempRegistration(rEvent)),
    loadEventRegistrations: (registrations) =>
        dispatch(loadEventRegistrations(registrations)),
});
const mapStateToProps = (state) => ({
    stateRepRally: state.stateRep.rally,
    pate: state.pate,
    registrations: state.registrations.eventRegistrations,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
