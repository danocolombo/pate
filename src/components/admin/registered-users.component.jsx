import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';

const RegisteredUsers = ({ currentUser }) => {
    const [loadingUsers, setLoadingUsers] = useState(true);
    useEffect(() => {
        getRegisteredUsers();
    }, []);
    const getRegisteredUsers = () => {
        //-----------------------------------------------------
        // going to make a call to get the cognito user pool,
        // into an array of users.
        //-----------------------------------------------------
        setSpinner();
        let pateUsers = [];
        //build the request....
        try {
            async function getUsers() {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/admin',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getUsers',
                            payload: {
                                uniqueKey: currentUser.uid,
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
                            'cognito-pool-users:\n' +
                                util.inspect(data.body, {
                                    showHidden: false,
                                    depth: null,
                                })
                        );
                        // theRegistration = data?.body?.Items[0];
                        // if (theRegistration) {
                        //     clearRegistration();
                        //     loadRegistration(theRegistration);
                        // }
                    });
            }
            getUsers();
            //load information into object to display for Event-Details
        } catch (error) {
            console.log('Error fetching registrations \n' + error);
        }
        clearSpinner();
        setLoadingUsers(false);
    };
    return loadingUsers ? (
        <Spinner />
    ) : (
        <>
            <div className='serveevent-page__header'>REGISTERED USERS</div>
            <div className='serveevent-page__data-input-box'>
                <div className='serveevent-page__section-header'>Location</div>
                <div className='serveevent-page__grid-line'></div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, {
    setSpinner,
    clearSpinner,
    mapDispatchToProps,
})(RegisteredUsers);
