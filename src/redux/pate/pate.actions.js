import { PateActionTypes } from './pate.types';

export const setSpinner = () => ({
    type: PateActionTypes.SET_SPINNER,
});
export const clearSpinner = () => ({
    type: PateActionTypes.CLEAR_SPINNER,
});
export const loadRally = (rally) => ({
    type: PateActionTypes.SET_RALLY,
    payload: rally,
});
export const clearRally = () => ({
    type: PateActionTypes.CLEAR_RALLY,
    payload: null,
});
export const clearAllPate = () => ({
    type: PateActionTypes.CLEAR_ALL_PATE,
    payload: null,
});
export const setPateRallies = (rallies) => ({
    type: PateActionTypes.SET_PATE_RALLIES,
    payload: rallies,
});
export const clearPateRallies = () => ({
    type: PateActionTypes.CLEAR_PATE_RALLIES,
});
export const loadRegistration = (registration) => ({
    type: PateActionTypes.SET_PATE_REGISTRATION,
    payload: registration,
});
export const clearRegistration = () => ({
    type: PateActionTypes.CLEAR_PATE_REGISTRATION,
    payload: null,
});
export const loadRegisteredUsers = (users) => ({
    type: PateActionTypes.LOAD_REGISTERED_USERS,
    payload: users,
});
export const loadTmpUser = (user) => ({
    type: PateActionTypes.LOAD_TMP_USER,
    payload: user,
});
export const clearTmpUser = () => ({
    type: PateActionTypes.CLEAR_TMP_USER,
    payload: null,
});
// export const addProfileToUser = (profile) => ({
//     type: PateActionTypes.UPDATE_USER_WITH_PROFILE,
//     payload: profile
// });
