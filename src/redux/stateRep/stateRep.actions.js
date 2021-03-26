import { StateRepActionTypes } from './stateRep.types';
export const loadRallies = (rallies) => ({
    type: StateRepActionTypes.LOAD_REP_RALLIES,
    payload: rallies,
});
export const clearStateRep = () => ({
    type: StateRepActionTypes.CLEAR_STATE_REP,
    payload: null,
});
