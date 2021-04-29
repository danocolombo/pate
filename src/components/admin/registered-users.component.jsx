import { get } from 'http';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import RegisteredUserList from './registered-user-list.component';
import {
    setSpinner,
    clearSpinner,
    loadRally,
} from '../../redux/pate/pate.actions';
import './registered-users.style.scss';
const RegisteredUsers = ({ currentUser }) => {
    const [p8Users, setP8Users] = useState([]);
    const [p8Profiles, setP8Profiles] = useState([]);

    const [loadingUsers, setLoadingUsers] = useState(true);
    // const [registeredUser, setRegisteredUser] = useState([]);
    useEffect(() => {
        prepUsers();
        // setLoadingUsers(false);
    }, []);
    const prepUsers = async () => {
        let rUsers = {};
        let rProfiles = {};

        rUsers = await getRegisteredUsers();
        rProfiles = await getProfiles();

        rUsers = await mergeInfo(rUsers, rProfiles);
    };
    const getRegisteredUsers = async () => {
        //-----------------------------------------------------
        // going to make a call to get the cognito user pool,
        // into an array of users.
        //-----------------------------------------------------
        setSpinner();
        let theResponse = {};
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
                        theResponse = data?.body?.Users;
                        preLoadUsers(data?.body?.Users);
                    });
            }
            getUsers();
        } catch (error) {
            console.log('Error fetching registrations \n' + error);
        }

        clearSpinner();
        return theResponse;
    };
    const preLoadUsers = (cogUsers) => {
        cogUsers.forEach((user) => {
            let thisUser = {};
            //need to parse data into desired format
            //--------------------------------------
            thisUser.login = user.Username;
            thisUser.status = user.UserStatus;
            //--------------------------------------
            // loop through attributes
            //--------------------------------------
            user.Attributes.forEach((a) => {
                switch (a.Name) {
                    case 'sub':
                        thisUser.uid = a.Value;
                        break;
                    case 'email_verified':
                        thisUser.emailVerified = a.Value;
                        break;
                    case 'email':
                        thisUser.email = a.Value;
                        break;
                    default:
                        break;
                }
            });
            setP8Users((p8Users) => [...p8Users, thisUser]);
        });
        console.log('stored users: ' + p8Users.length);
    };
    const getProfiles = async () => {
        //-----------------------------------------------------
        // going to make a call to get the profiles from ddb,
        // into an array of profiles.
        //-----------------------------------------------------
        setSpinner();
        let theResponse = {};
        //build the request....
        try {
            async function getStoredProfiles() {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getAllUsers',
                            payload: {
                                uid: currentUser.uid,
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
                            'dynamodb-profiles:\n' +
                                util.inspect(data.body, {
                                    showHidden: false,
                                    depth: null,
                                })
                        );
                        theResponse = data?.body?.Items;
                        preLoadProfiles(data?.body?.Items);
                        // pateUsers = data?.body?.Users;

                        // theRegistration = data?.body?.Items[0];
                        // if (theRegistration) {
                        //     clearRegistration();
                        //     loadRegistration(theRegistration);
                        // }
                    });
            }
            getStoredProfiles();
        } catch (error) {
            console.log('Error fetching registrations \n' + error);
        }

        clearSpinner();
        return theResponse;
    };
    const preLoadProfiles = async (ddbProfiles) => {
        ddbProfiles.forEach((profile) => {
            setP8Profiles((p8Profiles) => [...p8Profiles, profile]);
        });
        console.log('stored profiles: ' + p8Profiles.length);
    };
    const mergeInfo = (users, profiles) => {
        /*
        export const updateItemInRallyList = (rally, rallyToUpdate) => {
            //this function will update the specified rally, if it exists
            let updatedRallies = [];
            rally.map((r) => {
                if (r.uid === rallyToUpdate){
                    updatedRallies.push(rallyToUpdate);
                }else{
                    updatedRallies.push(r);
                }
            })
            rally = JSON.parse(JSON.stringify(updatedRallies));
            return rally;
        };


        */
        let updatedUsers = [];
        try {
            //step through the p8User array updating as appropriate
            for (let i = 0; i < p8Users.length; i++) {
                let tempUser = {};
                //save user values to tempUser
                tempUser.uid = p8Users[i].uid;
                tempUser.login = p8Users[i].login;
                tempUser.email = p8Users[i].email;
                tempUser.emailVerified = p8Users[i].emailVerified;
                tempUser.status = p8Users[i].status;
                // check if there is profile
                console.log('looking for ' + p8Users[i].uid);
                //let hit = p8Profiles.find((p) => p.uid === p8Users[i].uid);
                //loop through the profiles and update if data exists...
                for (let pi = 0; pi < p8Profiles.length; pi++) {
                    console.print(p8Users[i].uid + ' Vs ' + p8Profiles[pi]);
                    if (p8Users[i].uid === p8Profiles[pi].uid) {
                        tempUser.firstName = p8Profiles[pi].firstName;
                        tempUser.lastName = p8Profiles[pi].lastName;
                        tempUser.phone = p8Profiles[pi].phone;
                        tempUser.street = p8Profiles[pi].street;
                        tempUser.city = p8Profiles[pi].city;
                        tempUser.stateProv = p8Profiles[pi].stateProv;
                        tempUser.postalCode = p8Profiles[pi].postalCode;
                        tempUser.churchName = p8Profiles[pi].churchName;
                        tempUser.churchCity = p8Profiles[pi].churchCity;
                        tempUser.churchState = p8Profiles[pi].churchState;
                        pi = p8Profiles.length;
                    }
                }
                updatedUsers.push(tempUser);
            }
        } catch (error) {
            console.log('try failure in mergeInfo()');
        }
        const util = require('util');
        console.log(
            'updatedUsers:\n' +
                util.inspect(updatedUsers, {
                    showHidden: false,
                    depth: null,
                })
        );
        setP8Users(updatedUsers);
        setLoadingUsers(false);
        //
        return null;
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
                    {p8Users.map((p8User) => (
                        <div className='admin-component__row-center'>
                            <RegisteredUserList
                                user={p8User}
                                key={p8User.uid}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
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
