import { get } from 'http';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';

const RegisteredUsers = ({ currentUser }) => {
    const [p8Users, setP8Users] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    // const [registeredUser, setRegisteredUser] = useState([]);
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
                        preLoadUsers(data?.body?.Users);
                        // pateUsers = data?.body?.Users;
                        
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
    const preLoadUsers = (cogUsers) => {
        cogUsers.forEach(user => {
            setP8Users(p8Users => [...p8Users, user]);
        })
        console.log('stored users: ' + p8Users.length);
    }
    return loadingUsers ? (
        <Spinner />
    ) : (
        <>
        {/*
            <div className='serveevent-page__header'>REGISTERED USERS</div>
            <div className='serveevent-page__data-input-box'>
                <div className='serveevent-page__section-header'>Location</div>
                <div className='serveevent-page__grid-line'></div>
            </div>
        */}
            <div><h2>Registered Users</h2></div>
            <button onClick={getRegisteredUsers}>Get Users</button>
            <div>Here are the users<br/>
                WE HAVE {p8Users.length} USERS!!
                {   console.log('# of users: ' + p8Users.length)}
                {p8Users.map(user => {
                    <div>{user.userName}</div>
                })}
                {(p8Users.length>0)?(
                    p8Users.forEach(p8User => {
                        <>
                            <div>{p8User.userName}</div>
                        </>
                    })  
                ):null}
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
