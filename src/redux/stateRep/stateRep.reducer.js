import { StateRepActionTypes } from './stateRep.types';
import { updateItemInRallyList } from './stateRep.utils';
const INITIAL_STATE = {
    rally: [],
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
                loading: true,
            };
        case StateRepActionTypes.UPDATE_REP_RALLY:
            return {
                ...state,
                rally: updateItemInRallyList(
                    state.rally,
                    action
                )
            }
        default:
            return state;
    }
};

export default stateRepReducer;
