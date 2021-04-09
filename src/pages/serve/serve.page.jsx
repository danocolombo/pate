import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import './serve.styles.scss';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import StateRep from '../../components/serve/stateRep.component';
import StateLead from '../../components/serve/stateLead.component';
// import { loadRegistrations } from '../../redux/registrations/registrations.actions';
import { loadRallies } from '../../redux/stateRep/stateRep.actions';
import { loadStateRallies } from '../../redux/stateLead/stateLead.actions';

const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    loadRallies,
    loadStateRallies,
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
                    operation: 'getEventsForRep',
                    payload: {
                        uid: currentUser.uid,
                    },
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
                    operation: 'getEventsForLead',
                    payload: {
                        Item: {
                            stateID: searchState,
                        },
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
                    'dataBackFromDDB:  \n' +
                        util.inspect(data, {
                            showHidden: false,
                            depth: null,
                        })
                );

                stateData = data.body.Items;
            });
        // setRallyInfo(rallyInfo.concat(repData));

        loadStateRallies(stateData);
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='servepagewrapper'>
                <div className='serve-pageheader'>Principle 8 Service</div>
                <div className='servedetailswrapper'>
                    <div className='serve-page-message-box'>
                        This page allows you to coordinate events, as well as
                        manage and review details.
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
            <MainFooter />
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    loadRallies: (rallies) => dispatch(loadRallies(rallies)),
    loadStateRallies: (srallies) => dispatch(loadStateRallies(srallies)),
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
