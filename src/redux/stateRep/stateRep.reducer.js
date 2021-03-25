import { StateRepActionTypes } from './stateRep.types';

const INITIAL_STATE = {
    rally: [],
    loading: false,
    error: {},
};

const stateRepReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StateRepActionTypes.LOAD_RALLIES:
            return {
                ...state,
                rally: action.payload,
            };
        case StateRepActionTypes.CLEAR_STATE_REP:
            return {
                ...state,
                rally: null,
                loading: true,
            };
        default:
            return state;
    }
};

export default stateRepReducer;
