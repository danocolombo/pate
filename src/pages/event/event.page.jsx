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
import { loadRegistrations } from '../../redux/registrations/registrations.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
//class Events extends React.Component {
const Events = ({ currentUser, match, loadRegistrations, setSpinner, clearSpinner,pateSystem, registrations }) => {
    const [plan, setplan] = useState([]);
    const [registered, setRegistered] = useState(false);
    const { currentRegistrations } = registrations;
    
    const DEBUG = false;
    if(DEBUG){
    let userRegs = registrations.Items;
    console.log('REGISTRATIONS: ' + userRegs.length);
    let regConfirmed = false;
    userRegs.forEach(r => {
        console.log('eid:' + r.eid);
        if(r.eid === match.params.id){
            regConfirmed = true;
        }
    });
    console.log('***** registered: ' + regConfirmed + '*****');
    const util = require('util');
    
    console.log('currentRegistrations: \n-=-=-=-=-=-=-=-=-=-=\n' + util.inspect(currentRegistrations, { showHidden: false, depth: null }));
    console.log('-=-=-=-=-=-=-=-=-=-=');
    // currentRegistrations.Items.map((evnt) => (
    //     console.log('event.ui: ' + evnt),
    // ));
    // currentRegistrations.Items.map((evnt) => (
    //     evnt.uid from {person.country}
    // ))
}
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
                        console.log('registrations-data:\n' + util.inspect(data.body, { showHidden: false, depth: null }));
                        loadRegistrations(data.body);
                    });
            }
        }
        async function groupCalls() {
            fetchEvents();
            getUserReg();
            
        }
        groupCalls();

        // return () => {
        //     //cleanup
        // };
        
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
Events.propTypes = {
    loadRegistrations: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    registrations: state.registrations.currentRegistrations,
    pateSystem: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps, { loadRegistrations, mapDispatchToProps })
)(Events);

//export default connect(mapStateToProps, mapDispatchToProps)(SignIn);