import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import StateRallyList from './stateLead-rally.component';
import StateRepRally from './stateRep-rally.component';
import Spinner from '../../components/spinner/Spinner';
import { printObject } from '../../utils/helpers';
import './serve.styles.scss';
const StateLead = ({
    currentUser,
    rallies,
    doneRallies,
    setSpinner,
    clearSpinner,
    pateSystem,
}) => {
    // const [leadRallies, setLeadRallies] = useState([]);
    const [doneEvents, setDoneEvents] = useState([]);
    const [activeEvents, setActiveEvents] = useState([]);
    const processEvents = async () => {
        // this gets the state lead info ready to display
        let dEvents = [];
        let aEvents = [];
        async function splitEvents() {
            if (rallies) {
                rallies.forEach((evnt) => {
                    var today = new Date().toISOString().slice(0, 10); // get current date in yyyy-mm-dd format
                    if (evnt.eventDate < today) {
                        if (evnt.eventDate === '1900-01-01') {
                            aEvents.push(evnt);
                        } else {
                            dEvents.push(evnt);
                        }
                    } else {
                        aEvents.push(evnt);
                    }
                });
            }
        }

        async function sortEvents() {
            dEvents.sort(function (a, b) {
                return new Date(b.eventDate) - new Date(a.eventDate);
            });
            setDoneEvents(dEvents);
            aEvents.sort(function (a, b) {
                return new Date(a.eventDate) - new Date(b.eventDate);
            });
            setActiveEvents(aEvents);
        }
        splitEvents();
        sortEvents();
    };
    useEffect(() => {
        setSpinner();
        processEvents();

        clearSpinner();
    }, [rallies]);

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <div className='serve-component__event-list-header'>
                State Events
            </div>
            <div className='serve-component__message-box'>
                These are the events within your state that you can view and
                manage, support and change.
            </div>
            <div>activeEvents: {activeEvents.length}</div>
            <div className='serve-component-lead__list-wrapper'>
                {activeEvents ? (
                    <>
                        {activeEvents.length > 0 ? (
                            <div className='serve-component__section-label'>
                                Upcoming Events
                            </div>
                        ) : null}
                        {activeEvents.map((rally) => (
                            <StateRepRally key={rally.uid} rally={rally} />
                        ))}
                    </>
                ) : null}
            </div>
            <div className='serve-component-lead__list-wrapper'>
                {doneEvents ? (
                    <>
                        {doneEvents.length > 0 ? (
                            <div className='serve-component__section-label'>
                                Past Events
                            </div>
                        ) : null}
                        {doneEvents.map((rally) => (
                            <StateRepRally key={rally.uid} rally={rally} />
                        ))}
                    </>
                ) : null}
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    rallies: state.pate.rallies,
    doneRallies: state.stateLead.doneRally,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(StateLead);
