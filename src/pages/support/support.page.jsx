import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Header from '../../components/header/header.component';
const Support = () => {
    return (
        <>
            <Header />
            <div className="support-box">
                <div className="support-flex-box__container">
                    <div className="support-flex-box__body">
                    Support Data Here
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    registrations: state.registrations,
});
export default compose(withRouter, connect(mapStateToProps))(Support);
