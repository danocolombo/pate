import { StateLeadActionTypes } from './stateLead.types';

const INITIAL_STATE = {
    rally: [],
    loading: false,
    error: {},
};

const stateLeadReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StateLeadActionTypes.LOAD_LEAD_RALLIES:
            return {
                ...state,
                rally: action.payload,
            };
        case StateLeadActionTypes.CLEAR_STATE_LEAD:
            return {
                ...state,
                rally: null,
                loading: true,
            };
        default:
            return state;
    }
};

export default stateLeadReducer;
