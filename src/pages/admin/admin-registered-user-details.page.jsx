import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
const RegisteredUserDetails = ({ match, setSpinner, clearSpinner }) => {
    let userId = match?.params?.id;
    return (
        <div>
            <div>
                <h3>{userId}</h3>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pate: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps)
)(RegisteredUserDetails);
