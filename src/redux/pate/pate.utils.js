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
