import { RegistrationsActionTypes } from './registrations.types';
import {
    addItemToRegistrations,
    removeItemFromRegistrations,
} from './registrations.utils';

const INITIAL_STATE = {
    tempRegistration: null,
    confirmed: [],
    eventRegistrations: [],
    loading: false,
    error: {},
};

const registrationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RegistrationsActionTypes.LOAD_REGISTRATIONS:
            return {
                ...state,
                confirmed: action.payload,
            };
        case RegistrationsActionTypes.CLEAR_REGISTRATIONS:
            return {
                ...state,
                confirmed: null,
            };
        case RegistrationsActionTypes.ADD_REGISTRATION:
            return {
                ...state,
                confirmed: addItemToRegistrations(
                    state.confirmed,
                    action.payload
                ),
            };
        case RegistrationsActionTypes.REMOVE_REGISTRATION:
            return {
                ...state,
                confirmed: removeItemFromRegistrations(
                    state.confirmed,
                    action.payload
                ),
            };
        case RegistrationsActionTypes.LOAD_TEMP_REGISTRATION:
            return {
                ...state,
                tempRegistration: action.payload,
            };
        case RegistrationsActionTypes.CLEAR_TEMP_REGISTRATION:
            return {
                ...state,
                tempRegistration: null,
            };
        case RegistrationsActionTypes.LOAD_EVENT_REGISTRATIONS:
            console.log('in....');
            return {
                ...state,
                eventRegistrations: action.payload,
            };
        case RegistrationsActionTypes.CLEAR_EVENT_REGISTRATIONS:
            return {
                ...state,
                eventRegistrations: null,
            };
        case RegistrationsActionTypes.ADD_EVENT_REGISTRATION:
            return {
                ...state,
                eventRegistrations: addItemToRegistrations(
                    state.eventRegistrations,
                    action.payload
                ),
            };
        case RegistrationsActionTypes.REMOVE_EVENT_REGISTRATION:
            return {
                ...state,
                confirmed: removeItemFromRegistrations(
                    state.eventRegistrations,
                    action.payload
                ),
            };
        default:
            return state;
    }
};

export default registrationsReducer;
