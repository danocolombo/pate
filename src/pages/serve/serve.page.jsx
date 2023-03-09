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

        // if L, grab state rallies
        if (currentUser.role === 'lead') {
            //    only get rallies for state
            getLeadRallies().then(() =>
                console.log('done getting lead rallies')
            );
        } else if (
            currentUser.role === 'director' ||
            currentUser.role === 'guru'
        ) {
            getDivisionRallies().then(() => {
                console.log('done getting division rallies');
            });
        }
        // if (
        //     currentUser.role === 'lead' ||
        //     currentUser.role === 'director' ||
        //     currentUser.role === 'guru'
        // ) {
        //     async function leads() {
        //         getLeadRallies();
        //     }
        //     leads();
        // }
    }, []);

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

                    let leadRallies =
                        allRallyResponse?.data.getDivision?.events.items.filter(
                            (evnt) =>
                                (evnt.location.stateProv =
                                    currentUser.residence.stateProv)
                        );

                    async function sortRallies() {
                        leadRallies.sort(function (a, b) {
                            return (
                                new Date(b.eventDate) - new Date(a.eventDate)
                            );
                        });
                    }
                    sortRallies();
                    setPateRallies(leadRallies);
                }
            })
            .catch((error) => {
                printObject(
                    'SP:157--> error getting lead rallies from graphql',
                    error
                );
            });
    };
    const getDivisionRallies = async () => {
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

                    let divisionRallies =
                        allRallyResponse?.data.getDivision?.events.items;

                    async function sortRallies() {
                        divisionRallies.sort(function (a, b) {
                            return (
                                new Date(b.eventDate) - new Date(a.eventDate)
                            );
                        });
                    }
                    sortRallies();
                    setPateRallies(divisionRallies);
                }
            })
            .catch((error) => {
                printObject(
                    'SP:157--> error getting lead rallies from graphql',
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
