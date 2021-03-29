import { PateActionTypes } from './pate.types';

const INITIAL_STATE = {
    showSpinner: false,
    rally: null,
    registration: null
};

const pateReducer = (state = INITIAL_STATE, action = null) => {
    switch (action.type) {
        case PateActionTypes.SET_SPINNER:
            return {
                ...state,
                showSpinner: true,
            };

        case PateActionTypes.CLEAR_SPINNER:
            return {
                ...state,
                showSpinner: false,
            };
        case PateActionTypes.SET_RALLY:
            return {
                ...state,
                rally: action.payload,
            };
        case PateActionTypes.CLEAR_RALLY:
            return{
                ...state,
                rally: null
            };
        case PateActionTypes.SET_REGISTRATION:
            return{
                ...state,
                registration: action.payload
            };
        case PateActionTypes.CLEAR_REGISTRATION:
            return{
                ...state,
                registration: null
            };
        default:
            return state;
    }
};

export default pateReducer;
