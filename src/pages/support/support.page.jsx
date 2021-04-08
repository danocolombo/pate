import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Header from '../../components/header/header.component';
const Support = () => {
    return (
        <>
            <Header />
            <div>
                <span>SUPPORT PAGE</span>
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
