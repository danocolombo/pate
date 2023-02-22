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
    return newUser;
};
//----------------------------------------
// update street, city, stateProv and postalCode
//----------------------------------------
export const updateCurrentUserResidenceInfo = (state, payload) => {
    const existing = state.currentUser;
    const residence = payload;
    const newUser = { ...existing, residence };
    return newUser;
};
//----------------------------------------
// update membership name, city, stateProv
//----------------------------------------
export const updateCurrentUserMembershipInfo = (state, payload) => {
    // currentUser.memberships is an array. We only maintain 0
    // currentUser.memberships.items[0]
    printObject('mmmmmmmmmmmmmm\n', state);
    printObject('^^^^^^^^^^^^^^\n', payload);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^');

    const updatedItem = {
        ...state.currentUser.memberships.items[0],
        ...payload,
    };
    const updatedItems = [
        updatedItem,
        ...state.currentUser.memberships.items.slice(1),
    ];

    const updatedState = {
        ...state,
        currentUser: {
            ...state.currentUser,
            memberships: {
                ...state.currentUser.memberships,
                items: updatedItems,
            },
        },
    };
    return updatedState.currentUser;
};
