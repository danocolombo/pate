import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import StateRepRally from './stateRep-rally.component';

import './serve.styles.scss';
const StateRep = ({ currentUser, rallies, doneRallies }) => {
    const history = useHistory();
    const handleNewRequest = (e) => {
        history.push('/newevent');
    };
    return (
        <>
            <div className='serve-component__event-list-header'>
                Your Events
            </div>
            {rallies ? (
                <>
                    {rallies.length > 0 ? <h3>Upcoming Events</h3> : null}

                    {rallies.map((rally) => (
                        <StateRepRally key={rally.uid} rally={rally} />
                    ))}
                </>
            ) : null}
            {doneRallies ? (
                <>
                    {doneRallies.length > 0 ? <h3>Past Events</h3> : null}

                    {doneRallies.map((drally) => (
                        <StateRepRally key={drally.uid} rally={drally} />
                    ))}
                </>
            ) : null}
            <div className='serve-component__button-wrapper'>
                <button
                    className='serve-component__new-button'
                    onClick={handleNewRequest}
                >
                    Add New Rally
                </button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    rallies: state.stateRep.rally,
    doneRallies: state.stateRep.doneRally,
});
export default connect(mapStateToProps, null)(StateRep);
