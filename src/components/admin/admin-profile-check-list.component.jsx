import React, { useEffect } from 'react';
/* -------------------------------
 this file is used to display the users as a list'
 ---------------------------------*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import './admin-registered-users.style.scss';
import { printObject } from '../../utils/helpers';
const ProfileDetails = ({ user, pate, clearTmpUser }) => {
    const handleClick = async () => {
        console.log('Clicked: ', user.firstName);
        printObject('APCLC:14==>user:\n', user);

        try {
            const userDef = {
                sub: user.uid,
                username: user?.username || '',
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                divisionDefaultUsersId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
                // street: user?.residence?.street || '',
                // city: user?.residence?.city || '',
                // stateProv: user?.residence?.stateProv || '',
                // postalCode: parseInt(user?.residence?.postalCode) || null,
            };
            printObject('APCLC:31==>userDef:\n', userDef);

            const results = await API.graphql({
                query: mutations.createUser,
                variables: { input: userDef },
            });
            console.log('APCLC:37-->results:\n', results);
            //* now create the residence entry
        } catch (error) {
            console.log('APCLC:39-->error:', error);
        }
    };
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
                    <div
                        onClick={handleClick}
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
                    </div>
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
)(ProfileDetails);
