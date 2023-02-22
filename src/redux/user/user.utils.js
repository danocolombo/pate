import { printObject } from '../../utils/helpers';
export const addItemToRegistrations = (state, registrationToAdd) => {
    let newState = { ...state };

    newState.currentUser.registrations.items = [
        ...newState.currentUser.registrations.items,
        registrationToAdd,
    ];
    return newState.currentUser;
};
//----------------------------------------
// remove registration from user confirmed
//----------------------------------------
export const removeItemFromRegistrations = (
    currentUser,
    registrationToRemove
) => {
    const newUser = {
        ...currentUser,
        registrations: {
            ...currentUser.registrations,
            items: currentUser.registrations.items.filter(
                (item) => item.id !== registrationToRemove
            ),
        },
    };
    return newUser;
};
//----------------------------------------
// update firstName, lastName and phone
//----------------------------------------
export const updateCurrentUserPersonalInfo = (state, payload) => {
    const existing = state.currentUser;
    const newUser = { ...existing, ...payload };
    printObject('newUser:\n', newUser);
    return newUser;
};
