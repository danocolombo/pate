import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './event.styles.scss';
import EventDetails from '../../components/event-details/event-component';
import Header from '../../components/header/header.component';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
//class Events extends React.Component {
const Events = ({
    currentUser,
    match,
    setSpinner,
    clearSpinner,
    pateSystem,
    registrations,
}) => {
    const [plan, setplan] = useState([]);

    useEffect(() => {
        const id = match.params.id;

        async function fetchEvent() {
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
        fetchEvent();
    }, []);

    //something like this to check registrations if ths one...
    // posts: state.posts.map(post =>
    //     post._id === payload.id ? { ...post, likes: payload.likes } : post
    //   ),

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
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
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    registrations: state.registrations.confirmed,
    pateSystem: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Events);

//export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
