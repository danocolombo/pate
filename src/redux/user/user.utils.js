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

//----------------------------------------
// update currentUser registration(s) when
// registration numbers change
//----------------------------------------
export const updateRegistrationAndEventNumbers = (state, payload) => {
    /* ===================================================
        there is array of registrations. Multiple actions
        needed.
        1. update the specific registration attendee numbers
        2. update ALL registrations for an event w/event numbers

        payload {
            regId
            eventId
            regAttendance
            regMeal
            eventAttendance
            eventMeal
        }
    ====================================================== */
    let currentUser = state;

    //update registration numbers
    //-----------------------------
    // Find the index of the object with id "1243" in the array
    const index = currentUser.registrations.items.findIndex(
        (item) => item.id === payload.regId
    );

    // If the object with id "1243" exists in the array, update its attendanceCount and mealCount properties
    if (index !== -1) {
        currentUser.registrations.items[index].attendanceCount =
            payload.regAttendance;
        currentUser.registrations.items[index].mealCount = payload.regMeal;
    }
    // update event numbers
    //=================================
    // Iterate over the array and update the plannedCount and mealPlannedCount properties for each object where event.id === "12abc"
    currentUser.registrations.items.forEach((item) => {
        if (item.event.id === payload.eventId) {
            item.event.plannedCount = payload.eventAttendance;
            item.event.mealPlannedCount = payload.eventMeal;
        }
    });
    return currentUser;
};
