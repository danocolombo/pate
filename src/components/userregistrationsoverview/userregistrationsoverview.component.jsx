import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IoTrash } from 'react-icons/io5';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';

import StyledLink from '../../components/custom-link/custom-link-white.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { removeRegistration } from '../../redux/registrations/registrations.actions';
import { removeRegistrationFromCurrentUser } from '../../redux/user/user.actions';
import EventListDate from '../ui/dates/serve-date.component';
import '@fortawesome/fontawesome-free/css/all.css';
import './userregistrationsoverview.styles.scss';
import { printObject } from '../../utils/helpers';
import { deleteRegistrationProvider } from '../../providers/registrations.provider';
const UserRegistrationOverview = ({
    currentUser,
    registrations,
    removeRegistrationFromCurrentUser,
    setSpinner,
    clearSpinner,
    removeRegistration,
}) => {
    const history = useHistory();
    if (!currentUser?.isLoggedIn) {
        history.push('/');
    }
    const [rallies, setRallies] = useState([]);

    const handleCancellation = async (reg) => {
        // if (!regId) {
        //     console.log('UROC:37==> deleteRegistration requires regId');
        //     return;
        // }
        // // const theReg = currentUser.registrations.items.filter(
        // //     (r) => r.id === regId
        // // );
        const deleteResults = await deleteRegistrationProvider(reg.id);
        if (deleteResults.statusCode === 200) {
            //      4. remove from rallies array

            async function purgeRally() {
                const newRallyArray = rallies.filter(
                    (item) => item.id !== reg.id
                );

                printObject('testArray:\n', newRallyArray);
                setRallies(newRallyArray);
            }
            purgeRally();
            //      4. remove REDUX currentUser.regisrations array
            removeRegistrationFromCurrentUser(reg.id);
            //      5. remove REDUX registrations?.confirmed array (if there)
        }
    };
    useEffect(() => {
        // load the redux values into useState array
        async function getLatestProfile() {
            const variables = {
                id: currentUser.sub,
            };
            try {
                const gqlProfile = await API.graphql(
                    graphqlOperation(queries.getProfileBySub, variables)
                );
                if (
                    gqlProfile?.data?.listUsers?.items[0]?.registrations?.items
                        .length > 0
                ) {
                    // only load them if attendeeId === currentUserId
                    let userRallies = [];
                    gqlProfile?.data?.listUsers?.items[0]?.registrations?.items.forEach(
                        (reg) => {
                            if (reg.attendeeId === currentUser.id) {
                                userRallies.push(reg);
                            }
                        }
                    );
                    setRallies(userRallies);
                }
            } catch (error) {
                printObject('SP:218-->error gettng graphql data');
            }
        }
        getLatestProfile();
        //*===========================================
        // some users can register others for events,
        // so only display registrations when the user
        // is the attendee.
        //*============================================
        const filterRallies = async () => {
            let userRallies = [];
            if (currentUser?.registrations?.items.length > 0) {
                currentUser?.registrations?.items.forEach((reg) => {
                    if (reg.attendeeId === currentUser.id) {
                        userRallies.push(reg);
                    }
                });
            }
            setRallies(userRallies);
        };
        filterRallies();
    }, []);
    return (
        <>
            {rallies.length > 0 && (
                <div className='user-reg-overview__wrapper'>
                    <div className='user-reg-overview__section-header'>
                        YOUR REGISTRATIONS
                        {rallies.length}
                    </div>
                    {/* currentUser.registrations.items */}
                    {rallies.map(
                        (reg) =>
                            reg.id && (
                                <div key={reg.id}>
                                    <div className='user-reg-flex__event-wrapper'>
                                        <StyledLink
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                            }}
                                            to={`/editregistration/${reg.id}`}
                                        >
                                            <EventListDate
                                                date={reg.event.eventDate}
                                            />
                                        </StyledLink>
                                        <div className='user-reg-flex__location'>
                                            {reg?.event?.name}
                                            <br />
                                            {reg?.event?.location?.city},{' '}
                                            {reg?.event.location.stateProv}
                                        </div>

                                        {reg.registrar?.id !==
                                        currentUser?.id ? (
                                            <div className='user-reg-flex__location'>
                                                ({reg.registrar?.firstName})
                                            </div>
                                        ) : null}

                                        <div className='user-reg-flex__cancel'>
                                            <Link
                                                onClick={() => {
                                                    handleCancellation(reg);
                                                }}
                                                to='#'
                                            >
                                                <i
                                                    className='fas fa-trash-alt'
                                                    style={{
                                                        fontSize: '24px',
                                                        color: 'red',
                                                        marginRight: '5px',
                                                    }}
                                                ></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            )}
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    removeRegistrationFromCurrentUser: (registration) =>
        dispatch(removeRegistrationFromCurrentUser(registration)),
    removeRegistration: (registration) =>
        dispatch(removeRegistration(registration)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    registrations: state.registrations.confirmed,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegistrationOverview);
