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
import Registrar from '../../components/registrar/registrar2.component';
import { printObject } from '../../utils/helpers';
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
    const registrationId = match.params.id;
    const [theRegistration, setTheRegistration] = useState({});

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
    }, []);
    // printObject('ERP:60-->theRegistration', theRegistration);
    return (
        <>
            <Header />
            <div style={{ marginTop: '10px' }}>
                {theRegistration?.id ? (
                    <>
                        <Registrar registration={theRegistration} />
                    </>
                ) : null}
            </div>
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
