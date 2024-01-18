import React, { useState, useEffect } from 'react';
/*=============================================
    This file does the call to API to get the
    registered users
==============================================*/
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import RegisteredUserList from '../../components/admin/admin-registered-user-list.component';
import {
    setSpinner,
    clearSpinner,
    loadRegisteredUsers,
} from '../../redux/pate/pate.actions';
import './registered-users.style.scss';
import { printObject } from '../../utils/helpers';
const RegisteredUsers = ({
    currentUser,
    pate,
    setSpinner,
    clearSpinner,
    loadRegisteredUsers,
}) => {
    const [p8Users, setP8Users] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    // const [registeredUser, setRegisteredUser] = useState([]);

    useEffect(() => {
        prepUsers();
        // setLoadingUsers(false);
    }, []);
    const prepUsers = async () => {
        let rUsers = {};

        setSpinner();
        rUsers = await getRegisteredUsers();

        clearSpinner();
    };
    const getRegisteredUsers = async () => {
        try {
            let theUsersArray = [];
            try {
                printObject('RUP:43-->currentUser\n', currentUser);
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/admin',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getRegisteredUsers',
                            payload: {
                                uniqueKey: currentUser.sub,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('🚀 ~ .then ~ data:', data);
                        theUsersArray = data?.body?.Users;
                        console.log('RUP:61-->theUsersArray:\n', theUsersArray);
                        loadRegisteredUsers(theUsersArray);
                        setLoadingUsers(false);
                    });
            } catch (error) {
                console.log('Error fetching users \n' + error);
                console.err(error);
            }
            return theUsersArray;
        } catch (err) {
            console.log('getRegisteredUsers ERR');
            console.error(err);
            return null;
        }
    };

    return loadingUsers ? (
        <Spinner />
    ) : (
        <div className='admin-component__wrapper'>
            <div className='admin-component__options-box'>
                <div className='admin-component__page-title'>
                    Registered Users
                </div>
                <div className='admin-component__option-box'>
                    {pate.users
                        ? pate.users.map((user) => (
                              <div className='admin-component__row-center'>
                                  <RegisteredUserList
                                      user={user}
                                      key={user.uid}
                                  />
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRegisteredUsers: (users) => dispatch(loadRegisteredUsers(users)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pate: state.pate,
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisteredUsers);
