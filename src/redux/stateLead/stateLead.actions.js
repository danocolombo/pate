import { StateLeadActionTypes } from './stateLead.types';
export const loadStateRallies = (rallies) => ({
    type: StateLeadActionTypes.LOAD_LEAD_RALLIES,
    payload: rallies,
});
export const clearStateLead = () => ({
    type: StateLeadActionTypes.CLEAR_STATE_LEAD,
    payload: null,
});
