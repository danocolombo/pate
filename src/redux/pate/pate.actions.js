import { PateActionTypes } from './pate.types';

export const setSpinner = () => ({
    type: PateActionTypes.SET_SPINNER,
});
export const clearSpinner = () => ({
    type: PateActionTypes.CLEAR_SPINNER,
});
