import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './event.styles.scss';
import EventDetails from '../../components/event-details/event-component';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import { printObject } from '../../utils/helpers';
const Events = ({
    currentUser,
    match,
    setSpinner,
    clearSpinner,
    pateSystem,
    registrations,
    loadRally,
}) => {
    const [plan, setPlan] = useState({});

    useEffect(() => {
        const id = match.params.id;

        async function fetchEvent() {
            const variables = {
                id: id,
            };
            API.graphql(
                graphqlOperation(
                    queries.getEventDetailsNoRegistrations,
                    variables
                )
            )
                .then((theEvent) => {
                    // console.log('1.');
                    if (theEvent?.data?.getEvent) {
                        // console.log('2.');
                        // printObject(
                        //     'EP:46-->event: ',
                        //     theEvent?.data?.getEvent
                        // );
                        // console.log('3.');
                        setPlan(theEvent.data.getEvent);
                        try {
                            loadRally(theEvent.data.getEvent);
                        } catch (err) {
                            printObject('Error loadRally:\n', err);
                        }

                        // console.log('4. done loading event/rally');
                    } else {
                        console.log('EP:73--> NO EVENTS TO DISPLAY');
                    }
                })
                .catch((error) => {
                    printObject(
                        'EP:78--> error getting division events from graphql',
                        error
                    );
                });
        }
        fetchEvent();
    }, []);
    return plan === null ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='eventwrapper'>
                <EventDetails theEvent={plan} />
            </div>
            <MainFooter />
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRally: (rally) => dispatch(loadRally(rally)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    registrations: state.registrations.confirmed,
    pateSystem: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Events);
