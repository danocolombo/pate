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
            <div className='serve-page__event-list-header'>State Events</div>
            <div className='serve-page__message-box'>
                These are the events within your state that you can view and
                manage, support and change.
            </div>
            <div className='serve-component-lead__list-wrapper'>
            {rallies
                ? rallies.map((rally) => <StateRallyList key={rally.uid} rally={rally} />)
                : null}
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    rallies: state.stateLead.rally,
});
export default connect(mapStateToProps, null)(StateLead);
