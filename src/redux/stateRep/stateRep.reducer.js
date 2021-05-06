import { StateRepActionTypes } from './stateRep.types';
import {
    removeRallyFromRallyList,
    updateItemInRallyList,
} from './stateRep.utils';
const INITIAL_STATE = {
    rally: [],
    doneRally: [],
    loading: false,
    error: {},
};

const stateRepReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StateRepActionTypes.LOAD_REP_RALLIES:
            return {
                ...state,
                rally: action.payload,
            };
        case StateRepActionTypes.CLEAR_STATE_REP:
            return {
                ...state,
                rally: null,
                doneRally: null,
                loading: true,
            };
        case StateRepActionTypes.UPDATE_REP_RALLY:
            return {
                ...state,
                rally: updateItemInRallyList(state.rally, action),
            };
        case StateRepActionTypes.REMOVE_REP_RALLY:
            return {
                ...state,
                rally: removeRallyFromRallyList(state.rally, action),
            };
        case StateRepActionTypes.LOAD_REP_DONE_RALLIES:
            return {
                ...state,
                doneRally: action.payload,
            };
        default:
            return state;
    }
};

export default stateRepReducer;
