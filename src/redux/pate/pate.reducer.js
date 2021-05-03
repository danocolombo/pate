import { PateActionTypes } from './pate.types';
import {
    updateUserWithProfile
} from './pate.utils';
const INITIAL_STATE = {
    showSpinner: false,
    rally: null,
    registration: null,
    users: null,
    tmpUser: null,
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
        case PateActionTypes.SET_RALLY:
            return {
                ...state,
                rally: action.payload,
            };
        case PateActionTypes.CLEAR_RALLY:
            return{
                ...state,
                rally: null
            };
        case PateActionTypes.SET_PATE_REGISTRATION:
            console.log('SET_PATE_REGISTRATION case point');
            return{
                ...state,
                registration: action.payload
            };
        case PateActionTypes.CLEAR_PATE_REGISTRATION:
            return{
                ...state,
                registration: null
            };
        case PateActionTypes.LOAD_REGISTERED_USERS:
            return{
                ...state,
                users: action.payload
            };
        case PateActionTypes.LOAD_TMP_USER:
            return{
                ...state,
                tmpUser: action.payload
            }
        case PateActionTypes.CLEAR_TMP_USER:
            return{
                ...state,
                tmpUser: null
            }
        // case PateActionTypes.UPDATE_USER_WITH_PROFILE:
        //     return {
        //         ...state,
        //         users: updateUserWithProfile(
        //             state.users,
        //             action.payload
        //         ),
        //     };
        default:
            return state;
    }
};

export default pateReducer;
