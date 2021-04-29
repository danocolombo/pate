import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import StateRepRally from './stateRep-rally.component';

import './serve.styles.scss';
const StateRep = ({ currentUser, rallies }) => {
    const history = useHistory();
    const handleNewRequest = (e) => {
        history.push('/newevent');
    };
    return (
        <>
            <div className='serve-component__event-list-header'>Your Events</div>
            {rallies
                ? rallies.map((rally) => <StateRepRally key={rally.uid} rally={rally} />)
                : null}
            <div className='serve-component__button-wrapper'>
                
                    <button className='serve-component__new-button' onClick={handleNewRequest}>Add New Rally</button>
                
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    rallies: state.stateRep.rally,
});
export default connect(mapStateToProps, null)(StateRep);
