import React, { useEffect } from 'react';
/* -------------------------------
 this file is used to display the users as a list'
 ---------------------------------*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import './admin-registered-users.style.scss';
import { createNewGQLEvent } from '../../pateGraphql/pateGraphql.provider';
import { getGQLProfile } from '../../providers/profile.provider';
import { updateLegacyEventAsMigrated } from '../../providers/event.provider';
import {
    printObject,
    createAWSUniqueID,
    timeStringToAWSTime,
    createEventCompKey,
} from '../../utils/helpers';
const EventDetails = ({ rally }) => {
    const handleClick = async () => {
        console.log('Clicked: ', rally.name);
        printObject('APCLC:21==>Event:\n', rally);

        //---------- NEED TO GET COORDINATOR INFO -----------
        //   get the graphql ID for rally.coordinator.id === User.sub
        //  will be used down in the eventObject definition. (coordinator.data.id);
        let coordinator = await getGQLProfile(rally?.coordinator.id);
        // should get back {statusCode: 200, data: {profile}}

        if (coordinator.status !== 200) {
            printObject(
                'AECLC:25--> cannot determine coordinator, aborting\n',
                coordinator.data
            );
            return;
        }
        const coordinatorId = coordinator.data.id;
        //  make rally.eventDate from 20230304 into 2023-03-04
        const input = rally.eventDate;
        const year = input.slice(0, 4);
        const month = input.slice(4, 6);
        const day = input.slice(6, 8);
        const eventAWSDate = `${year}-${month}-${day}`;

        //  convert rally.startTime and rally.endTime into AWS values
        const eventAWSStartTime = await timeStringToAWSTime(rally.startTime);
        const eventAWSEndTime = await timeStringToAWSTime(rally.endTime);

        //===========================================
        let eventUniqueID = createAWSUniqueID();
        let locationUniqueID = createAWSUniqueID();
        let contactUniqueID = createAWSUniqueID();
        let mealUniqueID = null;
        // create eventCompKey
        const eventCompKey = await createEventCompKey(
            eventAWSDate,
            rally.stateProv,
            eventUniqueID,
            coordinatorId
        );

        // create location object
        const locationObject = {
            id: locationUniqueID,
            street: rally?.street || '',
            city: rally?.city || '',
            stateProv: rally?.stateProv || '',
            postalCode: rally?.postalCode || null,
            latitude: rally?.geolocation?.lat || '',
            longitude: rally?.geolocation?.lng || '',
        };

        // need to make first and last out of one string
        let fName = '';
        let lName = '';
        if (rally?.contact?.name) {
            let nparts = rally.contact.name.split(' ');
            fName = nparts[0];
            if (nparts.length > 1) {
                lName = nparts[1];
            } else {
                lName = '';
            }
        }
        const contactObject = {
            id: contactUniqueID,
            firstName: fName,
            lastName: lName,
            email: rally?.contact?.email || '',
            phone: rally?.contact?.phone || '',
            street: rally?.contact?.street || '',
            city: rally?.contact?.city || '',
            stateProv: rally?.contact?.stateProv || '',
            postalCode: rally?.contact?.postalCode || null,
        };
        let mealObject = {};
        const mealOffered = !!Object.keys(rally.meal).length;

        if (mealOffered) {
            mealUniqueID = createAWSUniqueID();
            // format start time from 11:30 to AWSTime
            let mealStartTime = null;
            if (rally?.meal?.startTime) {
                mealStartTime = await timeStringToAWSTime(
                    rally?.meal?.startTime
                );
            } else {
                mealStartTime = eventAWSStartTime;
            }
            mealObject = {
                id: mealUniqueID,
                deadline: rally?.meal?.deadline || eventAWSDate,
                cost: parseInt(rally?.meal?.cost) || 0,
                plannedCount: rally?.meal?.mealCount || 0,
                actualCount: rally?.meal?.mealsServed || 0,
                startTime: mealStartTime,
                message: rally?.meal?.message || '',
                mealEventId: eventUniqueID,
            };
        }
        const eventObject = {
            id: eventUniqueID,
            eventDate: eventAWSDate,
            eventCompKey: eventCompKey,
            status: rally?.status || 'draft',
            plannedCount: rally?.registrations || 0,
            actualCount: rally?.attendees || 0,
            mealPlannedCount: rally?.meal?.mealCount || 0,
            mealActualCount: rally?.meal?.mealsServed || 0,
            startTime: eventAWSStartTime,
            endTime: eventAWSEndTime,
            message: rally?.message || '',
            name: rally?.name || 'Undefined',
            graphic: rally?.graphic || '',
            divisionEventsId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            eventLocationEventsId: locationUniqueID,
            eventContactEventsId: contactUniqueID,
            userEventsId: coordinatorId,
            eventMealId: mealUniqueID,
        };
        const multiMutate = {
            location: locationObject,
            contact: contactObject,
            meal: mealObject,
            event: eventObject,
        };

        printObject('AEMLC:144-->multiMutate:\n', multiMutate);
        const creationResults = await createNewGQLEvent(multiMutate);
        printObject('AECLC:148==>creationResults:\n', creationResults);
        let newFinalizedProfile = creationResults.data;
        await updateLegacyEventAsMigrated(rally.uid, eventUniqueID);
        printObject('APCLC:73-->resultant profile:\n', multiMutate);
    };

    useEffect(() => {}, []);
    return (
        <>
            <div className='reg-user-list-component__box'>
                <div
                    className={
                        rally
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
