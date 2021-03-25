import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import StateRepRally from './stateRep-rally.component';

import './serve.styles.scss';
const StateRep = ({ currentUser, loadRallies, rallies }) => {
    useEffect(() => {}, []);

    return (
        <>
            <div className='event-list-header'>Your Events</div>
            {rallies
                ? rallies.map((rally) => <StateRepRally rally={rally} />)
                : null}
        </>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    rallies: state.stateRep.rally,
});
export default connect(mapStateToProps, null)(StateRep);
