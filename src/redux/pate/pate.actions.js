import { PateActionTypes } from './pate.types';

export const setSpinner = () => ({
    type: PateActionTypes.SET_SPINNER,
});
export const clearSpinner = () => ({
    type: PateActionTypes.CLEAR_SPINNER,
});
export const loadRally = (rally) => ({
    type: PateActionTypes.SET_RALLY,
    payload: rally
});
export const clearRally = () => ({
    type: PateActionTypes.CLEAR_RALLY,
    payload: null
});
export const loadRegistration = (registration) => ({
    type: PateActionTypes.SET_PATE_REGISTRATION,
    payload: registration
});
export const clearRegistration = () => ({
    type: PateActionTypes.CLEAR_PATE_REGISTRATION,
    payload: null
});