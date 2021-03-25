import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import './serve.styles.scss';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import StateRep from '../../components/serve/stateRep.component';
import StateLead from '../../components/serve/stateLead.component';
import { loadRegistrations } from '../../redux/registrations/registrations.actions';
import { loadRallies } from '../../redux/stateRep/stateRep.actions';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    loadRallies,
}) => {
    const history = useHistory();

    useEffect(() => {
        if (!currentUser?.isLoggedIn) history.push('/');
        //get the usersRallies
        getMyRallies();
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
                repData = data.body.Items;
            });
        // setRallyInfo(rallyInfo.concat(repData));

        loadRallies(repData);
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='servepagewrapper'>
                <div className='serve-pageheader'>Principle 8 Service</div>
                <div className='servedetailswrapper'>
                    <div className='message-box'>
                        This page allows you to coordinate events, as well as
                        manage and review details.
                    </div>
                    <StateRep loadRallies={() => this.loadRallies()} />

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
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    loadRallies: (rallies) => dispatch(loadRallies(rallies)),
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
