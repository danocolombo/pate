import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import StateRep from '../../components/serve/stateRep.component';
import StateLead from '../../components/serve/stateLead.component';
// import { loadRegistrations } from '../../redux/registrations/registrations.actions';
import {
    loadRallies,
    loadDoneRallies,
} from '../../redux/stateRep/stateRep.actions';
import {
    loadLeadRallies,
    loadLeadDoneRallies,
} from '../../redux/stateLead/stateLead.actions';
import { setPateRallies } from '../../redux/pate/pate.actions';
import { printObject } from '../../utils/helpers';
import './serve.styles.scss';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    loadRallies,
    loadDoneRallies,
    loadLeadRallies,
    loadLeadDoneRallies,
    setPateRallies,
}) => {
    const history = useHistory();

    useEffect(() => {
        if (!currentUser?.isLoggedIn) history.push('/');
        //get the usersRallies
        async function reps() {
            getMyRallies();
        }
        reps();

        //if current user is a state lead, get state rallies
        if (currentUser?.stateLead) {
            getStateRallies();
        }
    }, []);

    useEffect(() => {
        async function getDivisionEvents() {
            const variables = {
                divId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            };
            API.graphql(
                graphqlOperation(queries.getAllDivisionEvents, variables)
            )
                .then((divisionEvents) => {
                    if (
                        divisionEvents?.data?.getDivision?.events.items.length >
                        0
                    ) {
                        printObject(
                            'SP:68-->allDivisionEvents: ',
                            divisionEvents?.data?.getDivision?.events.items
                        );
                        console.log('SET_PATE_RALLIES');
                        setPateRallies(
                            divisionEvents.data.getDivision.events.items
                        );
                    } else {
                        console.log('SP:74--> NO EVENTS TO DISPLAY');
                    }
                })
                .catch((error) => {
                    printObject(
                        'SP:79--> error getting all division events from graphql',
                        error
                    );
                });
        }
        getDivisionEvents();
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);

    const getMyRallies = async () => {
        //this gets the current rallies for the user and loads it in redux
        let repData = {};
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getActiveEvents',
                    coordinator: currentUser.uid,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                repData = data.body;
            });
        // setRallyInfo(rallyInfo.concat(repData));

        loadRallies(repData);
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getHistoricEvents',
                    coordinator: currentUser.uid,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                repData = data.body;
            });
        // setRallyInfo(rallyInfo.concat(repData));

        loadDoneRallies(repData);
    };

    const getStateRallies = async () => {
        //this gets the current rallies for the state
        let searchState = currentUser?.stateLead;
        let stateData = {};
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getActiveEvents',
                    state: currentUser.stateLead,
                    affiliate: currentUser?.affiliate || 'CRP8',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                stateData = data.body;
            });
        loadLeadRallies(stateData);
        stateData = {};
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getHistoricEvents',
                    state: currentUser.stateLead,
                    affiliate: currentUser?.affiliate || 'CRP8',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                stateData = data.body;
            });
        loadLeadDoneRallies(stateData);
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />

            <div className='serve-page__wrapper'>
                <div className='serve-page_serve-box'>
                    <div className='serve-page__header'>
                        Principle 8 Service
                    </div>
                    <div className='serve-page__details-wrapper'>
                        <div className='serve-page__message-box'>
                            This page allows you to coordinate events, as well
                            as manage and review details.
                        </div>
                        <StateRep />

                        {currentUser?.stateLead ? (
                            <>
                                <StateLead />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    loadRallies: (rallies) => dispatch(loadRallies(rallies)),
    loadDoneRallies: (rallies) => dispatch(loadDoneRallies(rallies)),
    loadLeadRallies: (srallies) => dispatch(loadLeadRallies(srallies)),
    loadLeadDoneRallies: (srallies) => dispatch(loadLeadDoneRallies(srallies)),
    setPateRallies: (rallies) => dispatch(setPateRallies(rallies)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
