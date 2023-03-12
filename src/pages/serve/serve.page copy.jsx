import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import StateRep from '../../components/serve/stateRep.component';
import StateLead from '../../components/serve/stateLead.component';
// import { loadRegistrations } from '../../redux/registrations/registrations.actions';
import {
    loadRallies,
    loadDoneRallies,
} from '../../redux/stateRep/stateRep.actions';
import {
    loadLeadRallies,
    loadLeadDoneRallies,
} from '../../redux/stateLead/stateLead.actions';
import { setPateRallies } from '../../redux/pate/pate.actions';
import { printObject } from '../../utils/helpers';
import './serve.styles.scss';
const Serve = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    loadRallies,
    loadDoneRallies,
    loadLeadRallies,
    loadLeadDoneRallies,
    setPateRallies,
}) => {
    const history = useHistory();

    useEffect(() => {
        if (!currentUser?.authSession?.idToken?.jwtToken) history.push('/');
        //get the usersRallies
        //todo-gql
        async function reps() {
            // this loads rep rallies, but they are also in REDUX
            // currentUser.Events.
            getRepRallies();
        }
        //reps();

        if (
            currentUser.role === 'lead' ||
            currentUser.role === 'director' ||
            currentUser.role === 'guru'
        ) {
            async function leads() {
                getLeadRallies();
            }
            leads();
        }
    }, []);

    useEffect(() => {
        async function getDivisionEvents() {
            const variables = {
                divId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            };
            API.graphql(
                graphqlOperation(queries.getAllDivisionEvents, variables)
            )
                .then((divisionEvents) => {
                    if (
                        divisionEvents?.data?.getDivision?.events.items.length >
                        0
                    ) {
                        // printObject(
                        //   "SP:68-->allDivisionEvents: ",
                        //   divisionEvents?.data?.getDivision?.events.items
                        // );
                        // console.log("SET_PATE_RALLIES");
                        setPateRallies(
                            divisionEvents.data.getDivision.events.items
                        );
                    } else {
                        console.log('SP:74--> NO EVENTS TO DISPLAY');
                    }
                })
                .catch((error) => {
                    printObject(
                        'SP:79--> error getting all division events from graphql',
                        error
                    );
                });
        }
        //getDivisionEvents();
    }, []);
    useEffect(() => {}, [pateSystem.showSpinner]);
    const getRepRallies = async () => {
        // =======================
        // get all Events for current division for user.
        //0ebefcdf-9fd2-4702-a1e7-76bcf90d9b68 = currentUser.id
        const variables = {
            divisionId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            coordinatorId: currentUser.id,
        };
        API.graphql(graphqlOperation(queries.getRepRallies, variables))
            .then((repRallies) => {
                if (
                    repRallies?.data?.listDivisions?.items[0].events.items
                        .length > 0
                ) {
                    // printObject(
                    //   "SP:103-->repRallies: ",
                    //   repRallies?.data?.listDivisions?.items[0].events.items
                    // );
                    async function sortThem(a, b) {
                        return b.eventDate - a.eventDate;
                    }
                    let unsortedRallies =
                        repRallies?.data?.listDivisions?.items[0].events.items;
                    let sortedRallies = unsortedRallies.sort(sortThem);

                    loadRallies(sortedRallies);
                } else {
                    console.log('SP:107--> NO EVENTS TO DISPLAY');
                }
            })
            .catch((error) => {
                printObject(
                    'SP:112--> error getting rep rallies from graphql',
                    error
                );
            });
    };
    const getLeadRallies = async () => {
        // =======================
        // get all Events for current division, then filter by stateProv
        // resulting in only the rallies for rally.location.stateProv === currentUser.residence.stateProv
        //0ebefcdf-9fd2-4702-a1e7-76bcf90d9b68 = currentUser.id
        const variables = {
            id: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
        };
        API.graphql(graphqlOperation(queries.getAllDivisionEvents2, variables))
            .then((allRallyResponse) => {
                if (
                    allRallyResponse?.data?.getDivision?.events.items.length > 0
                ) {
                    // separate done and active
                    let leadDoneRallyArray = [];
                    let leadActiveRallyArray = [];
                    let today = new Date();
                    let todayString = today.toISOString().substring(0, 10);
                    let allRallies =
                        allRallyResponse?.data?.getDivision?.events.items;
                    // SORT RALLIES BY eventData and then stateProv
                    allRallies.sort(function (a, b) {
                        let dateA = new Date(a.eventDate);
                        let dateB = new Date(b.eventDate);
                        let result = dateB - dateA;
                        if (result === 0) {
                            result = a.location.stateProv.localeCompare(
                                b.location.stateProv
                            );
                        }
                        return result;
                    });
                    // save all the rallies to pateSystem.rallies
                    setPateRallies(allRallies);
                    allRallies.forEach((r) => {
                        if (
                            r.location.stateProv ===
                            currentUser.residence.stateProv
                        ) {
                            if (r.eventDate < todayString) {
                                leadDoneRallyArray.push(r);
                            } else {
                                leadActiveRallyArray.push(r);
                            }
                        }
                    });
                    if (leadDoneRallyArray.length > 0) {
                        loadLeadDoneRallies(leadDoneRallyArray);
                    }
                    if (leadActiveRallyArray.length > 0) {
                        loadLeadRallies(leadActiveRallyArray);
                    }
                } else {
                    console.log('SP:107--> NO EVENTS TO DISPLAY');
                }
            })
            .catch((error) => {
                printObject(
                    'SP:112--> error getting rep rallies from graphql',
                    error
                );
            });
    };
    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />

            <div className='serve-page__wrapper'>
                <div className='serve-page_serve-box'>
                    <div className='serve-page__header'>
                        Principle 8 Service
                    </div>
                    <div className='serve-page__details-wrapper'>
                        <div className='serve-page__message-box'>
                            This page allows you to coordinate events, as well
                            as manage and review details.
                        </div>
                        <StateRep />

                        {currentUser?.role === 'lead' ||
                        currentUser?.role === 'director' ||
                        currentUser?.role === 'guru' ? (
                            <>
                                <StateLead />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    loadRallies: (rallies) => dispatch(loadRallies(rallies)),
    loadDoneRallies: (rallies) => dispatch(loadDoneRallies(rallies)),
    loadLeadRallies: (srallies) => dispatch(loadLeadRallies(srallies)),
    loadLeadDoneRallies: (srallies) => dispatch(loadLeadDoneRallies(srallies)),
    setPateRallies: (allRallies) => dispatch(setPateRallies(allRallies)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Serve);
