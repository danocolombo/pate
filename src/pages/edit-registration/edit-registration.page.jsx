import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import {
    clearRegistration,
    loadRegistration,
} from '../../redux/pate/pate.actions';
import './edit-registration.styles.scss';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import EventInfo from '../../components/event-info/event-info.component';
import Registrar from '../../components/registrar/registrar.component';

const UserProfile = ({
    currentUser,
    pate,
    registrations,
    match,
    loadRegistration,
    clearRegistration,
}) => {
    const history = useHistory();
    let theRegistration = {};
    const registrationReference = match.params.rid;

    const regInfo = registrations.tempRegistration;
    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            history.push('/');
        }
        getRegistrationForUser();
    }, []);

    const getRegistrationForUser = async () => {
        try {
            async function clearIt() {
                clearRegistration();
            }
            clearIt();
            async function getIt() {
                fetch(
                    'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            operation: 'getRegistration',
                            payload: {
                                uid: registrationReference,
                            },
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // const util = require("util");
                        // console.log(
                        //   "registrations-data:\n" +
                        //     util.inspect(data.body, {
                        //       showHidden: false,
                        //       depth: null,
                        //     })
                        // );
                        theRegistration = data?.body?.Items[0];
                        if (theRegistration) {
                            clearRegistration();
                            loadRegistration(theRegistration);
                        }
                    });
            }
            getIt();
        } catch (error) {
            console.log('Error fetching registrations \n' + error);
        }
    };

    return (
        <>
            <Header />
            <EventInfo eventInfo={pate.rally} />
            {pate?.registration ? (
                <>
                    <Registrar regData={pate.registration} />
                </>
            ) : null}
            <MainFooter />
        </>
    );
    // }
};
const mapDispatchToProps = (dispatch) => ({
    loadRegistration: (reg) => dispatch(loadRegistration(reg)),
    clearRegistration: () => dispatch(clearRegistration()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pate: state.pate,
    registrations: state.registrations,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserProfile);
