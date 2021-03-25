import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import './serve.styles.scss';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
}) => {
    
    const history = useHistory();

    useEffect(() => {}, []);

    useEffect(() => {}, [pateSystem.showSpinner]);
    const handleSubmitClick = (event) => {
        event.preventDefault();
    }
    
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div className='servepagewrapper'>
                <div className='serve-pageheader'>Principle 8 Service</div>
                <div className='servedetailswrapper'>
                    <div className='welcome-message'>This page allows you to coordinate events, as well as manage and review details.</div>
                    <div className='event-list-header'>Your events</div>
                    <div className='event-list-wrapper'>
                        <div className='event-list-item'>latest</div>
                        <div className='event-list-item'>older</div>
                        <div className='event-list-item'>oldest</div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
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
