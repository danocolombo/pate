import registrationsReducer from '../registrations/registrations.reducer';
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
export const setRegistration = (registration) => ({
    type: PateActionTypes.SET_REGISTRATION,
    payload: registration
});
export const clearRegistration = () => ({
    type: PateActionTypes.CLEAR_REGISTRATION,
    payload: null
});