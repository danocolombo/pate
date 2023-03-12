import React, { useEffect } from 'react';
/* -------------------------------
 this file is used to display the users as a list'
 ---------------------------------*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import './admin-registered-users.style.scss';
const RegisteredDetails = ({ user, pate, clearTmpUser }) => {
    useEffect(() => {}, []);
    return (
        <>
            <div className='reg-user-list-component__box'>
                <div
                    className={
                        user.gqlProfile
                            ? 'reg-user-list-component__link-wrapper'
                            : 'reg-user-list-component__unreg-link-wrapper'
                    }
                >
                    <Link
                        to={`/userdetails/${user.uid}`}
                        className='reg-user-list-component__detail-link'
                    >
                        {user.firstName ? (
                            <span>
                                {user.firstName} {user.lastName}
                            </span>
                        ) : (
                            <span>{user.login} </span>
                        )}
                        {user.stateRep ? (
                            <span className='reg-user-list-component__role-inicator'>
                                (R)
                            </span>
                        ) : null}
                        {user.stateLead ? (
                            <span className='reg-user-list-component__role-inicator'>
                                (L)
                            </span>
                        ) : null}
                        {user.gqlProfile ? (
                            <span className='reg-ser-list-component__role-indicator'>
                                [GQL]
                            </span>
                        ) : null}
                    </Link>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    // clearTmpUser: () => dispatch(clearTmpUser()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    // tmpUser: state.pate.tmpUser,
    pate: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps, {
        // clearTmpUser,
        mapDispatchToProps,
    })
)(RegisteredDetails);
