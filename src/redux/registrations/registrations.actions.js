import { RegistrationsActionTypes } from './registrations.types';
export const addRegistration = (registration) => ({
    type: RegistrationsActionTypes.ADD_REGISTRATION,
    payload: registration,
});
export const removeRegistration = (registration) => ({
    type: RegistrationsActionTypes.REMOVE_REGISTRATION,
    payload: registration,
});

export const loadRegistrations = (registrations) => ({
    type: RegistrationsActionTypes.LOAD_REGISTRATIONS,
    payload: registrations,
});

export const clearRegistrations = () => ({
    type: RegistrationsActionTypes.CLEAR_REGISTRATIONS,
    payload: null,
});

export const loadTempRegistration = (rally) => ({
    type: RegistrationsActionTypes.LOAD_TEMP_REGISTRATION,
    payload: rally,
});
export const clearTempRegistration = () => ({
    type: RegistrationsActionTypes.CLEAR_TEMP_REGISTRATION,
    payload: null,
});
export const loadEventRegistrations = (registrations) => ({
    type: RegistrationsActionTypes.LOAD_EVENT_REGISTRATIONS,
    payload: registrations,
});
export const clearEventRegistrations = () => ({
    type: RegistrationsActionTypes.CLEAR_EVENT_REGISTRATIONS,
    payload: null,
});
export const addEventRegistration = (registration) => ({
    type: RegistrationsActionTypes.ADD_EVENT_REGISTRATION,
    payload: registration,
});
export const removeEventRegistration = () => ({
    type: RegistrationsActionTypes.REMOVE_EVENT_REGISTRATION,
    payload: null,
});
