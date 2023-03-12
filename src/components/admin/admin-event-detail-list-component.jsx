import React, { useEffect } from 'react';
/* -------------------------------
 this file is used to display the users as a list'
 ---------------------------------*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import './admin-registered-users.style.scss';
import { createNewGQLProfile } from '../../pateGraphql/pateGraphql.provider';
import { updateLegacyAsMigrated } from '../../providers/profile.provider';
import { printObject, createAWSUniqueID } from '../../utils/helpers';
const EventDetails = ({ rally }) => {
    const handleClick = async () => {
        printObject('AEDLC:16==>rally:\n', rally);
        let DANO = true;
        if (DANO) {
            return;
        }
        //------------------------------------------
        // need to determine the role and status for
        //  CRP8 from Affiliations.options
        //------------------------------------------
        let derivedRole = '';
        if (user?.role) {
            derivedRole = user.role;
        } else {
            derivedRole = 'guest';
        }
        //===========================================
        let residenceUniqueID = createAWSUniqueID();
        let userUniqueID = createAWSUniqueID();
        let affiliationUniqueID = createAWSUniqueID();
        // create residence object
        const residenceObject = {
            id: residenceUniqueID,
            street: user.residence?.street || '',
            city: user.residence?.city || '',
            stateProv: user.residence?.stateProv || '',
            postalCode: user.residence?.postalCode,
            latitude: '',
            longitude: '',
        };
        const userObject = {
            id: userUniqueID,
            sub: user.uid,
            username: user.username || '',
            firstName: user.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            divisionDefaultUsersId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            residenceResidentsId: residenceUniqueID,
        };
        const affiliationObject = {
            id: affiliationUniqueID,
            role: derivedRole,
            status: 'active',
            divisionAffiliationsId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            userAffiliationsId: userUniqueID,
        };
        const multiMutate = {
            residence: residenceObject,
            user: userObject,
            affiliation: affiliationObject,
        };
        const creationResults = await createNewGQLProfile(multiMutate);
        printObject('APCLC:70==>creationResults:\n', creationResults);
        let newFinalizedProfile = creationResults.data;
        await updateLegacyAsMigrated(userObject.sub, userObject.id);
        printObject('APCLC:73-->resultant profile:\n', multiMutate);
    };

    useEffect(() => {}, []);
    return (
        <>
            <div className='reg-user-list-component__box'>
                <div
                    className={
                        user.gqlProfile
                            ? 'reg-user-list-component__link-wrapper'
                            : 'reg-user-list-component__unreg-link-wrapper'
                    }
                >
                    <div
                        onClick={handleClick}
                        className='reg-user-list-component__detail-link'
                    >
                        <span>{rally.name}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    // clearTmpUser: () => dispatch(clearTmpUser()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    // tmpUser: state.pate.tmpUser,
    pate: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps, {
        // clearTmpUser,
        mapDispatchToProps,
    })
)(EventDetails);
