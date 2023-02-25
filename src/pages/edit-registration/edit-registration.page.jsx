import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import {
    clearRegistration,
    loadRegistration,
    loadRally,
} from '../../redux/pate/pate.actions';
import './edit-registration.styles.scss';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import { setPateRallies } from '../../redux/pate/pate.actions';
import EventInfo from '../../components/event-info/event-info.component';
import EventDetails from '../../components/event-details/event-component2';
// import Registrar from '../../components/registrar/registrar.component';
import Registrar from '../../components/registrar/registrar2.component';
import { printObject } from '../../utils/helpers';
import { getGQLProfile, getDDBProfile } from '../../providers/profile.provider';
const UserProfile = ({
    currentUser,
    pate,
    registrations,
    match,
    setPateRallies,
    loadRegistration,
    clearRegistration,
    loadRally,
}) => {
    const history = useHistory();
    //const registrationReference = match.params.rid;
    const registrationId = match.params.id;
    //const rallyReference = match.params.eid;
    const [allTheRallies, setAllTheRallies] = useState([]);
    const [theRegistration, setTheRegistration] = useState({});
    const [theRally, setTheRally] = useState({});

    //const regInfo = registrations.tempRegistration;
    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            history.push('/');
        }
        async function getRegistrationDetails() {
            const variables = {
                id: registrationId,
            };
            try {
                const registrationResults = await API.graphql({
                    query: queries.getRegistration,
                    variables,
                });
                // printObject('RPP:286-->SUCCESS!!\nEventResults:\n', eventResults);
                if (registrationResults?.data?.getRegistration != null) {
                    setTheRegistration(
                        registrationResults.data.getRegistration
                    );
                }
            } catch (err) {
                printObject('ERP:61-->error getting registration:\n', err);
            }
        }
        getRegistrationDetails();

        // async function doIt() {
        //     const response = await loadAllDivisionRalliesToRedux();
        //     if (response.statusCode === 200) {
        //         getRegistrationForUser(response.data);
        //     }
        // }
        // doIt();
        // console.log('done');
        //getRallyForRegistration();
    }, []);
    // const loadAllDivisionRalliesToRedux = async () => {
    //     //      get all the rallies loaded
    //     const variables = {
    //         id: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
    //     };
    //     let gqlResponse = await API.graphql(
    //         graphqlOperation(queries.getAllDivisionEvents2, variables)
    //     );
    //     if (gqlResponse?.data?.getDivision?.events?.items.length > 0) {
    //         let allRallies = gqlResponse?.data?.getDivision?.events.items;
    //         // SORT RALLIES BY eventData and then stateProv
    //         allRallies.sort(function (a, b) {
    //             let dateA = new Date(a.eventDate);
    //             let dateB = new Date(b.eventDate);
    //             let result = dateB - dateA;
    //             if (result === 0) {
    //                 result = a.location.stateProv.localeCompare(
    //                     b.location.stateProv
    //                 );
    //             }
    //             return result;
    //         });
    //         // save all the rallies to pateSystem.rallies
    //         setPateRallies(allRallies);
    //         return { statusCode: 200, data: allRallies };
    //     } else {
    //         return { statusCode: 400, data: 'No Events to Display' };
    //     }
    // };
    // const getRegistrationForUser = async (allTheEvents) => {
    //     try {
    //         async function getIt() {
    //             async function clearIt() {
    //                 clearRegistration();
    //             }
    //             clearIt();
    //             const theReg = currentUser?.registrations?.items.find(
    //                 (r) => r.id === registrationId
    //             );
    //             loadRegistration(theReg);
    //             setTheRegistration(theReg);
    //             //get event....
    //             let theRallyId = theReg?.event?.id;
    //             let theRally = allTheEvents.find((r) => r.id === theRallyId);

    //             loadRally(theRally);
    //             setTheRally(theRally);
    //         }
    //         getIt();
    //     } catch (error) {
    //         console.log('Error fetching registrations \n' + error);
    //     }
    // };
    // const getRallyForRegistration = async () => {
    //     // this takes the eid from the registration and loads the rally in
    //     // redux pate.rally

    //     try {
    //         async function fetchEvent() {
    //             //todo-gql  get event AGAIN!!!
    //             fetch(
    //                 'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
    //                 {
    //                     method: 'POST',
    //                     body: JSON.stringify({
    //                         operation: 'getEvent',
    //                         payload: {
    //                             uid: rallyReference,
    //                         },
    //                     }),
    //                     headers: {
    //                         'Content-type': 'application/json; charset=UTF-8',
    //                     },
    //                 }
    //             )
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     // this.setState({ plan: data });
    //                     loadRally(data?.body?.Items[0]);
    //                 });
    //         }
    //         fetchEvent();
    //     } catch (error) {
    //         console.log('Error fetching rally \n' + error);
    //     }
    // };
    return (
        <>
            <Header />
            {/*<EventInfo eventInfo={pate.rally} />*/}
            {/* {theRegistration ? (
                <EventDetails theRally={theRegistration} />
            ) : null} */}
            {theRegistration?.id ? (
                <>
                    <Registrar registration={theRegistration} />
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
    loadRally: (rally) => dispatch(loadRally(rally)),
    setPateRallies: (allRallies) => dispatch(setPateRallies(allRallies)),
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
