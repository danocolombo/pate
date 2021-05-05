import { StateLeadActionTypes } from './stateLead.types';
export const loadLeadRallies = (rallies) => ({
    type: StateLeadActionTypes.LOAD_LEAD_RALLIES,
    payload: rallies,
});
export const clearLeadRallies = () => ({
    type: StateLeadActionTypes.CLEAR_LEAD_RALLIES,
    payload: null,
});
export const loadLeadDoneRallies = (rallies) => ({
    type: StateLeadActionTypes.LOAD_LEAD_DONE_RALLIES,
    payload: rallies,
});
export const clearLeadDoneRallies = () => ({
    type: StateLeadActionTypes.CLEAR_LEAD_DONE_RALLIES,
    payload: null,
});
export const clearStateLead = () => ({
    type: StateLeadActionTypes.CLEAR_STATE_LEAD,
    payload: null,
});
