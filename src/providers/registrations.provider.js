import { API } from 'aws-amplify';
import * as mutations from '../pateGraphql/mutations';
import { printObject } from '../utils/helpers';
export const deleteRegistrationProvider = async (theReg) => {
    let DANO = false;
    // need to delete the regstration, but multiple actions.
    // 1. delete registration from gql Registrations
    // 2. reduce the gql Event numbers appropriately.
    // 3. reduce the gql Meal number if applicable

    printObject('RP:10==>theReg:\n', theReg);

    //*     1. delete registration from gql Registrations
    //      -------------------------------------------------
    const deleteRegistrationFromGQL = async () => {
        const inputVariables = {
            id: theReg.id,
        };
        try {
            const deleteRegistrationResponse = await API.graphql({
                query: mutations.deleteRegistration,
                variables: { input: inputVariables },
            });
            if (deleteRegistrationResponse?.data?.deleteRegistration?.id) {
                return {
                    statusCode: 200,
                    data: 'registration deleted from gql Registrations',
                };
            } else {
                return {
                    statusCode: 401,
                    data: 'registration not found in gql_Registrations',
                };
            }
        } catch (err) {
            return {
                statusCode: 400,
                data: 'error doign gql delete registration',
                error: err,
            };
        }
    };
    if (!DANO) {
        const handleGQLRegistration = await deleteRegistrationFromGQL();
        if (handleGQLRegistration.statusCode !== 200) {
            return handleGQLRegistration;
        }
    }

    //*     2. reduce the gql Event numbers appropriately.
    //      -------------------------------------------------
    const updateGQLEventNumbers = async () => {
        const inputVariables = {
            id: theReg.event.id,
            plannedCount: theReg.event.plannedCount - theReg.attendanceCount,
            actualCount: theReg.event.actualCount,
            mealPlannedCount: theReg.event.mealPlannedCount - theReg.mealCount,
            mealActualCount: theReg.event.mealActualCount,
        };
        try {
            const newEventNumbers = await API.graphql({
                query: mutations.updateEventNumbers,
                variables: { input: inputVariables },
            });
            if (newEventNumbers?.data?.updateEvent?.id) {
                return {
                    statusCode: 200,
                    data: 'event numbers updated...',
                };
            } else {
                return {
                    statusCode: 401,
                    data: 'cannot update Event numbers',
                };
            }
        } catch (err) {
            return {
                statusCode: 400,
                data: 'error doign gql delete registration',
                error: err,
            };
        }
    };
    if (!DANO) {
        const handleGQLEventResponse = await updateGQLEventNumbers();
        if (handleGQLEventResponse.statusCode !== 200) {
            return handleGQLEventResponse;
        }
    }
    //*     3. reduce the gql Meal number if applicable
    //      -------------------------------------------------
    const updateGQLMealNumbers = async () => {
        const inputVariables = {
            id: theReg.event.meal.id,
            plannedCount: theReg.event.mealPlannedCount - theReg.mealCount,
        };
        try {
            const newMealNumbers = await API.graphql({
                query: mutations.updateMeal,
                variables: { input: inputVariables },
            });
            if (newMealNumbers?.data?.deleteRegistration?.id) {
                return {
                    statusCode: 200,
                    data: 'meal numbers updated...',
                };
            } else {
                return {
                    statusCode: 401,
                    data: 'cannot update meal numbers',
                };
            }
        } catch (err) {
            return {
                statusCode: 400,
                data: 'error doing gql meal numbers',
                error: err,
            };
        }
    };
    if (!DANO) {
        // if we have meal count on registration, reduced
        if (theReg.mealCount > 0) {
            const handleGQLMealResponse = await updateGQLMealNumbers();
            if (handleGQLMealResponse.statusCode !== 200) {
                return handleGQLMealResponse;
            }
        }
    }
    //if we got this far, all is good, return 200 and the request
    return { statusCode: 200, data: theReg };
};

// let attendanceDelta = +reg.

const DoNotUse = () => {
    // let DANO = true;
    // let registration = { id: '123' };
    // if (DANO) {
    //     return;
    // } else {
    // }
    // //delete from database
    // setSpinner();
    // await fetch(
    //     'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
    //     {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             operation: 'deleteRegistration',
    //             payload: {
    //                 Key: { uid: registration.uid },
    //             },
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     }
    // )
    //     .then((response) => response.json())
    //     .then((data) => {
    //         // const util = require('util');
    //         // console.log(
    //         //     'db data returned: \n' +
    //         //         util.inspect(data, {
    //         //             showHidden: false,
    //         //             depth: null,
    //         //         })
    //         // );
    //     });
    // //-------------------------
    // // reduce event numbers.
    // //-------------------------
    // let eventUpdate = {
    //     uid: registration.eid,
    //     adjustments: {
    //         registrationCount: registration.attendeeCount * -1,
    //     },
    // };
    // const mCount = parseInt(registration.mealCount, 10) * -1;
    // if (mCount !== 0) {
    //     eventUpdate.adjustments.mealCount = mCount;
    // }
    // await fetch(
    //     'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
    //     {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             operation: 'maintainNumbers',
    //             payload: eventUpdate,
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     }
    // )
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('maintainEventNumbers successful');
    //     });
    // //remove the redux reference to the event
    // await removeRegistration(registration.uid);
    // //??????
    // // may need to reload stateRep & stateLead redux
    // //??????
    // clearSpinner();
};
