export const updateItemInRallyList = (rally, rallyToUpdate) => {
    //this function will update the specified rally, if it exists
};
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

// //----------------------------------------
// // remove registration from user confirmed
// //----------------------------------------
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
