import { v4 as uuidv4 } from 'uuid';
import { AlertActionTypes } from './alert.types';
const { SET_ALERT, REMOVE_ALERT } = AlertActionTypes;
//export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
export const setAlert = (alertPayload) => (dispatch) => {
    const { msg, alertType, timeout = 5000 } = alertPayload;
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
