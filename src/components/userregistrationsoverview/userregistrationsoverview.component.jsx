import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StyledLink from '../../components/custom-link/custom-link-white.component';
import './userregistrationsoverview.styles.scss';
import { removeRegistration } from '../../redux/registrations/registrations.actions';
const UserRegistrationOverview = ({
    currentUser,
    registrations,
    removeRegistration,
}) => {
    // const util = require('util');
    // console.log(
    //     '&%&%&%&%&%___registrations___&%&%&%&%&%\n' +
    //         util.inspect(registrationInfo, { showHidden: false, depth: null })
    // );
    // const registrations = registrationInfo;

    // if (registrations) {
    //     registrations.forEach((r) => {});
    // }
    const dateToDisplay = (dt) => {
        const y = dt.substring(0, 4);
        const m = parseInt(dt.substring(4, 6));
        const d = dt.substring(6, 8);

        let smDate = m.toString() + '/' + d.toString();
        return smDate;
    };
    const handleCancellation = async (registration) => {
        //delete from database
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'deleteRegistration',
                    payload: {
                        Key: { uid: registration.uid },
                    },
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                const util = require('util');
                console.log(
                    'db data returned: \n' +
                        util.inspect(data, {
                            showHidden: false,
                            depth: null,
                        })
                );
            });
        //-------------------------
        // reduce event numbers.
        //-------------------------
        let eventUpdate = {
            uid: registration.eid,
            adjustments: {
                registrationCount: (registration.attendeeCount * -1),
            }
        }
        const mCount = parseInt(registration.mealCount,10) * -1;
        if(mCount != 0){
            eventUpdate.adjustments.mealCount = mCount;
        }
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'maintainNumbers',
                    payload: eventUpdate,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log('maintainEventNumbers successful');
            });
        
        //remove the redux reference to the event
        await removeRegistration(registration.uid);
        //??????
        // may need to reload stateRep & stateLead redux
        //??????
    };
    return (
        <>
            <div className='user-reg-overview__wrapper'>
                {registrations ? (
                    registrations.map(reg => (
                        <>
                            <div className='user-reg-overview__item'>
                                <div className='user-reg-overview__date'>
                                    <StyledLink
                                        style={{ textDecoration: 'none' }}
                                        to={`/editregistration/${reg.eid}/${reg.uid}`}
                                        >{dateToDisplay(reg.eventDate)}
                                    </StyledLink>
                                </div>
                                <div className='user-reg-overview__name'>{reg?.location.name}</div>
                                { (reg.registrar.firstName != currentUser.firstName) ?
                                    <span>({reg.registrar.firstName})</span>
                                :null}
                                <div className='user-reg-overview__city-state'>{reg?.location?.city}, {reg?.location?.stateProv}</div>
                                <div className='user-reg-overview__cancel-button'>
                                    <Link onClick={() => {
                                        handleCancellation(reg.uid);
                                    }}>X</Link>
                                </div>
                            </div>
                        </>
                    ))
                ):null}
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
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
