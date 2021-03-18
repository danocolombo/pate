import { RegistrationsActionTypes } from './registrations.types';

const INITIAL_STATE = {
    currentRegistrations: {
        isLoading: false,
        count: 0,
    },
};

const registrationsReducer = (state = INITIAL_STATE, action) => {
    console.log('____________IN REDUCER: ' + action.type);
    switch (action.type) {
        case RegistrationsActionTypes.LOAD_REGISTRATIONS:
            return {
                ...state,
                currentRegistrations: action.payload,
            };
        case RegistrationsActionTypes.CLEAR_REGISTRATIONS:
            return {
                ...state,
                currentRegistrations: null,
            };
        default:
            return state;
    }
};

export default registrationsReducer;
