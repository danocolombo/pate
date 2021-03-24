import { RegistrationsActionTypes } from './registrations.types';

export const loadRegistrations = (registrations) => ({
    type: RegistrationsActionTypes.LOAD_REGISTRATIONS,
    payload: registrations,
});

export const clearRegistrations = () => ({
    type: RegistrationsActionTypes.CLEAR_REGISTRATIONS,
    payload: null,
});
export const addRegistration = (registration) => ({
    type: RegistrationsActionTypes.ADD_REGISTRATION,
    payload: registration,
});
export const tester = () => ({
    type: RegistrationsActionTypes.TEST_ME,
    payload: null,
});
