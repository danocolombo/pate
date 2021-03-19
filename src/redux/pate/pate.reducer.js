import { PateActionTypes } from './pate.types';

const INITIAL_STATE = {
    showSpinner: false,
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
        default:
            return state;
    }
};

export default pateReducer;
