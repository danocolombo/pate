import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import StyledLink from '../../components/custom-link/custom-link-white.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { removeRegistration } from '../../redux/registrations/registrations.actions';

import './userregistrationsoverview.styles.scss';
const UserRegistrationOverview = ({
    currentUser,
    registrations,
    setSpinner,
    clearSpinner,
    removeRegistration,
}) => {
    const history = useHistory();
    if (!currentUser?.isLoggedIn) {
        history.push('/');
    }
    const dateToDisplay = (dt) => {
        const y = dt.substring(0, 4);
        const m = parseInt(dt.substring(4, 6));
        const d = dt.substring(6, 8);

        let smDate = m.toString() + '/' + d.toString();
        return smDate;
    };
    const handleCancellation = async (registration) => {
        //delete from database
        setSpinner();

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
                // const util = require('util');
                // console.log(
                //     'db data returned: \n' +
                //         util.inspect(data, {
                //             showHidden: false,
                //             depth: null,
                //         })
                // );
            });
        //-------------------------
        // reduce event numbers.
        //-------------------------
        let eventUpdate = {
            uid: registration.eid,
            adjustments: {
                registrationCount: registration.attendeeCount * -1,
            },
        };
        const mCount = parseInt(registration.mealCount, 10) * -1;
        if (mCount !== 0) {
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
        clearSpinner();
    };
    return (
        <>
            <div className='user-reg-overview__wrapper'>
                <div className='user-reg-overview__section-header'>
                    YOUR REGISTRATIONS
                </div>
                {registrations
                    ? registrations.map((reg) => (
                          <>
                              <div className='user-reg-flex__event-wrapper'>
                                  <div className='user-reg-flex__date'>
                                      <StyledLink
                                          style={{ textDecoration: 'none', color: 'blue' }}
                                          to={`/editregistration/${reg.eid}/${reg.uid}`}
                                      >
                                          {dateToDisplay(reg.eventDate)}
                                      </StyledLink>
                                  </div>

                                  <div className='user-reg-flex__location'>
                                      {reg?.location.name}
                                      <br />
                                      {reg?.location?.city},{' '}
                                      {reg?.location?.stateProv}
                                  </div>

                                  {reg.registrar?.firstName !==
                                  currentUser?.firstName ? (
                                      <div className='user-reg-flex__location'>
                                          ({reg.registrar?.firstName})
                                      </div>
                                  ) : null}

                                  <div className='user-reg-flex__cancel'>
                                      <Link
                                          onClick={() => {
                                              handleCancellation(reg);
                                          }}
                                      >
                                          X
                                      </Link>
                                  </div>
                              </div>
                          </>
                      ))
                    : null}
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
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
