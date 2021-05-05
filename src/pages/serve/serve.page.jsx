import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';

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
                                <div>
                                    <hr />
                                </div>
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
