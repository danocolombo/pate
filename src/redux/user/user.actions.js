import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_USER,
    payload: user,
});

export const updateCurrentUser = (user) => ({
    type: UserActionTypes.UPDATE_USER,
    payload: user,
});
export const clearUser = (user) => ({
    type: UserActionTypes.CLEAR_USER,
    payload: user,
});
export const addRegistrationToCurrentUser = (user) => ({
    type: UserActionTypes.ADD_REGISTRATION_TO_CURRENT_USER,
    payload: user,
});
export const removeRegistrationFromCurrentUser = (user) => ({
    type: UserActionTypes.REMOVE_REGISTRATION_FROM_CURRENT_USER,
    payload: user,
});
export const addEventToCurrentUser = (event) => ({
    type: UserActionTypes.ADD_EVENT_TO_CURRENT_USER,
    payload: event,
});
export const removeEventFromCurrentUser = (event) => ({
    type: UserActionTypes.REMOVE_EVENT_FROM_CURRENT_USER,
    payload: event,
});
export const updateRegistrationAndEventNumbersForCurrentUser = (user) => ({
    type: UserActionTypes.UPDATE_REGISTRATION_AND_EVENT_NUMBERS,
    payload: user,
});
export const updateUserPersonalInfo = (personalInfo) => ({
    type: UserActionTypes.UPDATE_USER_PERSONAL_INFO,
    payload: personalInfo,
});
export const updateUserResidenceInfo = (residenceInfo) => ({
    type: UserActionTypes.UPDATE_USER_RESIDENCE_INFO,
    payload: residenceInfo,
});
export const updateUserMembershipInfo = (membershipInfo) => ({
    type: UserActionTypes.UPDATE_USER_MEMBERSHIP_INFO,
    payload: membershipInfo,
});
