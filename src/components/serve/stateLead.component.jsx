import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import StateRallyList from './stateLead-rally.component';
import './serve.styles.scss';
const StateLead = ({ currentUser, rallies }) => {
    // const [leadRallies, setLeadRallies] = useState([]);
    useEffect(() =>
        //loop through redux rallies and if there is any
        //in the state that this Lead is assigned, load
        //them in the leadRallies array.
        //==============================================

        {}, []);

    return (
        <>
            <div className='event-list-header'>State Events</div>
            <div className='stateleadintro'>
                These are the events within your state that you can view and
                manage, support and change.
            </div>
            {rallies
                ? rallies.map((rally) => <StateRallyList rally={rally} />)
                : null}
        </>
    );
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    rallies: state.stateLead.rally,
});
export default connect(mapStateToProps, null)(StateLead);
