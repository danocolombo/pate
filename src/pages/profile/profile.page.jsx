import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './profile.styles.scss';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Profile2 from '../../components/profile/profile.component2';
import PersonalProfile from '../../components/profile/profile.component';
import UserRegistrationOverview from '../../components/userregistrationsoverview/userregistrationsoverview.component';
import { loadRegistrations } from '../../redux/registrations/registrations.actions';
const UserProfile = ({
    currentUser,
    pateSystem,
    loadRegistrations,
    setSpinner,
    clearSpinner,
}) => {
    const history = useHistory();
    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            history.push('/');
        }
        getRegistrations();
    }, []);
    //=======================================
    // get the latest registration updates
    //=======================================
    const getRegistrations = async () => {
        setSpinner();
        async function getUserReg() {
            try {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getAllUserRegistrations',
                            payload: {
                                rid: currentUser?.uid,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        loadRegistrations(data.body);
                        clearSpinner();
                    });
            } catch (error) {
                clearSpinner();
                console.log('Error fetching registrations \n' + error);
            }
        }
        await getUserReg();
    };
    // render() {
    return (
        <>
            <Header />

            <div className='profilepagewrapper'>
                {/*<div className='pageheader'>PERSONAL PROFILE</div>*/}
                <Profile2 />
                {/*<PersonalProfile />*/}
                {/*<div className='profile-page__'>YOUR REGISTRATIONS</div>*/}

                <UserRegistrationOverview />
            </div>
            <MainFooter />
        </>
    );
    // }
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadRegistrations: (registrations) =>
        dispatch(loadRegistrations(registrations)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pateSystem: state.pate,
});
export default compose(
    withAuthenticator,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserProfile);
