// export const updateUserWithProfile = (
//     registeredUsers,
//     profileToUpdate
// ) => {
//     let target = {};
//     //get the id of user to update
//     target.id = profileToUpdate.uid;
//     let returnValue = [];
//     for (let index = 0; index < registeredUsers.length; index++) {
//         if (registeredUsers[index].uid === target.id) {
//             registeredUsers[index].firstName = profileToUpdate?.firstName;
//             registeredUsers[index].lastName = profileToUpdate?.lastName;
//             registeredUsers[index].street = profileToUpdate?.residence?.steet;
//             registeredUsers[index].city = profileToUpdate?.residence?.city;
//             registeredUsers[index].stateProv = profileToUpdate?.residence?.stateProv;
//             registeredUsers[index].postalCode = profileToUpdate?.residence?.postalCode;
//             registeredUsers[index].email = profileToUpdate?.email;
//             registeredUsers[index].phone = profileToUpdate?.phone;
//             registeredUsers[index].churchName = profileToUpdate?.church?.name;
//             registeredUsers[index].churchCity = profileToUpdate?.church?.city;
//             registeredUsers[index].churchStateProv = profileToUpdate?.church?.stateProv;
//             registeredUsers[index].stateRep = profileToUpdate?.stateRep;
//             registeredUsers[index].stateLead = profileToUpdate?.stateLead;
//         }
//         returnValue.push(registeredUsers[index]);
//     }
//     // return registrations.map((registration) =>
//     //     registration.uid === target.id ? { ...registration } : registration
//     // );
//     console.log('ready to return');
//     return returnValue;
// };

import { printObject } from '../../utils/helpers';

// export const addItemToRegistrations = (registrations, registrationToAdd) => {
//     const existingRegistrations = registrations.find(
//         (registration) => registration.uid === registrationToAdd.uid
//     );
//     // if the passed in registration is not already in list, add it
//     if (existingRegistrations) {
//         return registrations.map((registration) =>
//             registration.uid === registrationToAdd.uid
//                 ? { ...registration }
//                 : registration
//         );
//     }
//     return [...registrations, { ...registrationToAdd }];
// };

//----------------------------------------
// remove registration from user confirmed
//----------------------------------------
// export const removeItemFromRegistrations = (
//     registrations,
//     registrationToRemove
// ) => {
//     let target = {};
//     target.id = registrationToRemove;
//     const existingRegistration = registrations.find(
//         (registration) => registration.uid === target.id
//     );

//     if (existingRegistration) {
//         return registrations.filter(
//             (registration) => registration.uid !== target.id
//         );
//     }
//     let returnValue = [];
//     registrations.forEach((element) => {
//         if (element.uid === target.id) {
//             console.log('MATCH');
//         } else {
//             // returnValue = { ...returnValue, element };
//             console.log('no match');
//             returnValue.push(element);
//         }
//     });
//     // return registrations.map((registration) =>
//     //     registration.uid === target.id ? { ...registration } : registration
//     // );
//     console.log('ready to return');
//     return returnValue;
// };

//=====================================
// update REDUX....
//  1. reduce pate.rally.plannedCount
//  2. recuce pate.rally.plannedMealCount (if applicable)
//  3. reduct pate.rally.meal.plannedCount (if applicable);
//  4. remove registration from pate.rally.registrations.items[]
export const removeRegistrationFromRally = (state, payload) => {
    printObject('PU:93==>state:\n', state);
    printObject('PU:93==>payload:\n', payload);
    return state;
};
//----------------------------------------
// remove rally from rallies
//----------------------------------------
export const removeItemFromRallies = (state, eventToRemove) => {
    const newState = {
        ...state,
        rallies: state.rallies.filter((item) => item.id !== eventToRemove),
    };
    return newState;
};
//----------------------------------------
// add rally to rallies
//----------------------------------------
export const addItemToRallies = (state, eventToAdd) => {
    let newState = { ...state };
    newState.rallies = { ...newState.rallies, eventToAdd };
    return newState;
};
