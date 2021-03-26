import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import StateRepRally from './stateRep-rally.component';
import './serve.styles.scss';
const StateLead = ({ currentUser, rallies }) => {
    const [leadRallies, setLeadRallies] = useState([]);
    useEffect(() =>
        //loop through redux rallies and if there is any
        //in the state that this Lead is assigned, load
        //them in the leadRallies array.
        //==============================================

        {}, []);

    return (
        <>
            <div className='event-list-header'>State Events</div>
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
export default connect(mapStateToProps, null)(StateLead);
