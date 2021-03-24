import { RegistrationsActionTypes } from './registrations.types';
import {
    addItemToConfirmed,
    removeItemFromConfirmed,
} from './registrations.utils';

const INITIAL_STATE = {
    registration: null,
    confirmed: [],
    loading: false,
    count: 0,
    error: {},
};

const registrationsReducer = (state = INITIAL_STATE, action) => {
    console.log('____________IN REDUCER: ' + action.type);
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
        default:
            return state;
    }
};

export default registrationsReducer;
