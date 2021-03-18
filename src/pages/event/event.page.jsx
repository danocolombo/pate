import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './event.styles.scss';
import EventDetails from '../../components/event-details/event-component';
import Header from '../../components/header/header.component';
import { loadRegistrations } from '../../redux/registrations/registrations.actions';
//class Events extends React.Component {
const Events = ({ currentUser, match, loadRegistrations }) => {
    const [plan, setplan] = useState([]);

    useEffect(() => {
        const id = match.params.id;
        async function fetchEvents() {
            fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'getEvent',
                        payload: {
                            uid: id,
                        },
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    // this.setState({ plan: data });
                    setplan(data);
                });
        }
        //now load the user registrations into redux
        let userRegInfo = {};

        async function getUserReg() {
            if (currentUser?.isLoggedIn) {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getAllUserRegistrations',
                            payload: {
                                rid: currentUser.uid,
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
                            'data.body: \n' +
                                util.inspect(data.body, {
                                    showHidden: false,
                                    depth: null,
                                })
                        );
                        //loadRegistrations(data.body?.Items);
                        loadRegistrations(data.body);
                    });
            }
        }
        async function groupCalls() {
            fetchEvents();
            getUserReg();
        }
        groupCalls();

        return () => {
            //cleanup
        };
    }, []);

    return (
        <>
            <Header />
            <div className='eventwrapper'>
                <EventDetails theEvent={plan} />
                <div>
                    <Link to={`/registration/${plan?.body?.Items[0]?.uid}`}>
                        <button className='registerbutton'>REGISTER NOW</button>
                    </Link>
                </div>
            </div>
            ;
        </>
    );
};
Events.propTypes = {
    loadRegistrations: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default compose(
    withRouter,
    connect(mapStateToProps, { loadRegistrations })
)(Events);
