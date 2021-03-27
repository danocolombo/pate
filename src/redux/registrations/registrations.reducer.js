import { RegistrationsActionTypes } from './registrations.types';
import {
    addItemToConfirmed,
    removeItemFromConfirmed,
} from './registrations.utils';

const INITIAL_STATE = {
    tempRegistration: null,
    confirmed: [],
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
                confirmed: addItemToConfirmed(state.confirmed, action.payload),
            };
        case RegistrationsActionTypes.REMOVE_REGISTRATION:
            return {
                ...state,
                confirmed: removeItemFromConfirmed(
                    state.confirmed,
                    action.payload
                ),
            };
        case RegistrationsActionTypes.LOAD_TEMP_REGISTRATION:
            console.log('we made it to the reducer (LOAD_TEMP_REGISTRATION)');
            return {
                ...state,
                tempRegistration: action.payload,
            };
        case RegistrationsActionTypes.CLEAR_TEMP_REGISTRATION:
            console.log('we made it to the reducer (CLEAR_TEMP_REGISTRATION)');
            return {
                ...state,
                tempRegistration: null,
            };
        default:
            return state;
    }
};

export default registrationsReducer;
