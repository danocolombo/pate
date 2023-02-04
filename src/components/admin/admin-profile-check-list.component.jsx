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
    async function stall(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    const handleClick = async () => {
        console.log('Clicked: ', user.firstName);
        printObject('APCLC:14==>DDBuser:\n', user);

        try {
            //*     create the residence entry
            // first check if there is any residence to add...
            let residence = false;
            if (user?.residence?.street.length > 0) {
                residence = true;
            } else if (user?.residence?.city.length > 0) {
                residence = true;
            } else if (user?.residence?.stateProv.length > 0) {
                residence = true;
            } else if (user?.residence?.postalCode.length > 0) {
                residence = true;
            } else if (user?.residence?.latitude?.length > 0) {
                residence = true;
            } else if (user?.residence?.longitude?.length > 0) {
                residence = true;
            }
            let residenceId = '';
            if (residence === true) {
                const resDef = {
                    street: user?.residence?.street || '',
                    city: user?.residence?.city || '',
                    stateProv: user?.residence?.stateProv || '',
                    postalCode: parseInt(user?.residence?.postalCode) || null,
                };
                printObject('APCLC:25==>resDef:\n', resDef);

                const resResults = await API.graphql({
                    query: mutations.createResidence,
                    variables: { input: resDef },
                });
                console.log('APCLC:48-->resResults:\n', resResults);
                residenceId = resResults.data.createResidence.id;
                //      STALL 1 second to prevent throttling
                await stall(1000);
            }
            //      createUser
            const userDef = {
                sub: user.uid,
                username: user?.username || '',
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                residenceResidentsId: residenceId,
                divisionDefaultUsersId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            };
            printObject('APCLC:62==>userDef:\n', userDef);
            const userResults = await API.graphql({
                query: mutations.createUser,
                variables: { input: userDef },
            });
            console.log('APCLC:68-->userResults:\n', userResults);
            const userRefId = userResults.data.createUser.id;
            //      STALL 1 second to prevent throttling
            await stall(3000);
            //      createAffiliation
            const affDef = {
                role: user?.role || 'guest',
                status: 'active',
                userAffiliationsId: userRefId,
                divisionAffiliationsId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            };
            printObject('APCLC:77==>affDef:\n', affDef);
            const affResults = await API.graphql({
                query: mutations.createAffiliation,
                variables: { input: affDef },
            });
            console.log('APCLC:83-->affResults:\n', affResults);
        } catch (error) {
            console.log('APCLC:85-->error:', error);
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
